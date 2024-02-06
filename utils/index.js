import {		wechatAppPay,		wechatH5Pay,		wechatWebPay,		alipayAppPay,		alipayH5Pay,
		payOpenUrl	} from "@/utils/pay.js" //微信及支付宝支付
const pay = {
	wechatPay:(result)=>{
		// #ifdef APP-PLUS
		return wechatAppPay(result)
		// #endif
		// #ifdef H5
		wechatH5Pay(result)
		// #endif
	},
	alipayPay:(result)=>{
		// #ifdef APP-PLUS
		return alipayAppPay(result)
		// #endif
		// #ifdef H5
		alipayH5Pay(result)
		// #endif
	},
	otherH5Pay(result){
		payOpenUrl(result)
	}
}

export default pay