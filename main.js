import Vue from 'vue'
import App from './App'
import store from 'store/index.js';
import uView from "uview-ui";
import myAppConfig from '@/config'
import smallProgramPay from '@/common/smallProgramPay.js'
import im from '@/common/im.js'

Vue.use(uView);
Vue.prototype.$store = store;
Vue.prototype.$im = im;
Vue.prototype.$myAppConfig = myAppConfig
Vue.prototype.$smallProgramPay = smallProgramPay;
uni.$myAppConfig = myAppConfig

// import './composition-api'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)


import $ from "./utils/global/globalJs";
Vue.prototype.$ = $;

import base from './common/mixins/index.js';
Vue.mixin(base)

import pay from '@/utils/index.js'
Vue.prototype.$pay = pay

// 导航栏
import navbar from 'components/navbar.vue'
Vue.component('unavbar', navbar)
// 底部确认按钮
import botBtn from 'components/bot-btn.vue'
Vue.component('botBtn', botBtn)
// 底部确认按钮-大号
import botBtnp from 'components/bot-btnp.vue'
Vue.component('botBtnp', botBtnp)
// 搜索框
import search from 'components/search.vue'
Vue.component('usearch', search)
// 轮播图
import uswiper from 'components/swiper.vue'
Vue.component('uswiper', uswiper)
// 商品展示瀑布
import fall from 'components/fall.vue'
Vue.component('fall', fall)
// 标题
import mytitle from 'components/mytitle.vue'
Vue.component('mytitle', mytitle)
// 弹出框-安全密码支付
import pwdPay from 'components/pswd-pay.vue'
Vue.component('pwdPay', pwdPay)
// 订单信息
import orderInfo from 'components/order-info.vue'
Vue.component('orderInfo', orderInfo)
// 支付方式
import payWay from './components/pay-way.vue'
Vue.component('payWay', payWay)
// 获取验证码(倒计时)
import countdown from 'components/countdown.vue'
Vue.component('countdown', countdown)
// 获取验证码(登录/注册)
import countdownP from 'components/countdownYellow.vue'
Vue.component('countdownP', countdownP)
// 上传文件(图片，视频)
import myupload from 'components/upload.vue'
Vue.component('myupload', myupload)
// 没有数据
import empty from  'components/empty.vue'
Vue.component('empty', empty)

import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: store.state.lang.toString(), // 语言标识
	messages: {
		'1': require('./common/lang/zh'), // 中文简体语言包
		'2': require('./common/lang/en'), // 英语语言包
	},
	silentTranslationWarn: true,
})
Vue.prototype._i18n = i18n

import whotalk from './store/whotalk'
Vue.prototype.$store = whotalk;
Vue.prototype.ColorList = {
	"red":"#e54d42",
	"orange":"#f37b1d",
	"yellow":"#fbbd08",
	"olive":"#8dc63f",
	"green":"#39b54a",
	"cyan":"#1cbbb4",
	"blue":"#0081ff",
	"purple":"#6739b6",
	"mauve":"#9c26b0",
	"pink":"#e03997",
	"brown":"#a5673f",
	"grey":"#8799a3",
	"gray":"#f0f0f0",
	"black":"#333333",
	"dazzledark":"#2a2833",
	"white":"#ffffff",
	"limegreen":"#05c160",
}
import swasocket from "@/swasocket.js"
import swaLoad from './components/util/swaload.vue'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('swaload',swaLoad);
Vue.component('cu-custom',cuCustom);


Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.baseUrl = myAppConfig.baseUrl
const app = new Vue({
	i18n,
	store,
	...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/request.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.js'
Vue.use(httpApi, app)

app.$mount()

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
