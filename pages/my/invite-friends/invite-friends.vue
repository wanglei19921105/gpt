<template>
	<view class="box">
		<!-- <view style="height: 120rpx;"></view>
		<u-icon name="arrow-leftward" color="#333333" size="52rpx" class="uicon" @click="back"></u-icon>
		<view class="title">
			<image src="../../../static/images/inviteText.png" mode="widthFix"></image>
		</view>
		<view class="person">
			<image class="female" src="../../../static/images/nv.png" mode="widthFix"></image>
			<image class="male" src="../../../static/images/nan.png" mode="widthFix"></image>
		</view>
		<view class="red_envelope">
			<image src="../../../static/images/redEnvelope.png" mode="widthFix"></image>
			<view class="img_position">
				<view class="myinput_flex">
					<input type="text" class="myinput" :value="inviteData.url" disabled />
					<image class="copy" @click="copy(inviteData.url)" src="../../../static/images/inviteCopy.png" mode="widthFix"></image>
				</view>
				<view class="redenve_title">
					邀请码
				</view>
				<view class="redenve_code">
					{{inviteData.invite_code}}
				</view>
				<uqrcode class="QR_code" ref="uQRCode" :text="QRcode" :size="100" />
				<view class="invite_btn">
					立即邀请
				</view>
			</view>
		</view>
		<view class="rule">
			邀请规则
		</view>
		<view class="rule_text" v-html="contentText">
			
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inviteData:{},
				contentText:'',
				QRcode:''
			};
		},
		onShow() {
			this.recommend()
		},
		methods: {
			recommend() {
				this.$u.api.recommend().then(res => {
					this.inviteData = res.data
					this.QRcode = res.data.url
					console.log(this.QRcode)
					this.contentText = res.data.share.content
				}).catch(err => {})
			},
			back() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	min-height: 100vh;
	// 	overflow-y: auto;
	// 	background-image: url(../../../static/images/inviteBack.png);
	// 	background-repeat: no-repeat;
	// 	background-size: contain;
	// 	background-color: #E91A00;
	// }

	// .uicon {
	// 	position: fixed;
	// 	top: 80rpx;
	// 	left: 34rpx;
	// 	z-index: 9999999;
	// }

	// .title {
	// 	width: 605rpx;
	// 	margin: -24rpx auto 0;

	// 	image {
	// 		width: 100%;
	// 	}
	// }

	// .person {
	// 	display: flex;
	// 	justify-content: space-between;
	// }

	// .female {
	// 	width: 220rpx;
	// 	margin-top: 20rpx;
	// }

	// .male {
	// 	width: 270rpx;
	// 	margin-top: -60rpx;
	// }

	// .red_envelope {
	// 	width: 98%;
	// 	margin: -300rpx auto 0;
	// 	position: relative;

	// 	image {
	// 		width: 100%;
	// 	}

	// 	.img_position {
	// 		width: 100%;
	// 		height: 100%;
	// 		position: absolute;
	// 		top: 0;
	// 		text-align: center;
	// 		display: flex;
	// 		flex-direction: column;
	// 		align-items: center;

	// 		.myinput_flex {
	// 			display: flex;
	// 			justify-content: center;
	// 			align-items: center;
	// 			height: 45rpx;
	// 			margin: 60rpx 100rpx 0;
	// 			border-radius: 24rpx;
	// 			background-color: #FFEDDA;

	// 			.myinput {
	// 				width: 478rpx;
	// 				// background-color: #FFEDDA;
	// 				border-radius: 24rpx;
	// 				text-align: left;
	// 				text-indent: 32rpx;
	// 				color: #FFA648;
	// 				font-size: 24rpx;
	// 			}

	// 			.copy {
	// 				width: 22rpx;
	// 				margin-right: 18rpx;
	// 			}
	// 		}

	// 		.redenve_title {
	// 			color: #666666;
	// 			font-size: 26rpx;
	// 			margin-top: 40rpx;
	// 		}

	// 		.redenve_code {
	// 			color: #F2111E;
	// 			font-size: 38rpx;
	// 			margin-top: 30rpx;
	// 			font-weight: bold;
	// 		}

	// 		.QR_code {
	// 			width: 216rpx;
	// 			height: 216rpx;
	// 			margin-top: 30rpx;
	// 		}

	// 		.invite_btn {
	// 			height: 102rpx;
	// 			background: linear-gradient(0deg, #FEE15E, #FF780E);
	// 			line-height: 102rpx;
	// 			border-radius: 50rpx;
	// 			box-shadow: -1rpx 7rpx 27rpx 0px rgba(190, 0, 14, 0.82);
	// 			margin: 120rpx 100rpx 0;
	// 			width: 70%;
	// 			color: #fff;
	// 			font-size: 36rpx;
	// 		}
	// 	}
	// }

	// .rule {
	// 	background-image: url(../../../static/images/inviteDecorate.png);
	// 	background-repeat: no-repeat;
	// 	height: 74rpx;
	// 	line-height: 74rpx;
	// 	background-size: contain;
	// 	margin: 0 200rpx;
	// 	text-align: center;
	// 	font-size: 42rpx;
	// 	color: #FFF8DD;
	// 	font-weight: bold;
	// 	font-style: italic;
	// }

	// .rule_text {
	// 	margin: 60rpx 62rpx;
	// 	color: #FFD1BE;
	// 	font-size: 26rpx;
	// 	line-height: 38rpx;
	// }
</style>
