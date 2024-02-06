<template>
	<!-- 商品 - 版权品 - 暂已弃用 -->
	<view class="box" :class="curScreenStyle? 'page-black' : 'page-white'">
		<unavbar>
			<template #like>
				<view class="title_right">
					<image v-if="curScreenStyle"
						:src="collect?'../../../static/images/darkLike1.png':'../../../static/images/darkLike0.png'"
						mode="widthFix" @click="likeCli()"></image>
					<image v-if="!curScreenStyle"
						:src="collect?'../../../static/images/heart2.png':'../../../static/images/heart1.png'"
						mode="widthFix" @click="likeCli()"></image>
					<view class="like_num">{{likeNum}}</view>
					<!-- <image v-if="curScreenStyle" @click="shareCli" src="../../../static/images/darkShare.png"
						mode="widthFix"></image>
					<image v-if="!curScreenStyle" @click="shareCli" src="../../../static/images/share.png"
						mode="widthFix"></image> -->
				</view>
			</template>
		</unavbar>
		<!-- 顶部照片/铸品名称/铸品简介 -->
		<view class="head">
			<!-- <image src="../../../static/images/commodity.png" mode="widthFix"></image> -->
			<view class="head_main">
				<view class="main_flex">
					<view class="main_name">NFT盲盒名称</view>
					<!-- <view class="instock">库存：10/100</view> -->
				</view>
				<view class="content">
					盲盒介绍盲盒介绍盲盒介绍盲盒介绍盲盒介绍盲盒介绍
					盲盒介绍盲盒介绍盲盒介绍盲盒介绍盲盒介绍
				</view>
			</view>
		</view>

		<!-- 作者信息 -->
		<view class="author">
			<view class="author_top">
				<!-- 头像/名字/粉丝 -->
				<view class="author_top_left" @click="authorInfo">
					<!-- 头像 -->
					<!-- <image class="avatar" src="../../../static/images/commodity.png" mode="widthFix"></image> -->
					<view class="active_info">
						<!-- 名字 -->
						<view class="active_name">
							国一二三
							<image class="arrow" src="../../../static/images/rightArrow.png" mode="widthFix"></image>
						</view>
						<!-- 粉丝 -->
						<view class="fans">
							1.4w 粉丝
						</view>
					</view>
				</view>
				<!-- 关注 -->
				<view v-if="curScreenStyle" @click="focuson(user.id)" :class="user.follow?'unsubscribe':'focuson'">
					{{user.follow?'取消关注':'关注'}}
				</view>
				<view v-if="!curScreenStyle" @click="focuson(user.id)" :class="user.follow?'unsubscribe':'focuson'">
					{{user.follow?'取消关注':'关注'}}
				</view>
			</view>
			<!-- 个人介绍 -->
			<view class="active_content">
				作者个人介绍作者个人介绍作者个人介绍作者个人介绍
				作者个人介绍作者个人介绍作者个人介绍
			</view>
		</view>


		<!-- 认证信息 -->
		<view class="certification">
			<mytitle text="认证信息" class="my_title"></mytitle>
			<view class="info_item">
				<view class="item_name">权益属性</view>
				<view class="item_value">版权品</view>
			</view>
			<view class="info_item">
				<view class="item_name">智能合约地址</view>
				<view class="item_value">
					<view class="item_valuetext">
						0x867994b6d0x867994b6d
					</view>
					<image class="copy_img" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="info_item">
				<view class="item_name">NFT铸造品ID号</view>
				<view class="item_value">
					<view class="item_valuetext">
						0x867994b6d0x867994b6d
					</view>
					<image class="copy_img" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="info_item">
				<view class="item_name">NFT认证协议</view>
				<view class="item_value">版权品</view>
			</view>
			<view class="info_item">
				<view class="item_name">区块链网络</view>
				<view class="item_value">版权品</view>
			</view>
		</view>
		<!-- 权益说明 -->
		<explain text="权益说明"></explain>
		<!-- 购买须知 -->
		<explain text="购买须知"></explain>

		<!-- 立即购买 -->
		<view class="buy">
			<view class="price">
				<view class="price_text">
					价格
				</view>
				<view class="price_number">
					4950
					<text class="symbol">USDT</text>
				</view>
			</view>
			<view class="buy_btn" @click="buy">
				立即购买
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" height="524rpx">
			<view class="popup_title">分享到</view>
			<view class="popup_flex">
				<view class="popup_item">
					<image src="../../../static/images/weibo.png" mode="widthFix"></image>
					<view class="popup_text">微博</view>
				</view>
				<view class="popup_item">
					<image src="../../../static/images/weChat.png" mode="widthFix"></image>
					<view class="popup_text">微博</view>
				</view>
				<view class="popup_item">
					<image src="../../../static/images/lockup.png" mode="widthFix"></image>
					<view class="popup_text">微博</view>
				</view>
			</view>
			<button class="cancel" type="default" @click="cancelCli">取消</button>
		</u-popup>
		<!-- 安全密码-弹出框 -->
		<pwdPay :stauts="payStatus" @closeMain="closeMain"></pwdPay>
	</view>
