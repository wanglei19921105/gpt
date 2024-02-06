<template>
	<view class="page" :class="getThemeClass">
		<unavbar :isback="false" class="my-nav-ber-a-box">
			<view class="my-nav-ber-a">
				<view class="my-nav-ber-a-l text-main">
					<!-- <text class="my-nav-ber-a-l-text">{{i18n.name}}</text> -->
					<image src="../../../static/images/index/light/baidong_icon.png" style="width: 190rpx;"
						mode="widthFix" class="u-m-t-15"></image>
				</view>
				<view class="my-nav-ber-a-r" style="display: flex;">
					<u-icon name="search" :color="getTextContentColor" size="40"
						@click="$u.route('/pages/tabbar/bazaar/bazaar')"></u-icon>
				</view>

			</view>
		</unavbar>

		<!-- banner -->
		<!-- <view class="u-p-t-30 u-p-b-20 u-p-l-28 u-p-r-28">
			<uswiper :list="list"></uswiper>
		</view> -->
		<view class="u-p-t-30 u-p-b-20 u-p-l-0 u-p-r-0">
			<uswiper :list="list" effect3d></uswiper>
		</view>
		<!-- 菜单 -->

		<view class="new-page-padding">
			<view class="home-notice card-bg flex align-center">
				<view class="u-m-r-20 flex-shink">
					<image src="/static/images/index/light/ggao_icon.png"
						style="width: 160rpx;height: 40rpx;margin-top: 15rpx;" mode=""></image>
				</view>

				<swiper :circular="true" :autoplay="true" :interval="3000" :vertical="true" class="home-noticeswi">
					<swiper-item v-for="(item,index) in noticelist" :key="index" class="home-noticeswiitem"
						@click="openWin('../../blog/blog-def/blog-def?id='+item.id)">
						<view class="line-1" style="font-size:24rpx;width: 550rpx;color: #747982;">{{item.title}}</view>
					</swiper-item>
				</swiper>
			</view>


			<view class="home_cardall" @touchmove.stop>
				<view class="home-card flex card-bg  align-center"
					@click="$u.route('/pages/my/airdrop-award/airdrop-activity')">
					<u-image :src="`/static/images/index/light/openbg1.png`" class="kong-top-item-icon-box u-m-l-30"
						width="56" height="56"></u-image>
					<view class="u-m-l-22">
						<view class="u-font-28 text-w-500" style="margin-top:6px;">活动排行榜</view>
						<view class="u-font-20 u-m-t-10 color-9a"> </view>
					</view>
				</view>
				<view class="home-card flex card-bg  align-center" @click="$u.route('/pages/my/invite/invite')">
					<u-image :src="`/static/images/index/light/openbg2.png`" class="kong-top-item-icon-box u-m-l-30"
						width="56" height="56"></u-image>
					<view class="u-m-l-22">
						<view class="u-font-28 text-w-500" style="margin-top:6px;">邀请好友</view>
						<view class="u-font-20 u-m-t-10 color-9a"> </view>
					</view>
				</view>
				<!-- @click="$u.route('/pages/my/signIn/index')" -->
				<view class="home-card flex card-bg  align-center" @click="goUrl('/pages/my/signIn/index')">
					<u-image :src="`/static/images/index/light/openbg3.png`" class="kong-top-item-icon-box u-m-l-30"
						width="56" height="56"></u-image>
					<view class="u-m-l-22">
						<view class="u-font-28 text-w-500" style="margin-top:6px;">每日签到</view>
						<view class="u-font-20 u-m-t-10 color-9a"> </view>
					</view>
				</view>
				<view class="home-card flex card-bg  align-center"
				@click="goUrl('/pages/my/airdrop-award/airdrop-award')"
					>
					<!-- @click="$u.route('/pages/my/airdrop-award/airdrop-award')" -->
					<u-image :src="`/static/images/index/light/openbg4.png`" class="kong-top-item-icon-box u-m-l-30"
						width="56" height="56"></u-image>
					<view class="u-m-l-22">
						<view class="u-font-28 text-w-500" style="margin-top:6px;">积分商城</view>
						<view class="u-font-20 u-m-t-10 color-9a"> </view>
					</view>
				</view>
				<!-- <view class="home-card flex card-bg  align-center" @click="$u.route('/pages/market/nirvana/nirvana')" :style="{ background: `url(${picture5})`, 'background-size': '100% 100%' }">
					
					<view class="u-m-l-14">
						<view class="u-font-28 text-w-500 text-white">涅槃池</view>
						<view class="u-font-20 u-m-t-10 text-white">超级藏品来创作</view>
					</view>
				</view> -->
			</view>

			<!-- 	<view class="flex justify-between align-center u-m-t-20">
			</view> -->

			<view class="main-card kong-bottom-box u-flex m-page-content-item justify-around u-m-t-20">
				<view class="u-flex-col align-center" @click="$u.route('/')">
					<u-image :src="`/static/images/index/${defaultThemeName}/Copyright.png`"
						class="kong-top-item-icon-box" width="60" height="60"></u-image>
					<text class="u-font-20 u-m-t-10 text-content">AI助手</text>
				</view>

				<view class="u-flex-col align-center" @click="$u.route('/pages/AIcreation/myGallery/myGallery')">
					<u-image :src="`/static/images/index/${defaultThemeName}/Blindbox.png`"
						class="kong-top-item-icon-box" width="60" height="60"></u-image>
					<text class="u-font-20 u-m-t-10 text-content">AI创作</text>
				</view>

				<view class="u-flex-col align-center" @click="$u.route('/pages/my/lucky-draw/lucky-draw')">
					<u-image :src="`/static/images/index/${defaultThemeName}/drawlots.png`"
						class="kong-top-item-icon-box" width="60" height="60"></u-image>
					<text class="u-font-20 u-m-t-10 text-content">抽奖</text>
				</view>

				<view class="u-flex-col align-center" @click="$u.route('/')">
					<u-image :src="`/static/images/index/${defaultThemeName}/compose.png`"
						class="kong-top-item-icon-box" width="60" height="60"></u-image>
					<text class="u-font-20 u-m-t-10 text-content">会员榜</text>
				</view>

				<view class="u-flex-col align-center" @click="$u.route('/pages/my/myTeam/myTeam')">
					<u-image :src="`/static/images/index/${defaultThemeName}/npc.png`" class="kong-top-item-icon-box"
						width="60" height="60"></u-image>
					<text class="u-font-20 u-m-t-10 text-content">团队榜</text>
				</view>

			</view>

		</view>

		<u-tabs :list="seriesList" :current="current" @change="change" height="90" :active-color="getTextColor"
			:inactive-color="getNavInactiveColor" font-size="24" class="utabs" bg-color="transparent" :show-bar='true'
			:bar-style="{backgroundColor:getTextColor}" :active-item-style="{fontSize: '32rpx'}"
			:is-scroll="true"></u-tabs>
		<!-- marginBottom:'-22rpx',,backgroundImage:'url(../../../static/images/index/light/subtitle.png)',backgroundSize: '100% 100%' -->

		<!-- <view 
			class="home-sdchange flex justify-between align-center card-bg" 
			v-if="current<2"
			@click="click_double"
		>
			<view class="img-28"></view>
			<view class="">点击切换{{isDouble?'单':'双'}}列模式</view>
			<image src="../../../static/images/single.png" class="img-28" v-if="isDouble"></image>
			<image src="../../../static/images/double.png" class="img-28" v-else></image>
		</view> -->

		<!-- 精选系列 -->
		<my-goods-list v-if="current === 0" :listData="featuredList" :doubleLine="isDouble" :paging="false" />

		<!-- 盲盒系列 -->
		<my-goods-list v-if="current === 1" :listData="blindboxList" listType="blind" :doubleLine="isDouble"
			:paging="false" />

		<!-- 人气艺术家 -->
		<artist v-if="current == 3" :list="artistData"></artist>

		<!-- 发售日历 -->
		<view class="u-p-l-28 u-p-r-28" v-if="current==2">
			<view class="main-card u-m-t-20 pos-re" v-for="(item,index) in clendar" :key="index"
				@click="$u.route('/pages/my/calendar/calendar-detail',{id:item.id})">
				<view class="rili-tag text-default u-font-28 text-bold">即将开始 {{item.show_at}}</view>
				<view class="gap-50"></view>
				<image :src="item.cover" mode="aspectFill" class="rili-img"></image>
				<view class="u-m-t-40 u-font-36 text-bold">{{item.title}}</view>
				<view class="text-tips u-m-t-28 u-font-26">限量{{item.num}}份</view>
				<view class="flex justify-between align-center u-m-t-24">
					<view class="flex align-center">
						<image :src="item.author.avatar||'/static/logo.png'" mode="aspectFill" class="rili-authorimg">
						</image>
						<view class="u-m-l-12 u-font-26 text-bold">{{item.author.nickname}}</view>
					</view>
					<view class="rili-price">{{item.price}}USDT</view>
				</view>
			</view>
		</view>

		<!-- 点击查看更多盲盒 -->
		<!-- <botBtn 
			class="u-m-t-50" 
			radius="50rpx" 
			@click="$u.route('/pages/frontPage/blindBox/blindBox')"
			v-if="current == 1"
		>{{i18n.home9}} >></botBtn> -->

		<botBtn class="u-m-t-50" radius="50rpx" @click="$u.route('/pages/market/artist/artist')" v-if="current == 3">
			点击查看更多艺术家 >></botBtn>

		<view class="gap-50"></view>
		<u-toast ref="uToast" />
		<view class="page-bg"></view>

		<uni-popup ref="startPopup" type="center" :animation="true">
			<view class="flex align-center start-opup-box">
				<!-- <u-image :src="startAnimationUrl" mode="scaleToFill" class="start-img"></u-image> -->
				<u-image :src="startAnimationUrl" class="start-img" width="600" height="900"></u-image>
				<uni-icons type="close" color="#fff" class="u-m-t-25" @click="$refs.startPopup.close()"
					size="36"></uni-icons>
			</view>
		</uni-popup>

		<!-- <view class="real-name-prompt" v-if="userCheck === 0 && token">
			<text>您尚未实名认证（实名后可购买藏品）</text>
			<u-button 
				size="mini" 
				type="info" 
				:custom-style="{margin: '0rpx'}"
				@click="$u.route('/pages/my/verified/verified')"
			>
				<text>去实名</text>
				<u-icon name="arrow-right"></u-icon>
			</u-button>
		</view>
		 -->
		<u-modal class="my-modal" v-model="showSignIn" :content="`签到将获得 ${sign.num} 积分`" title="签到"
			:confirm-color="getMainColor" @confirm="signIn(true)" confirmText="签到" show-cancel-button
			asyncClose></u-modal>
		<bottom-copyright />

	</view>
