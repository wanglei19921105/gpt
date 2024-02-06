import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		lang: uni.getStorageSync('lang') || '1',
		screenStyle: !!uni.getStorageSync('screenStyle') || true, // false白天 true黑夜
		areacode: uni.getStorageSync('areacode') || 86, //国际区号
		userId:  uni.getStorageSync('id') || '', //用户id
		smscode: '',//短信验证码
		security: '',//安全密码
		autoChangeTheme: !!uni.getStorageSync('autoChangeTheme') || false,
		isInternationalSMS: false,
	},
	getters: {},
	mutations: {
		// 切换白天黑夜模式
		setScreenStyle(state, provider) {
			if(state.screenStyle !== provider){
				uni.setStorageSync('screenStyle', provider);
				state.screenStyle = provider;
			}
		},
		setAutoChangeTheme(state, provider) {
			if(state.autoChangeTheme !== provider){
				uni.setStorageSync('autoChangeTheme', provider);
				state.autoChangeTheme = provider;
			}
		},
		// 设置语言
		SetLang(state, provider) {
			uni.setStorageSync('lang', provider);
			state.lang = provider;
		},
		// 设置国际区号
		setAreacode(state, provider) {
			uni.setStorageSync('areacode', provider);
			state.areacode = provider
		},
		// 获取短信验证码
		setSmscode(state, provider){
			state.smscode = provider
		},
		// 获取安全密码
		setSecurity(state, provider){
			state.security = provider
		}
	}
})
export default store