</template>

<script>
	import explain from '../../../components/explain.vue'
	export default {
		components: {
			explain
		},
		data() {
			return {
				// 用户信息
				user: {
					id: 1,
					// 关注状态
					follow: false
				},
				show: false,
				collect: false,
				likeNum: 1235,
				// 安全密码支付-弹出框
				payStatus: {
					show: false,
					url: 2
				}
			};
		},
		onLoad() {

		},
		methods: {
			// 分享
			shareCli() {
				this.show = true
			},
			// 分享取消
			cancelCli() {
				this.show = false
			},
			// 立即购买按钮	
			buy() {
				if (this.payStatus.show) {
					this.payStatus.show = false
					return
				}
				this.payStatus.show = true
			},
			// 收藏/数量
			likeCli() {
				if (this.collect) {
					this.collect = false
					this.likeNum--
				} else {
					this.collect = true
					this.likeNum++
				}
			},
			// 监听弹窗打开状态
			closeMain(val) {
				this.payStatus.show = val
			},
			// 作者头像/名称点击事件
			authorInfo() {
				uni.navigateTo({
					url: '../artist-space/artist-space'
				})
			},
			// 关注/取消关注
			focuson(id) {
				if (this.user.follow) {
					this.user.follow = false
				} else {
					this.user.follow = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #F9F9F9;
		height: 100%;
		min-height: 100vh;
	}

	.page-black {
		background-color: #1E2020;

		.head_main {
			background-color: #292B2B !important;

			.main_name {
				color: #FFFFFF !important;
			}

			.content {
				color: #AAAAAA !important;
			}
		}

		.like_num {
			color: #FFFFFF !important;
		}

		.author {
			background-color: #292B2B;

			.active_name {
				color: #FFFFFF !important;
			}

			.active_content {
				color: #AAAAAA;
			}
		}

		.certification {
			background-color: #292B2B;

			.info_item+.info_item {
				border-top: 1px solid #363737;
			}

			.item_value {
				color: #FFFFFF !important;
			}
		}

		.buy {
			background-color: #292B2B;

			.price_text {
				color: #FFFFFF !important;
			}

			.price_number {
				color: #F7924C;
			}

			.buy_btn {
				background-color: #F7924C;
			}
		}

		.focuson {
			color: #F7924C !important;
			border: 1px solid #F7924C !important;
		}
	}

	.title_right {
		display: flex;
		align-items: center;

		.like_num {
			color: #333333;
			font-size: 26rpx;
			margin: 0 36rpx 0 12rpx;
		}

		image {
			width: 38rpx;
		}
	}

	.head {
		image {
			width: 100%;
			height: 750rpx !important;
			box-sizing: border-box;
		}

		.head_main {
			transform: translateY(-60rpx);
			border-radius: 20rpx;
			background-color: #fff;
			margin: 0 30rpx;
			padding: 40rpx 32rpx;
			margin-bottom: -36rpx;

			.main_flex {
				display: flex;
				justify-content: space-between;

				.main_name {
					font-size: 32rpx;
					font-weight: bold;
					color: #111111;
				}

				.instock {
					font-size: 24rpx;
					color: #999999;
				}
			}

			.content {
				color: #666666;
				font-size: 26rpx;
				margin-top: 42rpx;
			}
		}
	}

	.author {
		margin: 24rpx 30rpx;
		border-radius: 20rpx;
		background-color: #fff;
		padding: 34rpx 30rpx 40rpx;

		.author_top {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.author_top_left {
				display: flex;
				align-items: center;

				.avatar {
					width: 70rpx;
					border-radius: 50%;
				}

				.active_info {
					margin-left: 24rpx;

					.active_name {
						color: #111111;
						font-size: 28rpx;
						font-weight: bold;

						.arrow {
							width: 12rpx;
							margin-left: 14rpx;
						}
					}

					.fans {
						margin-top: 16rpx;
						font-size: 22rpx;
						color: #999999;
					}

				}
			}

			.focuson {
				width: 100rpx;
				height: 46rpx;
				border: 1px solid #764E39;
				color: #764E39;
				font-size: 22rpx;
				text-align: center;
				line-height: 46rpx;
				border-radius: 24rpx;
				font-weight: 500;
				// margin-right: 30rpx;
			}

			.unsubscribe {
				width: 120rpx;
				height: 46rpx;
				line-height: 46rpx;
				text-align: center;
				border-radius: 24rpx;
				border: 1px solid #A2A2A2;
				color: #999999;
				font-size: 22rpx;
				font-weight: 500;
				// margin-right: 30rpx;
			}
		}

		.active_content {
			color: #666666;
			font-size: 26rpx;
			margin-top: 38rpx;
			line-height: 1.6;
		}
	}

	.certification {
		background-color: #fff;
		margin: 24rpx 30rpx;
		border-radius: 20rpx;
		padding: 32rpx 30rpx 0;

		.info_item {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item_name {
				color: #999999;
				font-size: 27rpx;
				width: 280rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.item_value {
				display: flex;
				align-items: center;
				color: #333333;
				font-size: 29rpx;
				justify-content: flex-end;
			}

			.item_valuetext {
				width: 300rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: right;
			}

			.copy_img {
				width: 22rpx;
				margin-left: 20rpx;
			}
		}

		.info_item+.info_item {
			border-top: 1px solid #F2F2F2;
		}
	}

	.buy {
		height: 110rpx;
		background-color: #fff;
		margin-top: 52rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 24rpx 0 32rpx;

		.price {
			display: flex;
			align-items: center;
			color: #A11716;

			.price_text {
				color: #333333;
				font-size: 26rpx;
			}

			.price_number {
				font-size: 38rpx;
				margin-left: 18rpx;

				.symbol {
					font-size: 24rpx;
				}
			}
		}

		.buy_btn {
			width: 200rpx;
			height: 78rpx;
			background-color: #764E39;
			color: #fff;
			line-height: 78rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
		}

		// 已售罄
		.soldout {
			background-color: #D2D2D2;
		}
	}

	.popup_title {
		font-size: 30rpx;
		color: #999999;
		text-align: center;
		margin-top: 54rpx;
	}

	.popup_flex {
		display: flex;
		justify-content: space-around;
		margin-top: 86rpx;

		.popup_item {
			display: flex;
			flex-direction: column;
			align-items: center;


			image {
				width: 90rpx;
			}

			.popup_text {
				color: #333333;
				font-size: 24rpx;
				margin-top: 20rpx;
			}
		}
	}

	.cancel {
		margin: 90rpx 30rpx 0;
		background-color: #764E39;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		color: #fff;
		font-size: 32rpx;
		border-radius: 10rpx;
	}
</style>
