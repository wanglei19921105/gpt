//微信app支付拉起
export const wechatAppPay = (result) => {
	return new Promise((reolve, reject) => {
		uni.requestPayment({
			provider: 'wxpay',
			orderInfo: result, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
			success: function(res) {
				reolve()
			},
			fail: function(err) {
				reject('取消支付')
			}
		});
	})
}

//微信H5拉起支付
export const wechatH5Pay = (result) => {
	let redirect_url = window.location.origin + '/index/pages/home/index' //支付完成回调域名(支付成功页面)
	let mweb_url = result.url + '&redirect_url=' + encodeURIComponent(redirect_url)
	window.location.href = mweb_url;
}

//微信公众号支付
export const wechatWebPay = (result) => {
	// console.log('wechatWebPay', result);
	return new Promise((reolve, reject) => {
		// 判断是否有jsapi环境
		// 调用jsapi支付
		if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', onWechatWebReady(result).then(() => {
						reolve()
					})
					.catch((err) => {
						reject(err)
					}), false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', onWechatWebReady(result).then(() => {
						reolve()
					})
					.catch((err) => {
						reject(err)
					}));
				document.attachEvent('onWeixinJSBridgeReady', onWechatWebReady(result).then(() => {
						reolve()
					})
					.catch((err) => {
						reject(err)
					}));
			}
		} else {
			onWechatWebReady(result).then(() => {
					reolve()
				})
				.catch((err) => {
					reject(err)
				})
		}
	})
}

//微信公众号拉起支付
const onWechatWebReady = (result) => {
	// console.log('onWechatWebReady', result);
	return new Promise((resolve, reject) => {
		let params = {
			appId: result.appId,
			timeStamp: result.timeStamp,
			nonceStr: result.nonceStr,
			package: result.package,
			signType: 'MD5',
			paySign: result.paySign,
		}
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', params,
			function(res) {
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					resolve()
				} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
					reject('取消支付')
				} else {
					reject('支付失败')
				}
			}
		)
	})
}

//支付宝APP支付
export const alipayAppPay = (result) => {
	// console.log('alipayAppPay', result);
	return new Promise((reolve, reject) => {
		uni.requestPayment({
			provider: 'alipay',
			orderInfo: result, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
			success: function(res) {
				reolve()
			},
			fail: function(err) {
				reject('取消支付')
			},
			complete: function(r) {
				console.log(r);
			}
		});
	})
}

//调起支付宝H5支付
export const alipayH5Pay = (result) => {
	// window.location.href = window.location.origin + '/alipay/pay.html?mweb_url=' + window.btoa(result) // 支付宝支付中间页
	sessionStorage.setItem('alH5Pay', encodeURIComponent(result))
	uni.redirectTo({
		url: "/pages/payh5?htmlstr="
	})
}

export const payOpenUrl = (url) => {
		if (!url) return
		// #ifdef APP-PLUS
		plus.runtime.openURL(url)
		// #endif
		// #ifdef H5
		window.location.href = url
		// #endif
		// #ifdef MP
		uni.setClipboardData({
			data: url,
			success: () => {
				uni.showModal({
					content: '已自动复制网址，请在手机浏览器里粘贴打开',
					showCancel: false,
				})
			}
		})
		// #endif
	}
