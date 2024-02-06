<template>
	<view class="page" :class="getThemeClass">
		<view class="headPosition"></view>
		<view class="header">
			<image :src="`/static/images/my/${getThemeName}/my_bg.png`" class="header-bg-image" mode="widthFix"></image>
			<view class="header-content">
				<view class="header-top u-flex align-center justify-end">
					<template v-if="sign.num != 0">
						<template v-if="sign.status === 0">
							<view class="header-top-item u-m-l-30" style="position: relative;" @click="signIn()">
								<u-image 
									:src="`/static/images/my/${getThemeName}/wqd.png`" 
									width="50"
									height="50"
								></u-image>
								<u-badge :offset="[0, -5]" isDot absolute />
							</view>
						</template>
						<template v-if="sign.status === 1">
							<view class="header-top-item u-m-l-30">
								<image
									:src="`/static/images/my/${getThemeName}/qd.png`" 
									width="50"
									height="50"
									style="width: 50rpx; height: 50rpx;"
								></image>
							</view>
						</template>
					</template>
					<view class="header-top-item u-m-l-30" @click="$u.route('/pages/my/lucky-draw/lucky-draw')">
						<u-image 
							:src="`/static/images/my/${getThemeName}/turntable.png`" 
							width="50"
							height="50"
						></u-image>
					</view>
					<view class="header-top-item u-m-l-30" @click="$u.route('/pages/my/settings/settings')">
						<u-image 
							:src="`/static/images/my/${getThemeName}/sz.png`" 
							width="50"
							height="50"
						></u-image>
					</view>
				</view>
				
				<view class="u-flex align-center u-m-t-20">
					<u-avatar :src="userData.avatar" size="180"></u-avatar>
					<view class="u-m-l-30">
						<view class="u-m-t-0">
							<text class="u-font-38 u-m-r-20">{{userData.nickname}}</text>
							<!-- <u-tag :text="userData.level_name" mode="dark" type="success"/> -->
							<text class="Lv">VIP{{userData.area_level}} &nbsp;&nbsp; {{userData.vip_trade_total}}/{{userData.upgrade_amount}}</text>
						</view>
						<view class="u-m-t-10 id-tab-no-bg">
							<text class="u-font-24 text-content">账号：{{userData.user_account || 0}}</text>
							<image src="/static/images/copy.png" class="copy-image" @click="copy(userData.user_account)" mode=""></image>
						</view>
						<view class="u-m-t-10 id-tab-no-bg">
							<text class="u-font-24 line-1 text-content">区块链钱包地址：{{userData.account || '暂无'}}</text>
							<image src="/static/images/copy.png" class="copy-image" @click="copy(userData.account)" mode=""></image>
						</view>
						<view class="u-m-t-10 id-tab-no-bg">
							<text class="u-font-24 line-1 text-content" @click="openUrl(download.wenchang)">
								<text>区块链网址：</text>
								<text class="" style="color: royalblue;">{{download.wenchang || '暂无'}}</text>
							</text>
							<image src="/static/images/copy.png" class="copy-image" @click="copy(download.wenchang)" mode=""></image>
						</view>
					</view>
					
				</view>
				
				<view class="u-flex align-center justify-around u-m-t-50">
					<view class="u-flex-col-reverse align-center" @click="$u.route('/pages/my/focus-on/focus-on')">
						<text class="u-font-24 text-content">关注</text>
						<text class="u-font-32 text-bold u-m-b-5 u-m-l-0">{{userAuthor.concern||0}}</text>
					</view>
					
					<view class="u-flex-col-reverse align-center" @click="$u.route('/pages/my/fans/fans')">
						<text class="u-font-24 text-content">粉丝</text>
						<text class="u-font-32 text-bold u-m-b-5 u-m-l-0">{{userAuthor.fans||0}}</text>
					</view>
					
					<view class="u-flex-col-reverse align-center" @click="$u.route('/pages/my/i-like/i-like')">
						<text class="u-font-24 text-content">喜欢</text>
						<text class="u-font-32 text-bold u-m-b-5 u-m-l-0">{{userAuthor.my_like||0}}</text>
					</view>
					
					<view class="u-flex-col-reverse align-center" @click="$u.route('/pages/my/browse-history/browse-history')">
						<text class="u-font-24 text-content">浏览历史</text>
						<text class="u-font-32 text-bold u-m-b-5 u-m-l-0">{{history||0}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="content" >
			<view class="flex justify-between align-center u-m-b-30">
				<view class="home-card card-bg flex align-center" @click="$u.route('/pages/my/wallet/wallet')">
					<u-image
						:src="`/static/images/my/${getThemeName}/qbgl.png`" 
						class="kong-top-item-icon-box" 
						width="60"
						height="60"
					></u-image>
					<view class="u-m-l-14">
						<view class="u-font-28 text-w-500">钱包管理</view>
					</view>
				</view>
				<view class="home-card card-bg flex align-center" @click="$u.route('/pages/my/invite/invite')">
					<u-image
						:src="`/static/images/my/${getThemeName}/jfzh.png`" 
						class="kong-top-item-icon-box" 
						width="60"
						height="60"
					></u-image>
					<view class="u-m-l-14">
						<view class="u-font-28 text-w-500">积分账户</view>
					</view>
				</view>
			</view>
			<view class="main-card u-p-45">
				<view class="u-flex align-center justify-between cardMsg">
					<view class="u-flex-col align-center" @click="$u.route('/pages/my/collections/collections')">
						<u-image
							:src="`/static/images/my/${getThemeName}/wdcp.png`" 
							width="60"
							height="60"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">我的藏品</text>
					</view>
					<view class="u-flex-col align-center" @click="$u.route('/pages/my/airdrop-award/airdrop-activity')">
						<u-image
							:src="`/static/images/my/${getThemeName}/newrank.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">活动排行</text>
					</view>
					<view class="u-flex-col align-center" @click="$u.route('/pages/exchange/exchange')"> <!-- @click="zanwei" -->
						<u-image
							:src="`/static/images/my/${getThemeName}/qyzh.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">交易所</text>
					</view>
					
					<view class="u-flex-col align-center" @click="$u.route('/pages/my/transaction/transaction')">
						<u-image
							:src="`/static/images/my/${getThemeName}/jyjl.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">交易记录</text>
					</view>
				</view>
				
				<view class="u-flex align-center justify-between u-m-t-30 cardMsg">
				
					<view class="u-flex-col align-center" @click="$u.route('/pages/my/pending-payment/pending-payment')">
						<u-image
							:src="`/static/images/my/${getThemeName}/wmdd.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">待付款</text>
					</view>
					<view class="u-flex-col align-center" @click="$u.route('/pages/my/sell/sell')">
						<u-image
							:src="`/static/images/my/${getThemeName}/wmcd.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">我卖出的</text>
					</view>

					
					<view class="u-flex-col align-center" @click="$u.route('/pages/my/giveAway/giveAway')">
						<u-image
							:src="`/static/images/my/${getThemeName}/wdzz.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">我的转赠</text>
					</view>
					
					<view class="u-flex-col align-center" @click="$u.route('/pages/my/my-auction/my-auction')">
						<u-image
							:src="`/static/images/my/${getThemeName}/wdjp.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">我的竞拍</text>
					</view>
				</view>
			</view>
			
			<view class="main-card u-m-t-30 u-p-l-45 u-p-r-45">
				<view class="u-flex align-center justify-between cardMsg">
					<view class="u-flex-col align-center" @click="userData.check === 1? $u.route('/pages/my/verified/verifiedSuccess') : $u.route('/pages/my/verified/verified')">
						<u-image
							:src="`/static/images/my/${getThemeName}/smrz.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">实名认证</text>
					</view>
					<view class="u-flex-col align-center" @click="$u.route('/pages/my/creator/creator')">
						<u-image
							:src="`/static/images/my/${getThemeName}/ysjrz.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">作家入驻</text>
					</view>
					<view class="u-flex-col align-center" @click="$u.route('/pages/my/casting/casting')">
						<u-image
							:src="`/static/images/my/${getThemeName}/wzzd.png`" 
							width="60"
							height="60"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">我铸造的</text>
					</view>
					<view class="u-flex-col align-center" @click="$u.route('/pages/my/release/release')">
						<u-image
							:src="`/static/images/my/${getThemeName}/wfbd.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">我发布的</text>
					</view>
				</view>
				<view class="u-flex align-center justify-between cardMsg u-m-t-30">
					<view class="u-flex-col align-center" @click="$u.route('/pages/Special/Special-my_vip')">
						<u-image
							:src="`/static/images/my/${getThemeName}/my_vip.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">我的VIP</text>
					</view>
					<view class="u-flex-col align-center" @click="$u.route('/pages/AIcreation/AIcreation/AIcreation')">
						<u-image
							:src="`/static/images/my/${getThemeName}/AI.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">AI创作</text>
					</view>
					<view class="u-flex-col align-center" @click="$u.route('/pages/AIcreation/myGallery/myGallery')">
						<u-image
							:src="`/static/images/my/${getThemeName}/wdhl.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">我的画廊</text>
					</view>
					<view class="u-flex-col align-center" @click="$u.route('/pages/community/star/star')">
						<u-image
							:src="`/static/images/my/${getThemeName}/xnzt.png`" 
							width="55"
							height="55"
						></u-image>
						<text class="u-font-24 text-content u-m-t-20">虚拟展厅</text>
					</view>
				</view>
			</view>
			<view class="main-card u-m-t-30 bot_fun">
				<!-- <view class="botfun_item" @click="$u.route('/pages/my/airdrop-award/airdrop-activity')">
					<view class="item_left">
						<u-image
							:src="`/static/images/my/${getThemeName}/newrank.png`" 
							width="50"
							height="50"
						></u-image>
						<view class="color-call u-m-l-25">活动排行榜</view>
					</view>
					<u-icon class="u_icon" name="arrow-right"></u-icon>
				</view> -->
				<view class="botfun_item" @click="$u.route('/pages/tabbar/foundry/foundry')">
					<view class="item_left">
						<u-image
							:src="`/static/images/my/${getThemeName}/zhuzao.png`" 
							width="50"
							height="50"
						></u-image>
						<view class="color-call u-m-l-25">用户铸造</view>
					</view>
					<u-icon class="u_icon" name="arrow-right"></u-icon>
				</view>
				<view class="botfun_item" @click="$u.route('/pages/Special/SpecialOrder')">
					<view class="item_left">
						<u-image
							:src="`/static/images/my/${getThemeName}/zhuanqudingdan.png`" 
							width="50"
							height="50"
						></u-image>
						<view class="color-call u-m-l-25">专区订单</view>
					</view>
					<u-icon class="u_icon" name="arrow-right"></u-icon>
				</view>
				<view class="botfun_item" @click="$u.route('/pages/my/invite/invite')">
					<view class="item_left">
						<u-image
							:src="`/static/images/my/${getThemeName}/newmine-share.png`" 
							width="50"
							height="50"
						></u-image>
						<view class="color-call u-m-l-25">邀请分享</view>
					</view>
					<u-icon class="u_icon" name="arrow-right"></u-icon>
				</view>
				<view class="botfun_item" @click="$u.route('/pages/my/logistics-order/logistics-order')">
					<view class="item_left">
						<u-image
							:src="`/static/images/my/${getThemeName}/wuliudingdan.png`" 
							width="50"
							height="50"
						></u-image>
						<view class="color-call u-m-l-25">物流订单</view>
					</view>
					<u-icon class="u_icon" name="arrow-right"></u-icon>
				</view>
				<view class="botfun_item" @click="$u.route('/pages/my/faq/faq')">
					<view class="item_left">
						<u-image
							:src="`/static/images/my/${getThemeName}/cjwt.png`" 
							width="50"
							height="50"
						></u-image>
						<!-- 常见问题 -->
						<view class="color-call u-m-l-25">{{i18n.my19}}</view>
					</view>
					<u-icon class="u_icon" name="arrow-right"></u-icon>
				</view>
				<view class="botfun_item" @click="$u.route('/pages/my/contact/contact')">
					<view class="item_left">
						<u-image
							:src="`/static/images/my/${getThemeName}/lxwm.png`" 
							width="50"
							height="50"
						></u-image>
						<view class="color-call u-m-l-25">联系我们</view>
					</view>
					<u-icon class="u_icon" name="arrow-right"></u-icon>
				</view>
				<view class="botfun_item" @click="$u.route('/pages/my/about-us/about-us')">
					<view class="item_left">
						<u-image
							:src="`/static/images/my/${getThemeName}/gywm.png`" 
							width="50"
							height="50"
						></u-image>
						<!-- 关于我们 -->
						<view class="color-call u-m-l-25">{{i18n.my18}}</view>
					</view>
					<u-icon class="u_icon" name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		
		<u-modal
			class="my-modal"
			v-model="showSignIn" 
			:content="`签到将获得 ${sign.num} 积分`"
			title="签到" 
			:confirm-color="getMainColor" 
			@confirm="signIn(true)"
			confirmText="签到"
			show-cancel-button
			asyncClose
		></u-modal>
		
		<bottom-copyright />
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				history: '',
				userData: {},
				userAuthor: {},
				sign: {
					num: '0',
					status: 1
				},
				download: {
					wenchang: '',
				},
				showSignIn: false,
			};
		},
		onShow() {
			this.getUserinfo()
			// this.setTabBar()
		},
		onPullDownRefresh() {
			this.getUserinfo()
		},
		methods: {
			gomanage(){
				// let id = JSON.stringify(this.userData.user_cust_id)
				// console.log(id);
				uni.navigateTo({
					url:"/pages/my/manage/manage"
					// url:"/pages/my/manage/manage?id="+id
				})
			},
			getUserinfo() {
				this.$u.api.center_index().then(res => {
					if (res.code == 200) {
						this.history = res.data.history
						this.userData = res.data.user
						this.userAuthor = res.data.authors
						this.sign = res.data.sign
						this.download = res.data.download.download
					}
					uni.stopPullDownRefresh()
				}).catch(err => {
					uni.stopPullDownRefresh()
				})
			},
			signIn(o){
				if(o){
					this.$u.api.signUp().then(res => {
						if (res.code == 200) {
							this.getUserinfo()
							uni.showToast({
								icon: 'success',
								title: '签到成功'
							})
							this.showSignIn = false
						}
					})
				} else {
					this.showSignIn = true
				}
			},
			zanwei(){
				uni.showToast({
					icon: 'none',
					title: '暂未开放，敬请期待！'
				})
			}
		},
		computed: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.Lv{
		display: inline-block;
		background-color: #19be6b;
		padding: 2rpx 10rpx;
		border-radius: 10rpx;
		font-size: 20rpx;
	}
	.cardMsg{
		>view{
			width: 100rpx;
		}
	}
	.home-card{
		width: 335rpx;
		height: 130rpx;
		border-radius: 24rpx;
		padding-left: 30rpx;
	}
	.page{
		padding-top: 0rpx;
		// background-color: #FBF7F2;
	}
	.mine_back {
		width: 100%;
	}

	.header {
		position: relative;
		padding: calc(var(--status-bar-height) + 30rpx) 30rpx 0rpx;
		z-index: 0;
		.header-bg-image{
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
		}
		
		.header-content{
			position: relative;
			z-index: 1;
		}
	}
	
	.content{
		padding: 45rpx 30rpx;
		position: relative;
		z-index: 1;
	}

	.bot_fun {
		padding: 40rpx 30rpx;
		.botfun_item {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.item_left {
				display: flex;
				align-items: center;
				font-size: 30rpx;
			}

			.u_icon {
				color: #D6D2D3;
			}
		}

		.botfun_item+.botfun_item {
			margin-top: 60rpx;
		}
	}
	
	.id-tab{
		background-color: rgba(255, 255, 255, .1);
		border: solid 1rpx rgba(255, 255, 255, .5);
		padding: 5rpx 30rpx;
		border-radius: 30rpx;
		display: flex;
		width: max-content;
		max-width: 450rpx;
		align-items: center;
	}
	.id-tab-no-bg{
		// background-color: rgba(255, 255, 255, .1);
		// border: solid 1rpx rgba(255, 255, 255, .5);
		// padding: 5rpx 30rpx;
		border-radius: 30rpx;
		display: flex;
		width: max-content;
		max-width: 450rpx;
		align-items: center;
	}
	.u-flex-col-reverse {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column-reverse !important;
	}
</style>
