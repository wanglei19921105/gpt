/**
 * @description 请求封装
 */

import config from './config.js'

// n秒后接口无响应，开始loading
var waitTime = 800
export default function (url, data, method='POST') {
	let httpDefaultOpts = {
		url: config.baseUrl + url,
		// 默认POST
		method,
		header: {
			'X-Requested-With': 'XMLHttpRequest',
			// JSON传参
			"Content-Type": "application/json; charset=UTF-8",
			// formData传参
			// "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		dataType: 'json',
	}
	if (data) {
		httpDefaultOpts = {
			...httpDefaultOpts,
			...{
				data: data
			}
		}
	}
	let promise = new Promise((resolve, reject) => {
		// loading定时器
		let timer = setTimeout(()=>{
			uni.showLoading({mask:true})
		},waitTime)
		uni.request({
			...httpDefaultOpts,
			success: res => {
				let statusCode = res.statusCode
				if(statusCode==200){
					resolve(res.data)
				}else{
					reject()
				}
				uni.hideLoading()
				clearTimeout(timer)
				timer = null
			},
			fail:err=>{
				console.log(`${httpDefaultOpts.url}请求失败，请检查热更IP地址是否配置错误`);
				clearTimeout(timer)
				timer = null
				uni.hideLoading()
				reject()
			}
		})
	}) 
	return promise
};

