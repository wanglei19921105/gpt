<template>
	<view class="view-page" v-if="signLogInfo">
		<view class="bg-page" style="border-bottom-left-radius: 77px; border-bottom-right-radius: 77px;">
			<view class="alternative u-p-l-20 u-p-r-20 u-p-t-20 u-p-b-20">
				<view class="parent-left">
					<view class="u-m-r-20">
						<view style="z-index: 10; position: relative;">
							<image style="width: 60px;height: 60px;border-radius: 50%;" :src="signLogInfo.user.avatar"
								mode="aspectFit"></image>
						</view>
					</view>
					<view class="" style="font-weight: bold; color: #fff;">
						<view class="u-font-32">
							<text>您已累计签到</text>
							<text style="color: red; font-size: 17px;">
								{{signLogInfo.sign_days}}
							</text>
							<text>天</text>
						</view>
						<view class="u-gap"
							style="background-color: transparent; height: 7px; margin-top: 0px; margin-bottom: 0px;">
						</view>
						<view class="u-font-24">
							<text>明日签到可获得神秘大礼</text>
						</view>
					</view>
				</view>
				<view class="parent-right">
					<view>
						<zmxy-number-roller :number="signLogInfo.sign_nums" size="48" unit="rpx" />
					</view>
					<view class="u-gap"
						style="background-color: transparent; height: 7px; margin-top: 0px; margin-bottom: 0px;">
					</view>
					<view class="">
						今日签到人数
					</view>
				</view>
			</view>
			<!-- 		<view class="u-gap"
					style="background-color: transparent; height: 77px; margin-top: 0px; margin-bottom: 0px;">

				</view> -->
		</view>
		<view class="information">
			<an-notice-bar :text="signLogInfo.history_sign_news"></an-notice-bar>
		</view>
		<view class="u-p-l-20 u-p-r-20 u-p-t-20 u-p-b-20">
			<view class="grid-box">
				<view class="incentive-box" v-for="(item,index) in continuous" :key="index">
					<image class="incentive-pic" :src="item.qiandao_icon" mode="aspectFit"></image>
					<view class="incentive">
						{{item.leixing ==  0 ? item.goods_info&&item.goods_info.products_title :item.leixing ==  1 ? `${item.leijijiangli}元` : item.leixing ==  2? `${item.leijijiangli}积分`:'' }}
					</view>
					<view class="demand">
						{{`连续${item.leiji}天`}}
					</view>
				</view>
			</view>
		</view>
		<view class="u-p-20">
			<view class="sign-body u-p-20">
				<view class="color-theme-1">
					签到领好礼
				</view>
				<view class="">
					<view class="u-row" style="align-items: center; justify-content: flex-start;">
						<view v-for="(item, index) in monthDay" :key="index" class="u-col" :class="'u-col-3'"
							:style="'flex: 0 0 25%'"
							style="padding: 0px 4px; margin-left: 0%; align-items: center; justify-content: flex-start; text-align: left;">
							<view :class="{'checked-body': punchCard(item)}" class="child-body">
								<view class="">
									<view class="u-text-center">
										第{{item}}天
									</view>
									<view class="parent-center color-theme-1-1">
										<!-- <text v-if="item.isGift">神秘大礼</text> -->
										<text v-if="punchCard(item)">已签到</text>
										<text v-else>未签到</text>
										<!-- 										<image v-if="item.isSign && !item.isGift" style="width: 74rpx; height: 74rpx;"
											src="https://xhbox.xinghaoruiye.cn/wap/static/img/user/icon-71.png" mode="">
										</image> -->

									</view>
								</view>
								<!--
								<view class="" v-if="item.isGift">
									<image style="width: 68rpx; height: 68rpx;"
										src="https://xhbox.xinghaoruiye.cn/wap/static/img/user/icon-72.png" mode="">
									</image>

								</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="u-gap" style="background-color: transparent; height: 77px; margin-top: 0px; margin-bottom: 0px;">

		</view>
		<view class="u-p-30 navigation-bg-none">
			<view class="uni-button-bg-none" style="width: 100%;">
				<u-button shape="circle"
					style="background: linear-gradient(360deg, rgb(245, 201, 154) 0%, rgb(172, 109, 61) 100%) 0% 0% / 100% 100%; color: rgb(0, 0, 0); font-weight: bold; overflow: visible; width: 100%;"
					@click="goSignIn">立即签到</u-button>
			</view>
		</view>
		<my-popup ref="myPopup"></my-popup>
	</view>
