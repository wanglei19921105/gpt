<template>
	<view class="page" :class="getThemeClass">
		<unavbar :isback="false" :bg="'transparent'" class="my-nav-ber-a-box">
			<view class="Width100 TextC">
        <text class="FontS32rpx Block Color_FFFFFF FontBold">每日签到</text>
      </view>
			<u-icon class="MarginL_30rpx" name="arrow-left" color="#FFFFFF" size="40" @click="goBark"></u-icon>
		</unavbar>
		<view class="header">
			<view>
				<u-avatar :src="userData.avatar ? userData.avatar : `/static/images/my/${getThemeName}/my_bg.png`" size="110" class="icon"></u-avatar>
			</view>
			<view class="right_box">
				<view>
					<text class="Block Color_FFFFFF FontS_28rpx text">您已连续签到 <text class="sign_num">{{ signInfo.user_signs_total }}</text> 天</text>
					<view class="Block Color_FFFFFF text" @click="checkQDLog">
						<text class="FontS_24rpx">签到记录</text>
						<u-icon size="24" :name="require('./ic_sign.png')"></u-icon>
					</view>
				</view>
				<view class="BtnBox TextC" @click="signStatus == 1 ? '':signIn()">
					<text class="Block">{{signStatus == 1 ? '已签到':'立即签到'}}</text>
				</view>
			</view>
		</view>
		<view class="total_box">
			<view class="left">
				<view class="text_box">
					<view class="title">累计签到红包</view>
					<view class="value">{{userData.sign_in_red_packet}}<text class="unit">元</text></view>
				</view>
				<u-icon class="icon" size="44" :name="require('./ic_reward.png')"></u-icon>
			</view>
			<view class="left right">
				<view class="text_box">
					<view class="title">累计签到积分</view>
					<view class="value">{{userData.sign_in_red_packet}}<text class="unit">分</text></view>
				</view>
				<u-icon class="icon" size="44" :name="require('./ic_species.png')"></u-icon>
			</view>
		</view>
		<view class="sign_member_box">
			<view>
				<text class="member_num">{{ signInfo.sign_total }}</text>
			</view>
			<view class="FontS_24rpx">
				<text class="member_text">今日签到会员</text>
			</view>
		</view>
		{{ infoLB.length }}
		<Barrage v-if="infoLB.length > 0" :list="infoLB"/>
		<view class="UnitBox BG_171717 WidthGlobal1 MarginAuto BorderR_20rpx MarginT_30rpx PaddingT_1rpx">
			<view class="ListBox Width100 MarginT_34rpx PaddingB_40rpx">
				<view class="Width100 TitleBox">
					<view class="WidthGlobal1 MarginAuto Flex Flex_C_S-B">
						<view class="ListUnit Width_15 TextLeft">
							<text class="Block FontS_28rpx Color_FFFFFF">排名</text>
						</view>
						<view class="ListUnit Width_40 TextLeft">
							<text class="Block FontS_28rpx Color_FFFFFF MarginL_8rpx">昵称</text>
						</view>
<!--              <view class="ListUnit Width_20 TextCenter">-->
<!--                <text class="Block FontS_28rpx Color_B2B2B2">连签</text>-->
<!--              </view>-->
						<view class="ListUnit Width_20 TextCenter">
							<text class="Block FontS_28rpx Color_FFFFFF">总赚积分</text>
						</view>
						<view class="ListUnit Width_20 TextRight">
							<text class="Block FontS_28rpx Color_FFFFFF">总赚红包</text>
						</view>
					</view>
				</view>
				<view class="Width100 MarginT_20rpx">
					<view class="Width100 TitleBox PaddingT_20rpx PaddingB_20rpx" v-for="(item,index) in info" :key="index" :class="(index+1) % 2 == 1 ? 'ListBg1':''">
						<view class="WidthGlobal1 MarginAuto Flex Flex_C_S-B">
							<view class="ListUnit Width_15">
								<image v-if="index === 0" :src="$.imgSrc + '/images/rank1.png'" mode="aspectFit" class="RankIcon"></image>
								<image v-else-if="index === 1" :src="$.imgSrc + '/images/rank2.png'" mode="aspectFit" class="RankIcon"></image>
								<image v-else-if="index === 2" :src="$.imgSrc + '/images/rank3.png'" mode="aspectFit" class="RankIcon"></image>
								<text v-else class="Block FontS_28rpx Color_FFFFFF FontBold MarginL_24rpx">{{ index + 1 }}</text>
							</view>
							<view class="ListUnit Width_40">
								<image :src="item.avatar" mode="aspectFit" class="FloatL Avatar BorderR_50 MarginL_8rpx"></image>
								<text class="Block AvatarName FloatL FontS_24rpx Color_FFFFFF MarginL_16rpx TextHidden MarginT_20rpx">
									{{ item.nickname }}</text>
								<view class="ClearB"></view>
							</view>