</template>

<script>
	import artist from '../../../components/artist.vue'
	// import blindbox from '../../../components/blindbox.vue'
	// #ifdef APP-PLUS
	// import update from '@/pages/checkUpdate/utils/check-update.js'
	// #endif
	export default {
		components: {
			artist,
			// blindbox,
		},
		data() {
			return {
				show: false,
				showSignIn: false,
				keyword: '', //搜索框搜索关键字
				list: [], //banner图
				seriesList: [{
						name: ''
					},
					{
						name: ''
					}
				],
				current: 0,
				featuredList: [], //精选系列
				artistData: [], //人气艺术家
				blindboxList: [],
				clendar: [],
				startAnimationUrl: '',
				isDouble: false,
				userCheck: 0,
				// token: uni.getStorageSync("token"),
				token: '',
				noticelist: [],
				sign: {
					num: '0',
					status: 1
				},
				user: null
			}
		},
		onShow() {
			// this.setTabBar()
			this.getHomedata()
		},
		created() {
			this.seriesList[0].name = '版权品精选'
			this.seriesList[1].name = '盲盒精选'
			// this.seriesList[3].name = '人气艺术家'
			// this.seriesList[2].name = '发售日历'
		},
		onLoad(data) {
			// // #ifdef APP-PLUS
			// update()
			// // #endif
			if (data.token) {
				uni.setStorageSync('token', data.token)
			}
		},
		onPullDownRefresh() {
			this.getHomedata()
		},
		methods: {
			// 去签到 或 积分商城
			goUrl(url) {
				console.log(this.user , this.user.user_account)
				if (!(this.user && this.user.user_account)) {
					uni.navigateTo({
						url: '/pages/my/bindPhone/bindPhone'
					})
				} else {
					// '/pages/my/signIn/index'
					uni.navigateTo({
						url:url 
					})
				}
			},
			getHomedata() { //首页信息 接口
				this.$u.api.home_index().then(res => {
					this.list = res.data.banners
					this.featuredList = res.data.cast_list.data; //精选系列
					// this.artistData = res.data.author_list; //人气艺术家
					this.blindboxList = res.data.list1; //盲盒系列
					// this.clendar = res.data.clendar; // 发售日历
					this.userCheck = res.data.check
					this.noticelist = res.data.notices
					this.startAnimationUrl = res.data.banner_tan?.pic
					if (this.startAnimationUrl && res.data.banner_tan.status === 0) {
						this.$refs.startPopup.open()
					}
					uni.stopPullDownRefresh()
				}).catch(err => {})

				this.$u.api.center_index().then(res => {
					if (res.code == 200) {
						this.sign = res.data.sign;
						this.user = res.data.user;
					}
					uni.stopPullDownRefresh()
				}).catch(err => {
					uni.stopPullDownRefresh()
				})
			},
			searchChange(val) {
				getApp().keyword = val
				// uni.reLaunch({
				// 	url: '../bazaar/bazaar-second',
				// })
				uni.switchTab({
					url: '../bazaar/bazaar-second'
				})
			},
			// 跳转我的页面
			go_my() {
				uni.switchTab({
					url: '../mine/mine'
				})
			},
			goSgin() {
				console.log(22)
				uni.navigateTo({
					url: '/pages/qiandao'
				})
			},
			// 跳转衍生品市场
			derivatives(type) {
				if (type == 1) {
					uni.navigateTo({
						url: "../bazaar/bazaar-yxg"
					})
				} else if (type == 2) {
					uni.navigateTo({
						url: "../bazaar/bazaar-cq"
					})
				} else if (type == 3) {
					uni.navigateTo({
						url: "/pages/tabbar/bazaar/bazaar-yxg-mh"
					})
				} else {
					uni.navigateTo({
						url: '../bazaar/bazaar'
					})
				}
			},
			// 跳转版权市场
			copyright() {
				uni.switchTab({
					url: '../bazaar/bazaar-second'
				})
			},
			// 跳转我的NFT
			my_nft() {
				uni.navigateTo({
					url: '../../my/casting/casting'
				})
			},
			// 系列选择索引
			change(index) {
				this.current = index;
			},
			calendar() {
				uni.navigateTo({
					url: "../../my/calendar/calendar"
				})
			},
			gocompound() {
				uni.navigateTo({
					url: "/pages/market/compound/compound"
				})
			},
			//切换单双列
			click_double() {
				this.isDouble = !this.isDouble
			},
			signIn(o) {
				if (o) {
					this.$u.api.signUp().then(res => {
						if (res.code == 200) {
							//this.getUserinfo()
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
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		// background-color: #FBF7F2;
		// background-image: url('../../../static/images/HomeBgimg.png');
		background-size: 750rpx 1624rpx;
		background-position: 0 0;
		background-repeat: no-repeat;

		/deep/ .u-navbar-fixed {
			// background-color: #FBF7F2 !important;
			background-color: transparent !important;
		}
	}

	.home-notice {
		height: 80rpx;
		width: 100%;
		border-radius: 10rpx;
		padding: 5rpx 20rpx;
		margin-bottom: 24rpx;

		.home-noticeswi {
			flex: 1;
			height: 70rpx;

			.home-noticeswiitem {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
			}
		}
	}

	.home_cardall {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		flex-wrap: wrap;
		justify-content: space-between;

		.home-card {
			width: 335rpx;
			height: 140rpx;
			border-radius: 10rpx;
			// padding: 0 20rpx;
			margin-bottom: 20rpx;
			// margin-right: 20rpx;

		}

		.home-card:nth-child(2n) {
			margin-right: 0;
		}
	}

	.home-sdchange {
		width: 690rpx;
		margin: 24rpx 30rpx 0 30rpx;
		height: 74rpx;
		border-radius: 10rpx;
		padding: 0 24rpx;
		color: #999999;
	}

	.kong-top-box {
		padding: 35rpx 30rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		border-bottom: solid 1rpx;

		.kong-top-item {
			width: 100%;
			border-right: 1rpx solid;
			margin-right: 25rpx;

			&:last-child {
				border: none;
				margin-right: 0;
			}
		}
	}

	.kong-bottom-box {
		border-radius: 10rpx;
		position: relative;

		.cardimg {
			height: 180rpx;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}
	}

	.home-shop {
		width: 690rpx;
		margin: 0 30rpx 30rpx 30rpx;

		.home-shopimg {
			width: 330rpx;
			height: 172rpx;
			border-radius: 20rpx 20rpx 0 0;
		}

		.home-shopbot {
			width: 330rpx;
			height: 70rpx;
			padding: 0 20rpx;
			border-radius: 0 0 20rpx 20rpx;
			font-size: 26rpx;
			font-weight: bold;
			background-color: #FFFFFF;
		}
	}

	.utabs {
		border-radius: 10rpx;
		margin: 0 30rpx;
	}

	.text-area {
		height: 136rpx;
		margin-bottom: 70rpx;
		// line-height: 136rpx;
		// border: 1px solid red;
		line-height: 6;
		text-align: center;
		position: -webkit-sticky;
		position: sticky;
		top: 0px;
		z-index: 99;
		background-color: #FAF6F4;
	}

	.u_search {
		width: 100% !important;
		padding: 0 32rpx;
	}

	.title {
		font-size: 34rpx;
		color: #333333;
		margin-top: 102rpx;
		font-weight: bold;
	}

	.head_flex {
		display: flex;
		align-items: center;
		width: 100%;
		margin-top: 20rpx;

		.userAvatar {
			width: 70rpx;
			height: 70rpx;
			margin-right: 30rpx;
		}
	}

	.menu {
		background-color: #fff;
		margin: 0 30rpx 20rpx;
		display: flex;
		justify-content: space-between;
		padding: 34rpx 52rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		color: #333333;

		.menu_item {
			width: 120rpx;
			text-align: center;

			image {
				margin-bottom: 22rpx;
				width: 70rpx;

			}
		}
	}

	.bot_btn {
		margin: 88rpx 150rpx 0 150rpx;
		background-color: #764E39;
		border-radius: 50rpx;
		color: #fff;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	// 开屏弹窗
	.start-opup-box {
		flex-direction: column;
		align-items: center;

		.start-img {
			width: 600rpx;
			height: 900rpx;
			border-radius: 10rpx;
		}
	}

	.rili-tag {
		height: 56rpx;
		line-height: 56rpx;
		padding: 0 25rpx;
		background: linear-gradient(90deg, #04D5A3 0%, #00E2E2 100%);
		border-radius: 20rpx 8rpx 20rpx 8rpx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.rili-img {
		width: 634rpx;
		height: 634rpx;
		border-radius: 20rpx;
	}

	.rili-authorimg {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
	}

	.rili-price {
		font-size: 40rpx;
		font-weight: bold;
	}
</style>