</template>

<script>
	import zmxyNumberRoller from '@/components/zmxy-number-roller/zmxy-number-roller';
	import anNoticeBar from '@/components/an-notice-bar/an-notice-bar.vue'
	import myPopup from '@/components/my-popup/my-popup.vue'
	export default {
		components: {
			zmxyNumberRoller,
			anNoticeBar,
			myPopup
		},
		data() {
			return {
        $:this.$,
				list: [],
				continuous: [],
				user: null,
				signLogInfo: null,
				monthDay: 0
			}
		},
		onLoad() {
			this.getSignLog();
			this.getSplist();
			this.user = JSON.parse(uni.getStorageSync('usr'));
			this.getCurrentMonthFirst();
		},
		methods: {
			goSignIn() {
				// this.$refs.myPopup.open();
				// return
				this.$u.api.signUp().then(res => {
					if (res.code == 200) {
						let data = res.data;
						if (data.type == -1) {
							uni.showToast({
								title: '签到成功',
								icon:'none'
							});
						} else {
							this.$refs.myPopup.open(data, this.signLogInfo.sign_days);
						}
						this.getSignLog();
						this.getSplist();
					}
				})
			},
			getSignLog() {
				this.$u.api.signLog().then(res => {
					if (res.code == 200) {
						let data = res.data;
						this.list = data.log_list;
						this.signLogInfo = data;
					}
				})
			},
			getSplist() {
				this.$u.api.splist().then(res => {
					if (res.code == 200) {
						let data = res.data;
						this.continuous = data.data.leiji_config;
					}

				})
			},
			getCurrentMonthFirst() {
				let nowDate = new Date();
				let fullYear = nowDate.getFullYear();
				let month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
				this.monthDay = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
			},
			punchCard(num) {

				let judge = false;
				if (this.list.length == 0) return judge;
				this.list.forEach((item, index) => {
					let date = item.created_at.split(" ");
					let day = date[0].split("-");
					if (day[day.length - 1] == num) {
						judge = true;
					}
				})
				return judge;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-font-32 {
		font-size: 16px;
	}

	uni-page-body {
		font-size: 14px;
	}

	.u-row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.u-col-3 {
		width: calc(100%/12 * 3);
	}

	.u-col-6 {
		width: calc(100%/12 * 6);
	}

	.checked-body {
		background-color: #f5c99a !important;
	}

	.view-page {
		background-size: 100%;
		background: #000000;
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - var(--window-top));
		width: 100%;
		color: #fff;

		.bg-page {
			// background: linear-gradient(65deg, #f5c99a, #ac6d3d);
			width: 100%;

			.alternative {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.parent-left {
					display: flex;
					justify-content: left;
					align-items: center;
					flex-flow: wrap;
				}
			}


		}

		.sign-body {
			background: #1d1d1d;
			border-radius: 10px;
			border: 1px solid #707070;

			.color-theme-1 {
				color: #f5c99a;
			}

			.child-body {
				background-color: #fff;
				border-radius: 80rpx;
				color: #000;
				padding-top: 10px;
				padding-bottom: 10px;
				margin-top: 10px;
				height: 128rpx;

				.parent-center {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24rpx;
					color: #333333;
				}

				.color-theme-1-1 {
					color: #999;
				}
			}

			.alternative-1 {
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
		}

		.navigation-bg-none {
			position: fixed;
			bottom: 0;
			width: 100%;
			padding: 10px;
		}

		.parent-right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
		}

		.grid-text {
			font-size: 14px;
			color: #909399;
			padding: 10rpx 0 20rpx 0rpx;
			/* #ifndef APP-PLUS */
			box-sizing: border-box;
			/* #endif */
		}

		.grid-box {
			display: grid;
			row-gap: 20rpx;
			column-gap: 20rpx;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: 224rpx 224rpx;

			.incentive-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				background-color: rgba(112, 112, 112, 0.1);
				border-radius: 10rpx;
				padding: 10rpx 0;
				overflow: hidden;

				.incentive-pic {
					width: 68rpx;
					height: 68rpx;
				}

				.incentive {
					width: 100%;
					font-size: 32rpx;
					color: #fff;
					font-weight: 600;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text-align: center;
				}

				.demand {
					font-size: 24rpx;
				}
			}
		}

		.u-text-center {
			font-size: 28rpx;
			font-weight: 600;
			color: #333333;
			margin-bottom: 10rpx;
		}

		.information {
			padding: 0 30rpx;
		}
	}
</style>
