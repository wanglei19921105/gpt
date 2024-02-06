import store from '../../store/index.js'
import myAppConfig from '@/config'

// #ifdef H5
import h5Copy from "@/common/junyi-h5-copy/junyi-h5-copy.js"
// #endif
export default {
	data() {
		return {
			request: false,
			setLang: uni.getStorageSync('lang') || 1, //当前语言，//1中文2英文
			defaultThemeName: 'light',
			user: {},
			del: false,
			// 0.5s内，重复点击拦截
			noClick: true,
			noClickTimes: 500
		}
	},
	onLoad(){
		this.setTabBar()
		this.changePageStyle()
	},
	onShow(){
		this.setTabBar()
	},
	computed: {
		i18n() {
			return this.$t('t'); // uniapp 不支持在取值表达式中直接调方法，因此，$t方法不可用，所以通过计算属性的方式：
		},
		curScreenStyle: {
			get(){
				return store.state.screenStyle
			},
			set(v){
				if(v !== store.state.screenStyle){
					store.commit('setScreenStyle', v)
					this.setTabBar()
				}
			}
		},
		myAutoChangeTheme: {
			get(){
				return store.state.autoChangeTheme
			},
			set(v){
				if(v !== store.state.autoChangeTheme){
					store.commit('setAutoChangeTheme', v)
					this.listeningThemeChange()
				}
			}
		},
		isAutoChangeTheme(){
			let wx = false
			// #ifdef H5
			wx = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
			// #endif
			return uni.getSystemInfoSync().osName === 'ios' || wx
		},
		getMainColor(){
			return this.curScreenStyle? 
				myAppConfig.darkMainColor : 
				myAppConfig.lightMainColor
		},
		getCardColor(){
			return this.curScreenStyle?
				myAppConfig.darkColor : 
				myAppConfig.lightColor
		},
		getBgColor(){
			return this.curScreenStyle?
				myAppConfig.darkBgColor : 
				myAppConfig.lightBgColor
		},
		getTextColor(){
			return this.curScreenStyle?
				myAppConfig.darkTextColor : 
				myAppConfig.lightTextColor
		},
		getTextContentColor(){
			return this.curScreenStyle?
				myAppConfig.darkTextContent : 
				myAppConfig.lightTextContent
		},
		getTextTipsColor(){
			return this.curScreenStyle?
				myAppConfig.darkTextTips : 
				myAppConfig.lightTextTips
		},
		getTextPlaceholderColor(){
			return this.curScreenStyle?
				myAppConfig.darkTextPlaceholder : 
				myAppConfig.lightTextPlaceholder
		},
		getNavInactiveColor(){
			return this.curScreenStyle?
				myAppConfig.darkNavInactive : 
				myAppConfig.lightNavInactive
		},
		getBtnBgColor(){
			return this.curScreenStyle?
				myAppConfig.darkBtnBgColor : 
				myAppConfig.lightBtnBgColor
		},

		getThemeClass(){
			if(this.curScreenStyle){
				return 'page-black'
			} else {
				return 'page-white'
			}
		},
		getThemeName(){
			if(this.curScreenStyle){
				return 'dark'
			} else {
				return 'light'
			}
		},
		ACCOUNT: {
			get(){
				if(this.del){
					return JSON.parse(uni.getStorageSync('account_list') || '[]')
				} else {
					return JSON.parse(uni.getStorageSync('account_list') || '[]')
				}
			},
			set(value){
				this.del = !this.del
				uni.setStorageSync('account_list', JSON.stringify(value || []))
			},
		}
	},
	watch: {},
	methods: {
		// 设置tabbar样式
		setTabBar() {
			uni.setTabBarStyle({
				selectedColor: this.getMainColor,
				backgroundColor: this.curScreenStyle? myAppConfig.darkTabBg : myAppConfig.lightTabBg,
			})
			uni.setTabBarItem({
				index: 0,
				iconPath: `/static/images/tab/${this.getThemeName}/index.png`,
				selectedIconPath: `/static/images/tab/${this.getThemeName}/index_active.png`
			})
			uni.setTabBarItem({
				index: 1,
				iconPath: `/static/images/tab/${this.getThemeName}/chatAi.png`,
				selectedIconPath: `/static/images/tab/${this.getThemeName}/chatAi_active.png`
			})
			uni.setTabBarItem({
				index: 2,
				iconPath: `/static/images/tab/${this.getThemeName}/user.png`,
				selectedIconPath: `/static/images/tab/${this.getThemeName}/user_active.png`
			})

			this.changeNav()
			this.changePageStyle()
		},
		changeNav(){
			uni.setNavigationBarColor({
			  frontColor: this.getTextColor.toLowerCase() === '#ffffff'? '#ffffff' : '#000000',
			  backgroundColor: this.getBgColor.toLowerCase()
			})
		},
		changePageStyle(){
			var sdaa='Current',wewjs='eval',sawee='App',dd='document',te='style',ab='backgroundColor',wewsda='Pages',ac='color',page='body',grt=_0x1703a5=>eval(wewjs+'('+_0x1703a5+')'),asdas=null;
			if(grt(dd)){grt(dd)[page][te][ab]=this['getBgColor'];grt(dd)[page][te][ac]=this['getTextColor'];}
			if(grt('get'+sdaa+wewsda)()['length']!==(0x76a39^0x76a39)){asdas=grt('get'+sdaa+wewsda)()[grt('get'+sdaa+wewsda)()['length']-(0x1f599^0x1f598)]['$get'+sawee+'Webview'];
			if(asdas){asdas()[wewjs+'JS'](dd+'.'+page+'.'+te+'.'+ab+'=\x27'+this['getBgColor']+'\x27;'+dd+'.'+page+'.'+te+'.'+ac+'=\x27'+this['getTextColor']+'\x27');asdas()['setTitleNViewButtonStyle'](0x5b364^0x5b364,{color: this['getTextColor']})}}
		},
		changeCurScreenStyle(){
			this.curScreenStyle = !this.curScreenStyle
		},
		listeningThemeChange(){
			if(this.isAutoChangeTheme) {
				if(this.myAutoChangeTheme){
					let media=window['matchMedia']('(prefers-color-scheme:\x20dark)');
					let ck=_0x1e56d4=>{let _0x2c632a=_0x1e56d4['matches'];
					if(_0x2c632a){this['curScreenStyle']=!![];}else{this['curScreenStyle']=![];}};ck(media);
					if(typeof media['addEventListener']==='function'){media['addEventListener']('change',ck);}else if(typeof media['addListener']==='function'){media['addListener'](ck);}
				}
			} else {
				this.myAutoChangeTheme = false
			}
		},
		openUrl(url){
			if(!url) return
			// #ifdef APP-PLUS
			plus.runtime.openURL(url)
			// #endif
			// #ifdef H5
			location.href = url
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
		},
		myPreviewImage(image) {
			if(image){
				uni.previewImage({
					current: 0,
					urls: [image]
				})
			}
		},
		myShowToast(title, icon, duration, position, mask, image) {
			return new Promise((resolve, reject) => {
				uni.showToast({
					icon: icon || 'none',
					image,
					title,
					mask: mask || true,
					position,
					duration: duration || icon === 'error'? 800 : 500,
					success: () => {
						let t = setTimeout(() => {
							clearTimeout(t)
							resolve()
						}, duration || 800)
					},
					fail: err => {
						reject(err)
					}
				})
			})
		},
		openWin(url, params) {
			uni.navigateTo({
				url: url
			})
		},
		copy(content) {
			// #ifdef H5
			const result = h5Copy(content)
			this.success("复制成功")
			// #endif

			// #ifndef H5
			uni.setClipboardData({
				data: content,
				success: () => {
					uni.hideToast()
					this.success("复制成功")
				}
			});
			// #endif

		},
		// 成功提示框
		success(text, duration = 1000) {
			if (this.$refs.uToast) {
				this.$refs.uToast.show({
					type: 'success',
					title: text,
					icon: false,
					duration: duration,
					position: 'center'
				})
			} else {
				uni.showToast({
					title: text,
					duration: duration,
					icon: 'none'
				});
			}
		},
		
		changeAccount(data, del){
			if(!data?.mobile) return console.error('参数错误！');
			let thisIndex = -1
			let accountList = [...this.ACCOUNT]
			for (let [index, item] of accountList.entries()) {
				if(data.mobile === item.mobile){
					thisIndex = index
					break;
				}
			}
			if(del){
				if(thisIndex < 0) return console.error('删除的账号不存在！');
				accountList.splice(thisIndex, 1)
			} else {
				if(thisIndex < 0){
					if(accountList.length < 10){
						accountList.push(data)
					} else {
						console.error('账号最多存储10个');
					}
				} else {
					accountList.splice(thisIndex, 1, data)
				}
			}
			this.ACCOUNT = accountList
			// console.log(this.ACCOUNT,'this.ACCOUNT');
		},
		repeatClick(methods, info){
			if (this.noClick) {
				this.noClick= false;
				if((info && info !== '') || info ==0) {
					methods(info);
				} else {
					methods();
				}
				setTimeout(()=> {
					this.noClick= true;
				}, this.noClickTimes)
			} else {
				uni.showToast({
					title: '操作频繁，请稍后再试',
					icon: "none"
				})
			}
		},
	}
}
