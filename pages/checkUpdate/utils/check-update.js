import http from './request.js'
import config from './config.js'

const PACKAGE_INFO_KEY = '__package_info__'

export default function() {
	// #ifdef APP-PLUS
	return new Promise((resolve, reject) => {
		http('/v1/renew/last', {
			platform: 'android'
		}).then(res => {
			// 发布过版本数据
			if (res.version) {
				const v1 = plus.runtime.version
				let v2 = res.version
				let myVersion = Number(v1.split('.').join(""))
				let newVersion = Number(v2.split('.').join(""))

				if (myVersion >= newVersion) {
					console.log("当前已是最新版本！");
				} else {
					console.log(`检测到新版本${res.version}`);
					const url = `${config.downloadUrl}/static/package/${res.fileName}`
					uni.setStorageSync(PACKAGE_INFO_KEY, {
						// 是否强制更新
						isForce: res.isForce,
						// 更新标题
						title: res.title,
						// 更新内容
						content: res.content,
						// 最新安装包版本号
						version: res.version,
						// 安装包地址
						url: url,
						type: 'apk'
					})

					uni.navigateTo({
						url: `/pages/checkUpdate/checkUpdate?local_storage_key=${PACKAGE_INFO_KEY}`
					})
				}
			}else{
				console.log('版本数据为空，不需要更新');
			}
		})
	});
	// #endif
}
