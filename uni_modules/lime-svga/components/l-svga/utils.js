export function compareVersion(v1, v2) {
	v1 = v1.split('.')
	v2 = v2.split('.')
	const len = Math.max(v1.length, v2.length)
	while (v1.length < len) {
		v1.push('0')
	}
	while (v2.length < len) {
		v2.push('0')
	}
	for (let i = 0; i < len; i++) {
		const num1 = parseInt(v1[i], 10)
		const num2 = parseInt(v2[i], 10)

		if (num1 > num2) {
			return 1
		} else if (num1 < num2) {
			return -1
		}
	}
	return 0
}

export const ENV_TYPE = () => {
	let {SDKVersion} = uni.getSystemInfoSync()
	if(!uni.getEnv) {
		uni.getEnv = () => {
			const UNDEFINED = 'undefined'
			if(typeof wx !== UNDEFINED) {
				return 'WEAPP'
			}
			if(typeof my !== UNDEFINED) {
				SDKVersion = my.SDKVersion
				return 'ALIPAY'
			}
			if(typeof tt !== UNDEFINED) {
				return 'TT'
			}
		}
	}
	const type = {
		'WEAPP': '2.9.7',
		'TT': '1.78.0',
		'ALIPAY': '2.7.0',
	}[uni.getEnv()]
	return type && SDKVersion && compareVersion(SDKVersion, type) >= 1
}
// #ifdef MP
export const prefix = () => {
	// #ifdef MP-TOUTIAO
	return tt
	// #endif
	// #ifdef MP-WEIXIN
	return wx
	// #endif
	// #ifdef MP-BAIDU
	return swan
	// #endif
	// #ifdef MP-ALIPAY
	return my
	// #endif
	// #ifdef MP-QQ
	return qq
	// #endif
	// #ifdef MP-360
	return qh
	// #endif
}
// #endif

/**
 * base64转路径
 * @param {Object} base64
 */
export function base64ToPath(base64) {
	const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];

	return new Promise((resolve, reject) => {
		// #ifdef MP
		const fs = uni.getFileSystemManager()
		//自定义文件名
		if (!format) {
			reject(new Error('ERROR_BASE64SRC_PARSE'))
		}
		const time = new Date().getTime();
		let pre = prefix()
		const filePath = `${pre.env.USER_DATA_PATH}/${time}.${format}`
		//let buffer = base64ToArrayBuffer(bodyData)
		fs.writeFile({
			filePath,
			data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
			encoding: 'base64',
			// data: buffer,
			// encoding: 'binary',
			success() {
				resolve(filePath)
			},
			fail(err) {
				reject(err)
			}
		})
		// #endif

		// #ifdef H5
		// mime类型
		let mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
		//base64 解码
		let byteString = atob(base64.split(',')[1]);
		//创建缓冲数组
		let arrayBuffer = new ArrayBuffer(byteString.length);
		//创建视图
		let intArray = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
			intArray[i] = byteString.charCodeAt(i);
		}
		resolve(URL.createObjectURL(new Blob([intArray], {
			type: mimeString
		})))
		// #endif

		// #ifdef APP-PLUS
		const bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
		bitmap.loadBase64Data(base64, () => {
			if (!format) {
				reject(new Error('ERROR_BASE64SRC_PARSE'))
			}
			const time = new Date().getTime();
			const filePath = `_doc/uniapp_temp/${time}.${format}`
			bitmap.save(filePath, {},
				() => {
					bitmap.clear()
					resolve(filePath)
				},
				(error) => {
					bitmap.clear()
					reject(error)
				})
		}, (error) => {
			bitmap.clear()
			reject(error)
		})
		// #endif
	})
}

const svgaBus = new Map()
export function toLoadPath(path) {
	return new Promise(resolve => {
		// #ifndef APP-VUE || APP-NVUE
		if(!/^\/static/.test(path)) {
			resolve(path)
		}
		// #endif
		// #ifdef H5
		resolve(location.origin + path)
		// #endif
		// #ifdef APP-VUE || APP-NVUE
		if(svgaBus.has(path)) {
			resolve(svgaBus.get(path))
		} else if(!/^\/static/.test(path) && !/^_www/.test(path)){
			uni.downloadFile({
				url: path,
				success(res) {
					svgaBus.set(path, res.tempFilePath)
					resolve(res.tempFilePath)
				}
			})
		} else {
			plus.io.resolveLocalFileSystemURL( '_www' + path, (res) => {
				svgaBus.set(path, res.fullPath)
				resolve(res.fullPath)
			}, (err) => {
				console.error(err)
			} )
		}
		// #endif
		// #ifndef APP-VUE || APP-NVUE || H5
		resolve(path)
		// #endif
	})
	
}