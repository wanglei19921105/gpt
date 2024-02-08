<script>
    import Vue from 'vue'
	import RootStore from '@xkit-yx/im-store'
    import core from "@/core.js"
    import swasocket from "@/swasocket.js"

	import {
		NimKitCore
	} from '@xkit-yx/core-kit/dist/uniapp-nim-core'
	const STORAGE_KEY = '__yx_im_options__'
	export default {
		globalData: {
			type: 0,
			keyword: '',
			audioContext: null,
			address: null
		},
		onLaunch: function(options) {
			this.listeningThemeChange()

			if (uni.$UIKitStore?.connectStore.connectState === 'connected') { //im连接
				return
			}
			const imOptions = uni.getStorageSync(STORAGE_KEY);
			// if (imOptions) {
			// 	this.initNim(imOptions)
			// }
			// this.$im.initIm().then(()=>{
			// 	uni.$emit('onImReady')
			// })
            console.log('欢迎使用Whotalk即时通讯系统');
            console.log('Whotalk官网：https://www.whotalk.com.cn/');
            if(typeof(options.query.debug)!='undefined') core.debug = options.query.debug=='yes' ? true : false;
            if(typeof(options.query.fromuid)!='undefined') core.agentid = parseInt(options.query.fromuid);
            let userstate = typeof(options.query.state)=='undefined' ? '' : options.query.state;
            core.init(userstate);
            uni.getSystemInfo({
                success: function(e) {
                    let custom, CustomBar;
                    // #ifndef MP
                    Vue.prototype.StatusBar = e.statusBarHeight;
                    if (e.osName == 'android') {
                        CustomBar = e.statusBarHeight + 50;
                    } else {
                        CustomBar = e.statusBarHeight + 45;
                        core.device = 'ios';
                    };
                    // #endif
                    // #ifdef MP-WEIXIN
                    custom = wx.getMenuButtonBoundingClientRect();
                    CustomBar = custom.bottom + custom.top - e.statusBarHeight;
                    // #endif
                    // #ifdef MP-TOUTIAO
                    custom = tt.getMenuButtonBoundingClientRect();
                    CustomBar = custom.bottom + custom.top - e.statusBarHeight;
                    // #endif
                    // #ifdef MP-TOUTIAO || MP-WEIXIN
                    Vue.prototype.StatusBar = e.statusBarHeight;
                    Vue.prototype.Custom = custom;
                    // #endif
                    // #ifdef MP-ALIPAY
                    CustomBar = e.statusBarHeight + e.titleBarHeight;
                    // #endif
                    Vue.prototype.CustomBar = e.CustomBar = CustomBar;
                    core.Client = e;
                }
            })
            // #ifdef APP-PLUS
            if(typeof(plus.push)!='undefined'){
                const _handlePush = function(message) {
                    // TODO
                    let payload = message.payload;
                    if(core.isJsonString(payload)){
                        payload = JSON.parse(payload);
                    }
                    if(typeof(payload.pagePath)!='undefined'){
                        let ws = plus.webview.currentWebview();
                        let weburl = ws.getURL();
                        let redt = weburl.indexOf('dialog/index')>-1 ? 1 : 0;
                        return core.navito('index/index',{rd:payload.pagePath});
                    }
                };
                plus.push.addEventListener('click', _handlePush);
                //plus.push.addEventListener('receive', _handlePush);
            }
            // #endif
            uni.$on('SwaSocketConnect', function(res){
                uni.$on('SRredirect', function(socketdata){
                    core.navito(socketdata.page,socketdata.data,socketdata.mode);
                });
                uni.$on('SRmessage', function(socketdata){
                    core.toast(socketdata.message,socketdata.redirect,socketdata.mode);
                });
                uni.$on("UserLogout",function(e){
                    uni.$off('SRredirect');
                    uni.$off('SRmessage');
                });
            });
            uni.onNetworkStatusChange(function (res) {
                uni.$emit("NetworkStatusChange", res);
                if(res.isConnected){
                    if(!core.connected){
                        core.initsys(userstate);
                    }else if(!swasocket.Connected){
                        core.initsocket(core.userinfo.usersign, core.system.socket);
                    }
                }
            });

		},
		onShow: function() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			// #endif


			// // #ifdef H5
			// // 防止H5端 调试出现鼠标右键菜单
			// window.oncontextmenu = function () { return false; }
			// // F12后调起debugger
			// setInterval(function() {
			//     check()
			// }, 1000);
			// var check = function() {
			//     function doCheck(a) {
			//         if (("" + a / a)["length"] !== 1 || a % 20 === 0) {
			//             (function() {}
			//             ["constructor"]("debugger")())
			//         } else {
			//             (function() {}
			//             ["constructor"]("debugger")())
			//         }
			//         doCheck(++a)
			//     }
			//     try {
			//         doCheck(0)
			//     } catch (err) {}
			// };
			// check();
			// // #endif
            if(!core.appshowing && core.userinfo.uid>0){
                if(core.system.socket.type=='local'){
                    core.SocketHeart(core.userinfo.usersign);
                }
            }
            core.appshowing = true;
            // #ifdef APP-PLUS
            let args = plus.runtime.arguments;
            if(args){
                console.log(args);
            }
            // #endif
            console.log('App Show');
		},
		onHide: function() {
            core.appshowing = false;
        },
		methods: {


		}
	}
</script>

<style lang="scss">
@import "~@/utils/global/css/css.css";
	/* #ifndef APP-NVUE */
	@import "uview-ui/index.scss";
	@import "/common/animate.css";
	@import "@/common/index.scss";
	@import "@/common/ifont.css";
	@import '@/style/theme.scss';
	@import "@/static/im/iconfont.css";
  rich-text img{
    width: 100%;
  }
	// 去除原生按钮边框
	uni-button:after {
		border: none;
	}

	view {
		word-wrap: break-word
	}

	/deep/.uni-page-head .uni-page-head__title {
		font-size: 40rpx !important;
		line-height: 60rpx !important;
	}

	.presale {
		padding-left: 16rpx !important;
		width: 100% !important;
	}

	.soldout {
		position: absolute;
		top: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 0 0 0 20rpx;
		padding: 8rpx 15rpx;
		font-size: 22rpx;
		color: #eee;
	}

	/* #endif */

    /* #ifndef APP-PLUS-NVUE */
    @import "colorui/main.css";
    @import "colorui/icon.css";
    @import "@/colorui/ifont.css";
    @import "style.css";

    .status_bar{width: 100%; height: var(--status-bar-height);}
    /* #endif */
</style>
