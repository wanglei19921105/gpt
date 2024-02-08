<template>
	<view class="page" :class="getThemeClass">
		<!-- 个人设置 -->
		<!-- <unavbar :title="i18n.setup1"></unavbar> -->
		<!-- 基本资料 -->
		<view class="title">{{i18n.setup2}}</view>
		<view class="fun fun_margin card-bg" @click="openWin('../info/info')">
			<!-- 个人资料 -->
			<view class="">{{i18n.setup3}}</view>
			<!-- 编辑资料 -->
			<view class="grey_text">{{i18n.setup4}}
				<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
			</view>
		</view>
		<!-- 安全设置 -->
		<view class="title">{{i18n.setup5}}</view>
		<view class="fun_box card-bg">
			<!-- 实名认证 -->
			<view class="fun" @click="goreal">
				<view>{{i18n.setup6}}</view>
				<view class="grey_text" :class="user.check == 1 && 'text-tips'">{{user.check==1?'已实名':i18n.setup7}}
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<view class="line"></view>
			<!-- 绑定手机号-->
			<!-- <view class="fun" @click="bindPhone">
				<view>绑定手机号</view>
				<view class="grey_text" :class="user.phone == 1 && 'text-tips'">{{user.phone ?'已绑定':'未绑定'}}
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<view class="line"></view> -->
			<!-- 修改登录密码 -->
			<view class="fun" @click="changePassword">
				<view>{{i18n.setup9}}</view>
				<view class="grey_text">
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<view class="line"></view>
			<view class="fun" @click="modifyPayment">
				<!-- 设置支付密码 -->
				<view>{{i18n.setup8}}</view>
				<view class="grey_text">
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<view class="line"></view>
			<view class="fun" @click="openWin('../address/address')">
				<view>管理收货地址</view>
				<view class="grey_text">
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<view class="line"></view>
			<!-- <view class="fun" @click="openWin('../bind-email/bind-email')">
				<view>{{i18n.setup10}}</view>
				<view class="grey_text" :class="user.email_status? '':'black_tips'">{{user.email_status?i18n.setup11:i18n.setup12}}
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<view class="line"></view> -->
			<view class="fun" @click="openWin('../bind-alipay/bind-alipay')">
				<!-- 绑定支付宝 -->
				<view>{{i18n.setup21}}</view>
				<!-- 已绑定-去绑定 -->
				<view class="grey_text" :class="draw? 'text-tips' : ''">{{draw?i18n.setup11:i18n.setup12}}
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<view class="line"></view>
			<view class="fun" @click="openWin('../bind-weChat/bind-weChat')">
				<view>绑定微信</view>
				<!-- 已绑定-去绑定 -->
				<view class="grey_text" :class="wechat? 'text-tips' : ''">{{wechat?i18n.setup11:i18n.setup12}}
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<view class="line"></view>
			<view class="fun" @click="gobank">
				<!-- 绑定银行卡 -->
				<view>绑定银行卡</view>
				<!-- 已绑定-去绑定 -->
				<view class="grey_text" :class="bank? 'text-tips' : ''">{{bank?i18n.setup11:i18n.setup12}}
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
		</view>

		<view class="title">关于</view>
		<view class="fun_box card-bg">
			<view class="fun" @click="$u.route('/pages/login/protocol/protocol')">
				<view>用户协议</view>
				<view class="grey_text">
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<view class="line"></view>
			<view class="fun" @click="$u.route('/pages/login/policy/policy')">
				<view>隐私政策</view>
				<view class="grey_text">
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<!-- <view class="line"></view>
			<view class="fun" @click="$u.route('/pages/login/certificate/certificate')">
				<view>证照信息</view>
				<view class="grey_text">
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view> -->
			<!-- #ifdef H5 -->
			<view class="line"></view>
			<view class="fun" @click="download">
				<view>下载APP</view>
				<view class="grey_text">
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<!-- #endif -->
			<!-- <view class="line"></view>
			<view class="fun" @click="$u.route('/pages/account/account')">
				<view>切换账户</view>
				<view class="grey_text">
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view> -->
		</view>

		<!-- <view class="title">系统主题设置</view>
		<view class="fun_box card-bg">
			<view class="fun">
				<view>浅色/深色</view>
				<u-switch v-model="curScreenStyle" :active-color="getMainColor" :disabled="myAutoChangeTheme"></u-switch>
			</view>
			<template v-if="isAutoChangeTheme">
				<view class="line"></view>
				<view class="fun">
					<view>跟随浏览器</view>
					<u-switch v-model="myAutoChangeTheme" :active-color="getMainColor"></u-switch>
				</view>
			</template>
		</view> -->

		<!-- 退出登录 -->
		<button type="default" class="sign_out color-red border-red" @click="signOut" >{{i18n.setup16}}</button>
		<button type="default" class="sign_out color-red border-red" style="margin-top: 30rpx;" @click="$u.route('/pages/account/account')">切换账户</button>
		<!-- #ifdef H5 -->
		<!-- <button type="default" class="sign_out color-red border-red" style="margin-top: 30rpx;" @click="download">下载APP</button> -->
		<!-- #endif -->

		<!-- 是否退出当前账号？ -->
		<u-modal v-model="show" class="my-modal" :content="i18n.setup22" :show-cancel-button="true" :show-title="false"
			:content-style="curScreenStyle?darkContentStyle:contentStyle" :confirm-text="i18n.setup17" :cancel-text="i18n.setup18"
			cancel-color="#999999" confirm-color="#333333" :confirm-style="curScreenStyle?darkConfirmStyle:confirmStyle"
			:cancel-style="cancelStyle" @confirm="confirm">
		</u-modal>

		<u-popup v-model="show1" mode="bottom" border-radius="14">
			<view class="popup_item">
				<view v-for="(item,index) in manner" :key="index" @click="rechargeCli(item.id)">{{item.name}}</view>
			</view>
			<view class="cancel" @click="cancel()">
				<!-- 取消 -->
				{{i18n.setup19}}
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				contentStyle: {
					color: '#111111',
					fontSize: '30rpx',
					fontWeight: 'bold',
					margin: '20rpx 0'
				},
				darkContentStyle: {
					color: '#FFFFFF',
				},
				confirmStyle: {
					backgroundColor: '#EEEEEE',
					fontWeight: 'bold',
					margin: '14rpx 30rpx 30rpx',
					borderRadius: '10rpx',
					height: '80rpx',
					lineHeight: '80rpx',
					fontSize: '30rpx',
				},
				darkConfirmStyle: {
					backgroundColor: '#111926',
					fontWeight: 'bold',
					margin: '14rpx 30rpx 30rpx',
					borderRadius: '10rpx',
					height: '80rpx',
					lineHeight: '80rpx',
					fontSize: '30rpx',
					color: '#FFF'
				},
				cancelStyle: {
					border: '1px solid #EEEEEE',
					margin: '14rpx 30rpx 30rpx',
					borderRadius: '10rpx',
					height: '80rpx',
					lineHeight: '80rpx',
					fontSize: '30rpx',
				},
				manner: [{
						id: 1,
						name: '中文简体'
					},
					{
						id: 2,
						name: 'English'
					}
				],
				// 当前语言
				rechargeMethod: '',
				show1: false,
				user: '',
				draw: '',
				wechat: '',
				androidUrl:'',
				iosUrl:'',
				system:'iOS',
				bank:'',
				xiazai:''
			};
		},
		created() {},
		onShow() {
			this.getUserinfo()
			this.getDrawinfo()
			this.getWechat()
			this.getBank()
			uni.getSystemInfo({
				success: (res) => {
					this.system = res.system
					console.log(this.system);
				}
			})
		},
		methods: {
			download(){
				// location.href = this.xiazai
				if (this.xiazai) {
					window.open(this.xiazai)

				}
				// if(this.system.startsWith('iOS')){
				// 	window.open(this.iosUrl)
				// }else{
				// 	window.open(this.androidUrl)
				// }
			},
			getUserinfo() { //我的(首页)--接口
				this.$u.api.center_index().then(res => {
					this.user = res.data.user
					this.xiazai = res.data.xiazai
					this.iosUrl = res.data.download.download.iosUrl
					this.androidUrl = res.data.download.download.androidUrl
				}).catch(err => {})
			},
			getDrawinfo() { //收款方式信息--接口（支付宝）
				this.$u.api.draw_info({
					'type': 2
				}).then(res => {
					if (res.code == 200) {
						this.draw = res.data.info
					}
				}).catch(err => {})
			},
			getBank() { //收款方式信息--接口（银行卡）
				this.$u.api.draw_info({
					'type': 3
				}).then(res => {
					if (res.code == 200) {
						this.bank = res.data.info
					}
				}).catch(err => {})
			},
			getWechat() { //收款方式信息--接口（微信）
				this.$u.api.draw_info({
					'type': 1
				}).then(res => {
					if (res.code == 200) {
						this.wechat = res.data.info
					}
				}).catch(err => {})
			},
			// 打开退出登录提示
			signOut() {
				this.show = true
			},
			// 确认退出当前登录
			confirm() {
				this.$im.imLogout()
				uni.removeStorageSync('token')
				uni.removeStorageSync('id')
				// 关闭所有页面，跳转登录页
				uni.reLaunch({
					url: '../../login/index/logInMain'
				})
			},
			// 切换语言弹窗状态
			popup_show() {
				if (this.show1) {
					this.show1 = false
				} else {
					this.show1 = true
				}
			},
			// 切换语言取消
			cancel() {
				this.show1 = false
			},
			// 切换语言
			rechargeCli(id) {
				if (id == 1) {
					this.rechargeMethod = '中文简体',
						this.$store.commit("SetLang", 1)
					this.show1 = false
				}
				if (id == 2) {
					this.rechargeMethod = 'English',
						this.$store.commit("SetLang", 2)
					this.show1 = false
				}
			},
			// 修改登录密码
			changePassword(){
				if(this.user.phone){
					uni.navigateTo({
						url: '../revise-pwd/revise-pwd?phone='+this.user.phone
					})
				}else{
					uni.showToast({
						title:"请先绑定手机号",
						icon:"error"
					})
				}
			},
			modifyPayment(){
				if(this.user.phone){
					uni.navigateTo({
						url: '../transaction-pwd/transaction-pwd'
					})
				}else{
					uni.showToast({
						title:"请先绑定手机号",
						icon:"error"
					})
				}
			},

			bindPhone(){
				if(!this.user.phone){
					uni.navigateTo({
						url: '/pages/my/bindPhone/bindPhone'
					})
				}else{
					uni.showToast({
						title:"已绑定",
						icon:"none"
					})
				}
			},
			goreal(){
				if(this.user.check==1){
					// uni.showToast({
					// 	title:"已实名",
					// 	icon:"none"
					// })
					uni.navigateTo({
						url: '/pages/my/verified/verifiedSuccess'
					})
				}else{
					uni.navigateTo({
						url:"../verified/verified"
					})
				}
			},
			gobank(){
				this.openWin('../bind-bank/bind-bank')
				// if(this.bank==null||this.bank==''){
				// 	this.openWin('../bind-weChat/bind-bank')
				// }else{
				// 	uni.showToast({
				// 		title:"已绑定",
				// 		icon:"none"
				// 	})
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	background-color: #F9F9F9;
	// 	min-height: 100vh;
	// 	overflow: hidden;
	// }

	// page {
	// 	background-color: #F9F9F9;
	// }

	.page-black {
		// background-color: #1E2020;

		// .fun {
		// 	background-color: #292B2B;
		// 	color: #fff;

		// 	.grey_text {
		// 		color: #999999;
		// 	}

		// 	.black_text {
		// 		color: #fff !important;
		// 	}
		// }

		// .sign_out {
		// 	background-color: #1E2020;
		// }

		// .line {
		// 	background-color: #363737;
		// }

		// /deep/.u-model {
		// 	background-color: #1E1E1E !important;
		// }
	}

	.title {
		margin: 40rpx 0 24rpx 32rpx;
		font-size: 26rpx;
	}

	.fun {
		height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;

		.grey_text {

			.uicon {
				margin-left: 20rpx;
			}
		}
	}

	.fun_margin {
		margin: 24rpx 30rpx 40rpx;
		border-radius: 20rpx;
	}

	.fun_box {
		margin: 24rpx 30rpx 40rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.line {
		height: 1px;
		width: 90%;
		margin: 0 auto;
	}

	// .black_text {
	// 	color: #333333 !important;
	// }

	.sign_out {
		border-radius: 10rpx;
		border: 1px solid;
		margin: 100rpx 45rpx 40rpx;
		height: 86rpx;
		line-height: 86rpx;
		// color: red;
		font-size: 30rpx;
		background-color: transparent;
	}

	/deep/.u-border-top:after {
		border: none;
	}

	/deep/.u-drawer-bottom {
		background-color: transparent;
	}

	.popup_item {
		background-color: #fff;
		text-align: center;
		border-radius: 20rpx;
		margin: 20rpx 30rpx;

		view {
			height: 120rpx;
			line-height: 120rpx;
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
		}
	}

	.cancel {
		background-color: #fff;
		text-align: center;
		border-radius: 20rpx;
		margin: 20rpx 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		color: #999999;
	}
</style>
