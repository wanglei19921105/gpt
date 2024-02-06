import Vue from 'vue'

const smallProgramPay = {
	page: "pages/pay/pay",
	getConfig(orderId, orderNo, money){
		if(!orderId || !orderNo || !money){
			console.error('支付参数错误：', {orderId, orderNo, money});
			throw new Error('=== 支付参数错误,程序中断 ===')
		}
		
		const alMPAppId = '2021003144641038'
		const page = "pages/pay/pay"
		const query = `orderId=${orderId}&orderNo=${orderNo}&money=${money}`
		
		return {
			alMPAppId,
			page,
			query
		}
	},
	wxPay(...params){
		const {page, query} = this.getConfig(...params)
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
		uni.$u.api.userUrlscheme({
			path: page,
			para: query,
		}).then(res => {
			uni.hideLoading()
			this.myOpenUrl(res.data.res)
		})
	},
	alPay(...params){
		const {page, query, alMPAppId} = this.getConfig(...params)
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
		uni.hideLoading()
		const scheme = `alipays://platformapi/startapp?appId=${alMPAppId}&page=${page}&query=${encodeURIComponent(query)}`
		// this.myOpenUrl(`https://ds.alipay.com/?scheme=${encodeURIComponent(scheme)}`, this.isWX())
		if(this.isWX()){
			this.myOpenUrl(`https://ds.alipay.com/?scheme=${encodeURIComponent(scheme)}`, this.isWX())
		} else {
			this.myOpenUrl(scheme)
		}
		
	},
	myOpenUrl(url, noOpen = false, noOpenContent = '已自动复制网址，请在手机浏览器里粘贴打开'){
		if(!url) return
		// #ifdef MP
		noOpen = true
		// #endif
		if(noOpen){
			uni.setClipboardData({
			  data: url,
				success: () => {
					uni.showModal({
					  content: noOpenContent,
					  showCancel: false,
					})
				}
			})
		} else {
			// #ifdef APP-PLUS
			plus.runtime.openURL(url)
			// #endif
			// #ifdef H5
			location.href = url
			// #endif
		}
	},
	isWX() {
		let wx = false
		// #ifdef H5
		wx = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
		// #endif
		return wx
	},
}

export default smallProgramPay
