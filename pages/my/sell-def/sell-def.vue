<template>
	<view class="box" :class="curScreenStyle? 'page-black' : 'page-white'">
		<!-- 盲盒卖出详情 - 暂已弃用 -->
		<!-- <unavbar :title="i18n.sellDet1"></unavbar> -->
		<view class="head">
			<!-- <image src="../../../static/images/commodity.png" mode="widthFix"></image> -->
			<view class="head_title">
				<!-- NFT铸品名称 -->
				{{i18n.sellDet2}}
			</view>
			<view class="author">
				<view class="author_text">
					<!-- 作者 -->
					{{i18n.sellDet3}}
				</view>
				<view class="author_gight">
					<!-- <image src="../../../static/images/commodity.png" mode="widthFix"></image> -->
					<view class="author_name">
						<!-- 作者名字 -->
						{{i18n.sellDet4}}
					</view>
				</view>
			</view>
		</view>
		<!-- 认证信息 -->
		<view class="certification">
			<view class="info_item">
				<!-- 合约地址 -->
				<view class="item_name">{{i18n.sellDet5}}</view>
				<view class="item_value">
					<view class="item_valuetext">
						0x867994b6d0x867994b6d
					</view>
					<image class="copy_img" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="info_item">
				<!-- 认证标识 -->
				<view class="item_name">{{i18n.sellDet6}}</view>
				<view class="item_value">
					<view class="item_valuetext">
						0x867994b6d0x867994b6d
					</view>
					<image class="copy_img" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<orderInfo></orderInfo>
		<!-- 已完成/按钮 -->
		<button type="default" class="finish">{{i18n.sellDet7}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				go: null
			};
		},
		onLoad(option) {
			// 1.NFT开盲盒
			// 2.NFT商品详情-已售罄
			this.go = option.go
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #F9F9F9;
		width: 100%;
		height: 100%;
	}

	.page-black {
		background-color: #1E2020;

		.head {
			background-color: #292B2B;

			.head_title {
				color: #FFFFFF;
			}

			.author_text {
				color: #999999 !important;
			}

			.author_name {
				color: #FFFFFF!important;
			}
		}
		
		.certification{
			background-color: #292B2B;
			.item_valuetext{
				color: #FFFFFF;
			}
		}
		.info_item + .info_item{
			border-top: 1px solid #363737!important;
		}
		
		.finish{
			background-color: #444444;
		}
	}

	.head {
		margin: 30rpx 30rpx 20rpx 30rpx;
		background-color: #fff;
		border-radius: 30rpx;

		image {
			width: 100%;
		}

		.head_title {
			height: 120rpx;
			line-height: 120rpx;
			text-indent: 32rpx;
			font-weight: bold;
			color: #111111;
			font-size: 32rpx;
		}

		.author {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx 34rpx;

			.author_text {
				color: #666666;
				font-size: 26rpx;
			}

			.author_gight {
				display: flex;
				align-items: center;

				image {
					border-radius: 50%;
					width: 48rpx;
				}

				.author_name {
					color: #111111;
					margin-left: 24rpx;
				}
			}
		}
	}

	.bot_btn {
		margin: 92rpx 0 80rpx;
	}

	.certification {
		background-color: #fff;
		margin: 24rpx 30rpx;
		border-radius: 20rpx;
		padding: 0 30rpx;

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

	.finish {
		margin: 70rpx 45rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		height: 94rpx;
		line-height: 94rpx;
		background-color: #D2D2D2;
		border: none;
	}

	uni-button:after {
		border: none;
	}
</style>