<!--                <view class="ListUnit Width_20 TextCenter">-->
<!--                  <text class="Block FontS_28rpx Color_FFC393 FontBold">{{ item.total_signs }}天</text>-->
<!--                </view>-->
							<view class="ListUnit Width_20 TextCenter">
								<text class="Block FontS_28rpx Color_FFC393 FontBold">{{ item.sign_in_points }}</text> 
							</view>
							<view class="ListUnit Width_20 TextRight">
								<text class="Block FontS_28rpx Color_FFC393 FontBold">{{ item.sign_in_red_packet }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal class="my-modal" v-model="showSignIn" :content="`签到将获得 ${sign.red_packet}元红包和 ${sign.sign_num} 积分`"
			title="签到" :confirm-color="getMainColor" @confirm="signIn(1)" confirmText="签到" show-cancel-button
			asyncClose></u-modal>
		<u-modal class="my-modal" v-model="showSignInText" :content="alertText" title="提示" :confirm-color="getMainColor"
			@confirm="showSignInText = false" confirmText="确定" show-cancel-button asyncClose></u-modal>
	</view>
</template>

<script>
	import Barrage from '@/components/barrage/barrage';
  export default {
    components: {Barrage},
    data() {
			return {
				signPage: 1,
				rankPage: 1,
				sign: {
					sign_num: 0,
					red_packet: 0
				},
				signInfo: {
					is_signed: false,
					sign_total: 0,
					user_signs_total: 0
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
				timer: null,
				users: [],
				infoLB: [],
				transitionStyle: '',
				info: {},
				infoSelf: {},
				userData: {},
        listQuery: {
          page:1
        },
        isMore:true,
				$: this.$,
				bgUrl1: '',
				bgUrl2: '',
				bgUrl3: '',
				bgUrl4: '',
        bgUrl5: '',
        signInLog:[],
			};
		},
		onLoad() {
			clearTimeout(this.timer)
			this.getHomedata()
			this.getInfoLB()
			this.getInfo()
      this.signInLog = []
      this.listQuery.page = 1
		},
    onUnload(){
			clearTimeout(this.timer)
    },
		onShow() {
			this.bgUrl1 = "background-image:url('" + this.$.imgUrl +
				"/qiandao_bg1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
			this.bgUrl2 = "background-image:url('" + this.$.imgUrl +
				"/qiandao_log1.png');background-repeat: no-repeat;background-position: center center;background-size:cover;"
			this.bgUrl3 = "background-image:url('" + this.$.imgUrl +
				"/ljqdhb1.png');background-repeat: no-repeat;background-position: center center;background-size:cover;"
			this.bgUrl4 = "background-image:url('" + this.$.imgUrl +
				"/ljqdjf1.png');background-repeat: no-repeat;background-position: center center;background-size:cover;"
      this.bgUrl5 = "background-image:url('" + this.$.imgUrl +
          "/qiandao_bg2.png');background-repeat: no-repeat;background-position: center center;background-size:cover;"
		},
		methods: {
      // 查看签到页面
      checkQDLog(){
        return uni.navigateTo({
          url: '/pages/my/mySignIn/mySignInNewLog'
        })
      },
			goBark() {
				uni.navigateBack();
			},
			getHomedata() {
				this.$u.api.center_index().then(res => {
					if (res.code == 200) {
						this.userData = res.data.user;
						this.signStatus = res.data.sign.status;
					}
					uni.stopPullDownRefresh()
				}).catch(err => {
					uni.stopPullDownRefresh()
				})
			},
			async signIn(o) {
				let data = await this.getNum()
				if (data.code == 400) {
					this.showSignInText = true
					this.alertText = data.message
					return
				} else {
					this.sign = data.data
				}
				if (!(this.userData && this.userData.phone)) {
					return uni.navigateTo({
						url: '/pages/my/bindPhone/bindPhone'
					})
				}
				if (o) {
					this.$u.api.signUp().then(res => {
						if (res.code == 200) {
							uni.showToast({
								icon: 'success',
								title: '签到成功'
							})
							this.showSignIn = false
							this.signStatus = 1
							this.getHomedata()
							this.getInfoLB()
							this.getInfo()
						}
					})
				} else {
					this.showSignIn = true
				}
			},
			getInfoLB() {
				this.$u.api.my_sign_in({
					page: this.signPage
				}).then(res => {
					if (res.code == 200) {
						this.infoLB = []
						const data = res.data || {}
						if (data && data.faker_signs && data.faker_signs.data) {
							this.infoLB = [...data.faker_signs.data, ...data.faker_signs.data]
							if (this.infoLB.length > 3) {
								this.transitionFn()
							}
						}
					}
				}).catch(err => {

				})
			},
			getInfo() {
				this.$u.api.my_sign_in_info({
					page: this.rankPage
				}).then(res => {
					if (res.code == 200) {
						const data = res.data || {}
						this.signInfo = {
							is_signed: data.is_signed,
							sign_total: data.sign_total,
							user_signs_total: data.user_signs_total
						}
						if (data && data.ranking_list && data.ranking_list.data) {
							this.info = data.ranking_list.data
						}
						// if (this.info.ranking_list.length > 0) {
						// 	let user = JSON.parse(this.$.getData('usr'))
							
						// 	for (let a = 0; a < this.info.ranking_list.length; a++) {
						// 		if (user.id == this.info.ranking_list[a].id) {
						// 			this.rankData = this.info.ranking_list[a]
						// 			this.rankData.rank = ''
						// 			this.rankData.rank = a + 1
						// 			break;
						// 		}
						// 	}
						// }
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
			transitionFn() {
				// 主要通过 transition 的过度时间 控制 滚动速度
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.transitionStyle = 'transition: all 100s linear 0s;transform: translateY(-50%);'
					setInterval(() => {
						this.transitionStyle = ''
						setTimeout(() => {
							this.transitionStyle =
								'transition: all 100s linear 0s;transform: translateY(-50%);'
						}, 20)
					}, 100000)
				}, 20)
			},
		},
	}
</script>

<style lang="scss" scoped>
	.page{
		background: url(./ic_bg.png) no-repeat;
		background-size: 750rpx 440rpx;
	}
	.TextC {
		text-align: center;
	}
	.Color_FFFFFF {
		color: #FFFFFF;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx;
		margin: 40rpx 0;
		.icon {
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
		}
		.right_box {
			margin-left: 24rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.text {
				display: flex;
				align-items: center;
				margin-bottom: 17rpx;
			}
			.text:last-child {
				margin-bottom: 0;
			}
			.BtnBox {
				background: linear-gradient(180deg, #69FF7D -1%, #00E0BD 100%);
				padding: 15rpx 36rpx;
				border-radius: 44rpx;
				line-height: 60rpx;
				font-size: 24rpx;
				font-weight: normal;
				line-height: normal;
				text-align: center;
				color: #000000;
			}
			.sign_num {
				font-size: 34rpx;
				font-weight: 600;
				line-height: normal;
				margin: 0 8rpx;
				color: #00E0BD;
			}
		}
	}
	.total_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx;
		margin-bottom: 32rpx;
		.left {
			display: flex;
			justify-content: space-between;
			width: 330rpx;
			padding: 24rpx 20rpx 18rpx 24rpx;
			margin-right: 30rpx;
			border-radius: 16rpx;
			background: rgba(#70614A, 0.3);
			.text_box {
				.title {
					opacity: 0.6;
					font-size: 24rpx;
					font-weight: normal;
					line-height: normal;
					color: #FFFFFF;
					margin-bottom: 11rpx;
				}
				.value {
					font-size: 34rpx;
					font-weight: normal;
					line-height: normal;
					color: #FFFFFF;
					.unit {
						font-size: 24rpx;
					}
				}
			}
			.icon {
				align-items: flex-start;
			}
		}
		.right {
			margin-right: 0;
			padding: 24rpx 20rpx 18rpx 24rpx;
			border-radius: 16rpx;
			background: rgba(#4A7060, 0.3);
		}
	}
	.sign_member_box {
		margin: 0 auto;
		background: url(./ic_sign_member.png) no-repeat;
		background-size: 100% 100%;
		width: 690rpx;
		height: 180rpx;
		text-align: center;
		padding-top: 28rpx;
		padding-bottom: 40rpx;
		border-radius: 16rpx;
		margin-bottom: 10rpx;
		.member_num {
			font-size: 56rpx;
		}
		.member_text {
			font-size: 24rpx;
			opacity: 0.6;
		}
	}
	.UnitBox{
      //border: 2rpx solid #B4B4B6;
      .ListBox{
        .RankIcon{
          width: 64rpx;
          height: 64rpx;
        }
        .Avatar{
          width: 80rpx;
          height: 80rpx;
        }
        .AvatarName{
          width: calc(100% - 106rpx);
        }

      }
    }
</style>
