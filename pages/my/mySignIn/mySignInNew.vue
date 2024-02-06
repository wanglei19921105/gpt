<template>
	<view class="page" :class="getThemeClass">
		<unavbar :isback="false" :bg="'transparent'" class="my-nav-ber-a-box">
			<view class="Width100"></view>
			<u-icon class="MarginL_30rpx" name="arrow-left" color="#FFFFFF" size="40" @click="goBark"></u-icon>
		</unavbar>
		<view class="TopBoxNew Width100" :style="bgUrl1">
			<view class="WidthGlobal1 MarginAuto Height100 PositionR">
				<view class="SignText PositionA">
					<text class="Block FloatL FontS_28rpx FontBold_400 MarginT_12rpx">您已连续签到</text>
					<text
						class="Block FloatL FontS_48rpx Text1 FontBold_500 Color_9EF797 MarginL_6rpx">{{ info.user_signs_total }}</text>
					<text class="Block FloatL FontS_28rpx FontBold_400 MarginT_12rpx MarginL_6rpx">天</text>
					<view class="ClearB"></view>
				</view>
			</view>
		</view>
		<view class="BottomBox Width100" :class="getThemeClass">
			<view class="UserInfo WidthGlobal1 MarginAuto" :style="bgUrl2">
				<view class="WidthGlobal1 MarginAuto PaddingT_1rpx">
					<view class="LaBa Width100 MarginT_16rpx">
						<image :src="`/static/images/signIn/laba1.png`" class="FloatL" mode="widthFix"></image>
						<text class="Block Color_FFFFFF FloatL MarginL_6rpx FontS_20rpx MarginT_6rpx"> | </text>
						<swiper class="Swiper FloatL MarginL_6rpx" vertical circular :indicator-dots="false"
							:autoplay="true" :interval="3000" :duration="1000">
							<swiper-item v-for="(item,index) in infoLB">
								<view class="Width_100 Height_100">
									<text
										class="Block FontS_24rpx Color_FFFFFF TextHidden">{{`${item.created_at} ${(item.user || {}).nickname}用户签到成功获得${item.points}积分${item.red_packet}元现金红包`}}</text>
								</view>
							</swiper-item>
						</swiper>
						<view class="ClearB"></view>
					</view>
					<view class="Width100 MarginT_16rpx">
						<view class="UserImg BorderR_50 FloatL OverH">
							<view class="ImgBox BorderR_50 OverH">
								<image
									:src="userData.avatar ? userData.avatar : `/static/images/my/${getThemeName}/my_bg.png`"
									class="Width100 Height100" mode="aspectFill"></image>
							</view>
						</view>
						<text
							class="Name FloatL Color_FFFFFF FontS_28rpx FontBold_400 MarginL_16rpx MarginT_6rpx">{{ userData.nickname }}</text>
						<view class="FloatR">
							<text class="Block FontS_40rpx Color_FFC393 FontBold TextR">{{ info.sign_total }}</text>
							<text class="Block FontS_24rpx Color_FFC393 TextR">今日签到人数</text>
						</view>
						<view class="ClearB"></view>
					</view>
					<view class="TotalData Width100 MarginT_22rpx">
						<view class="FloatL">
							<text
								class="Block Color_FFC393 FontS_32rpx FontBold Text1">{{userData.sign_in_points}}</text>
							<text class="Block Color_FFC393 FontS_24rpx">赚积分</text>
						</view>
						<view class="FloatL MarginL_80rpx">
							<text
								class="Block Color_FFC393 FontS_32rpx FontBold Text1">{{userData.sign_in_red_packet}}</text>
							<text class="Block Color_FFC393 FontS_24rpx">赚红包</text>
						</view>
						<view class="BtnBox FloatR" @click="signStatus == 1 ? '':signIn()" :style="bgUrl3">
							<text class="Block Color_0A1136 FontS_28rpx">{{signStatus == 1 ? '已签到':'立即签到'}}</text>
						</view>
						<view class="ClearB"></view>
					</view>
				</view>
				<view class="Width100 PaddingT_40rpx MarginT_18rpx" style="padding-bottom: 260rpx" :style="bgUrl4">
					<!-- 排行榜 -->
					<view class="rankheat">
						<view class="rankheat_header flex justify-between align-center">
							<view class="rankheat_header_item Width_15">排行</view>
							<view class="rankheat_header_item rankheat_header_item1">昵称</view>
							<view class="rankheat_header_item Width_15">连续签到</view>
							<view class="rankheat_header_item Width_15">总赚积分</view>
							<view class="rankheat_header_item Width_15 TextR">总赚红包</view>
						</view>
						<!--			<view class="rankheat-myRank flex justify-between align-center">-->
						<!--				<view>{{users.ranking == null?'暂未上榜':users.ranking}}</view>-->
						<!--				<view class="myRank_item flex justify-between align-center">-->
						<!--					<image :src="users.avatar" mode="aspectFill" class="myRank_item_avatar"></image>-->
						<!--					<view>{{users.user_account}}（我）</view>-->
						<!--				</view>-->
						<!--				<view>{{users.total_expenses}} USDT</view>-->
						<!--			</view>-->
					</view>
					<scroll-view class="rankheat_item" scroll-y>
						<view class="ranknum flex justify-between align-center"
							v-for="(item,index) in info.ranking_list" :key="index">
							<view class="ranking-content-item-avatar Width_15">
								<template v-if="index < 3" class=" ">
									<image :src="`/static/images/signIn/rank${index + 1}.jpg`"
										class="ranking-content-item-avatar-mark" mode=""></image>
								</template>
								<template v-else>
									<text class="rankindex">{{ index + 1 }}</text>
								</template>
							</view>
							<view class="rank-item Width_40 flex justify-between align-center">
								<view class="flex align-center">
									<image :src="item.avatar" mode="aspectFill" class="rank-avatar"></image>
									<view class="size-24">{{item.nickname}}</view>
								</view>
							</view>
							<view class="rank-num Width_15 FontBold">{{item.total_signs}}天</view>
							<view class="rank-num Width_15 FontBold Color_FFC393">{{item.sign_in_points}}分</view>
							<view class="rank-num Width_15 TextR FontBold Color_FFC393">{{item.sign_in_red_packet}}元
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<u-modal class="my-modal" v-model="showSignIn" :content="`签到将获得 ${sign.sign_num} 积分和${sign.red_packet}元红包`"
			title="签到" :confirm-color="getMainColor" @confirm="signIn(1)" confirmText="签到" show-cancel-button
			asyncClose></u-modal>
		<u-modal class="my-modal" v-model="showSignInText" :content="alertText" title="提示" :confirm-color="getMainColor"
			@confirm="showSignInText = false" confirmText="确定" show-cancel-button asyncClose></u-modal>
		<view class="BottomContentBox Width100">
			<view class="WidthGlobal4 MarginAuto" v-if="rankData != null">
				<scroll-view class="rankheat_item" scroll-y>
					<view class="ranknum flex justify-between align-center">
						<view class="ranking-content-item-avatar Width_15">
							<template v-if="rankData.rank < 3" class=" ">
								<image :src="`/static/images/signIn/rank${rankData.rank}.jpg`"
									class="ranking-content-item-avatar-mark" mode=""></image>
							</template>
							<template v-else>
								<text class="rankindex">{{ rankData.rank }}</text>
							</template>
						</view>
						<view class="rank-item Width_40 flex justify-between align-center">
							<view class="flex align-center">
								<image :src="rankData.avatar" mode="aspectFill" class="rank-avatar"></image>
								<view class="size-24">{{rankData.nickname}}</view>
							</view>
						</view>
						<view class="rank-num Width_15">{{rankData.total_signs}}天</view>
						<view class="rank-num Width_15">{{rankData.sign_in_points}}分</view>
						<view class="rank-num Width_15 TextR">{{rankData.sign_in_red_packet}}元</view>
					</view>
				</scroll-view>
			</view>
			<view class="Width100 TextC MarginT_40rpx" v-else>
				<text class="Block FontS_30rpx Color_FFFFFF">暂无上榜！</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sign: {
					sign_num: 0,
					red_packet: 0
				},
				signStatus: 0,
				list: [],
				rankData: null,
				itemData: [],
				listStatus: 'loading',
				showSignIn: false,
				showSignInText: false,
				alertText: '',
				page: 1,
				teammore: true,
				users: [],
				infoLB: [],
				info: {},
				infoSelf: {},
				userData: {},
				$: this.$,
				bgUrl1: '',
				bgUrl2: '',
				bgUrl3: '',
				bgUrl4: '',
			};
		},
		onLoad() {
			this.getInfo()
			this.getInfoLB()
			this.getHomedata()
			this.getUserinfo()
		},
		onShow() {
			this.bgUrl1 = "background-image:url('" + this.$.imgUrl +
				"/bg1.jpg');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
			this.bgUrl2 = "background-image:url('" + this.$.imgUrl +
				"/bg2.jpg');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
			this.bgUrl3 = "background-image:url('" + this.$.imgUrl +
				"/btn1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
			this.bgUrl4 = "background-image:url('" + this.$.imgUrl +
				"/xuxian1.jpg');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
		},
		methods: {
			goBark() {
				uni.navigateBack();
			},
			getUserinfo() {
				this.$u.api.center_index().then(res => {
					if (res.code == 200) {
						this.userData = res.data.user
					}
					uni.stopPullDownRefresh()
				}).catch(err => {
					uni.stopPullDownRefresh()
				})
			},
			getHomedata() {
				this.$u.api.center_index().then(res => {
					if (res.code == 200) {
						// this.sign = res.data.sign;
						this.user = res.data.user;
						this.signStatus = res.data.sign.status;
					}
					uni.stopPullDownRefresh()
				}).catch(err => {
					uni.stopPullDownRefresh()
				})
			},
			async signIn(o) {

				let data = await this.getNum()
				console.log(data)
				if (data.code == 400) {
					this.showSignInText = true
					this.alertText = data.message
					return
				} else {
					this.sign = data.data
				}
				if (!(this.user && this.user.phone)) {
					return uni.navigateTo({
						url: '/pages/my/bindPhone/bindPhone'
					})
				}
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
			getInfoLB() {
				this.$u.api.my_sign_in({}).then(res => {
					if (res.code == 200) {
						if (typeof(res.data.faker_signs) != 'undefined') {
							this.infoLB = res.data.faker_signs
							console.log('this.infoLB', this.infoLB)
						}
					}
				}).catch(err => {

				})
			},
			getInfo() {
				this.$u.api.my_sign_in_info({}).then(res => {
					if (res.code == 200) {
						this.info = res.data
						if (this.info.ranking_list.length > 0) {
							let user = JSON.parse(this.$.getData('usr'))
							for (let a = 0; a < this.info.ranking_list.length; a++) {
								if (user.id == this.info.ranking_list[a].id) {
									this.rankData = this.info.ranking_list[a]
									this.rankData.rank = ''
									this.rankData.rank = a + 1
								}
							}
						}
					}
				}).catch(err => {

				})
			},
			getNum() {
				return new Promise(resolve => {
					this.$u.api.my_sign_in_info_num({}).then(res => {
						resolve(res)
					}).catch(err => {

					})
				})
			},
			loadData() {
				this.$u.api.my_team().then(res => {
					this.list = res.data.data
					console.log(this.list)
				}).catch(err => {})
			},
			Leaderboard() {
				this.$u.api.mechi_rank({
					// type:this.page
				}).then(res => {
					if (res.code == 200) {
						this.itemData = res.data.rankings
						this.users = res.data.users
						// this.listStatus = 'nomore'
					}
				})
			},
			activityRule() {
				uni.navigateTo({
					url: '/pages/my/myTeam/rankRule'
				});
			},
			rankUpdate() {
				if (this.teammore) {
					this.listStatus = 'loading'
					this.page += 1
				} else {
					return
				}
				this.$u.api.rank({
					type: this.page
				}).then(res => {
					if (res.code == 200) {
						if (res.data.ranking_list != 0) {
							this.itemData = [...this.itemData, ...res.data.ranking_list]
						} else {
							this.teammore = false
							this.listStatus = 'nomore'
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.BottomContentBox {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		height: 202rpx;
		background-color: #0C0D0F;
		border-top: 2rpx solid #FFFFFF;
	}

	.Text1 {
		text-shadow: 0 0 10px #9EF797;
	}

	.SignText {
		bottom: 230rpx;
	}

	.TopBoxNew {
		height: 684rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
	}

	.BottomBox {
		position: absolute;
		left: 0;
		top: 550rpx;
		z-index: 999;

		.UserInfo {
			.UserImg {
				width: 40px;
				height: 40px;
				background: linear-gradient(135deg, #3456FE, #5FC5FF);

				.ImgBox {
					width: 38px;
					height: 38px;
					margin: 1px;
				}
			}

			height: 254rpx;

			.TotalData {
				.BtnBox {
					width: 152rpx;
					height: 60rpx;

					text {
						text-align: center;
						line-height: 60rpx;
					}
				}

				.Text1 {
					text-shadow: 0 0 10px #FFC393;
				}
			}

			.LaBa {
				image {
					width: 40rpx;
					height: 40rpx;
				}

				.Swiper {
					margin-top: 2rpx;
					margin-left: 10rpx;
					width: calc(100% - 100rpx);
					height: 40rpx;
				}
			}
		}
	}

	.Width_100 {
		width: 100%;
	}

	.Height_100 {
		height: 100%;
	}

	.MarginT_16rpx {
		margin-top: 16rpx;
	}

	.FontS_60rpx {
		font-size: 60rpx;
	}

	.TextC {
		text-align: center;
	}

	.LetterS_6rpx {
		letter-spacing: 6rpx
	}

	.TextR {
		text-align: right;
	}

	.MsgBox {
		padding: 30rpx 44rpx;

		.Sub {
			border-radius: 30rpx;

			.Swiper {
				height: 40rpx;
			}

			image {
				width: 50rpx;
			}

			.Text {
				width: calc(100% - 80rpx);
				margin-left: 20rpx;
			}
		}
	}

	.FontS_30rpx {
		font-size: 30rpx;
	}

	.FontS_22rpx {
		font-size: 22rpx;
	}

	.Color_FF0000 {
		color: #FF0000;
	}

	.Color_FFFFFF {
		color: #FFFFFF;
	}

	.Color_D4CFA7 {
		color: #d4cfa7;
	}

	.Block {
		display: block;
	}

	.BlockI {
		display: inline-block;
	}

	.None {
		display: none;
	}

	.TopBox {
		padding: 30rpx 44rpx;

		.Title {
			margin-left: 20rpx;
			margin-top: 40rpx;

			.Name {
				font-size: 26rpx;
			}

			text {
				line-height: 50rpx;
			}
		}

		.Left {
			.ImgBox {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.Right {
			margin-top: 10rpx;

			.TagBox {
				padding: 0rpx 16rpx;
				border: 2rpx solid rgba(255, 255, 255, 0.2);
				height: 50rpx;
				border-radius: 50rpx;
				margin-top: 8rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-top: 10rpx;
					margin-right: 6rpx;
				}

				text {
					line-height: 50rpx;
				}
			}
		}
	}

	.Btn {
		margin-right: 30rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		width: 120rpx;
		height: 60rpx;
		border-radius: 10rpx;
		background-color: #1E1E1E;
	}

	.FloatL {
		float: left;
	}

	.FloatR {
		float: right;
	}

	.ClearB {
		clear: both;
	}

	/*英文换行*/
	.Warp_E {
		word-break: break-all;
	}

	/*文字超出省略号-单行*/
	.TextHidden {
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		white-space: nowrap;
		/*规定段落中的文本不进行换行 */
	}

	.teamTitle {
		padding: 30rpx 44rpx;
		margin: 28rpx;
		border-radius: 20rpx;
	}

	.rank-rule {
		padding: 30rpx;
	}

	.tishi {
		font-size: 22rpx;
		padding: 30rpx;
		color: #FFFFFF;
	}

	.rankheat-title {
		display: block;
		width: 100%;
		height: 37.5rpx;
		margin: 50rpx auto;
	}

	.rankheat_header {
		width: 694rpx;
		height: 88rpx;
		padding: 0 30rpx;
		//background: #1E1E1E;
		margin: 0 auto;
		border-radius: 20rpx 20rpx 0 0;

		.rankheat_header_item {
			color: #B2B2B2;
			font-size: 22rpx;
		}

		.rankheat_header_item1 {
			width: 30%;
		}
	}

	.rankheat-myRank {
		width: 694rpx;
		height: 88rpx;
		color: #8BF9AB;
		font-size: 24rpx;
		padding: 0 30rpx;
		background: #232925;
		margin: 0 auto;

		.myRank_item {
			height: 88rpx;

			.myRank_item_avatar {
				width: 40rpx;
				height: 40rpx;
				border-radius: 20rpx;
				margin-right: 20rpx;
			}
		}
	}

	.rankheat_item .ranknum:nth-child(even) {
		//background-color:#232323;
	}

	.Height_96rpx {
		height: 96rpx;
	}

	.LH_96rpx {
		line-height: 96rpx;
	}

	.rankheat_item {
		width: 694rpx;
		//height: 801rpx;
		border-radius: 0 0 20rpx 20rpx;
		//background: #1E1E1E;
		margin: 0 auto;

		.ranknum {
			width: 100%;
			height: 88rpx;
			padding-right: 35rpx;

			.ranking-content-item-avatar {
				width: 100rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;

				.ranking-content-item-avatar-mark {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.rankindex {
				font-size: 24rpx;
				color: #E1E1E1;
			}

			.rank-item {
				height: 88rpx;

				.rank-avatar {
					width: 40rpx;
					height: 40rpx;
					border-radius: 20rpx;
					margin-right: 2rpx;
				}
			}

			.rank-num {
				font-size: 22rpx;
			}
		}
	}

	.Width_15 {
		width: 15%;
	}

	.Width_40 {
		width: 40%;
	}
</style>