<template>
	<view class="page" :class="getThemeClass">
		<image :src="baseUrl+info.products_cover" mode="aspectFill" class="rili-top"></image>
		<view class="rili-gap"></view>
		<view class="rili-content bg">
			<!-- 			<view class="flex justify-between align-center">
				<view class="flex align-center">
					<image :src="authors.avatar||'/static/logo.png'" mode="aspectFill" class="rili-avatar"></image>
					<view class="u-m-l-20 u-font-28">{{authors.nickname}}</view>
				</view>
				<view class="">
					<u-button type="primary" size="mini" shape="circle">关注</u-button>
				</view>
			</view> -->

			<view class="rili-line line"></view>
			<view class="">
				<text class="rili-tag text-default u-font-22 text-bold" v-if="info.new_type==3">实物</text>
				<text class="u-m-l-20 u-font-40 text-bold">{{info.products_title}}</text>
			</view>
			<!-- <view class="u-m-t-30 u-font-24 text-content">简介：{{info.introduction||'无'}}</view> -->
			<view class="u-m-t-40 flex justify-between align-center">
				<view class="card-bg rili-card flex flex-direction justify-center">
					<view class="u-font-22 text-tips">价格</view>
					<view class="u-m-t-10 u-font-30 text-bold">{{info.price}}</view>
				</view>
				<view class="card-bg rili-card flex flex-direction justify-center">
					<view class="u-font-22 text-tips">库存</view>
					<view class="u-m-t-10 u-font-30 text-bold">{{info.total_issue - info.yiduihuan}}</view>
				</view>
			</view>
			<!-- 		<view class="main-card u-m-t-40">
				<view class="u-font-32 text-bold">认证信息</view>
				<view class="flex justify-between align-center u-m-t-54 u-font-26">
					<view class="text-tips">智能合约地址</view>
					<view class="flex align-center" @click="copy($myAppConfig.NFTAddress)">
						<view class="line-1 text-right u-m-r-10" style="width: 300rpx;">{{ $myAppConfig.NFTAddress }}</view>
						<u-icon name="order"></u-icon>
					</view>
				</view>
				<view class="flex justify-between align-center u-m-t-68 u-font-26">
					<view class="text-tips">NFT认证协议</view>
					<view class="line-1 text-right" style="width: 300rpx;">{{ $myAppConfig.NFTAgreement }}</view>
				</view>
				<view class="flex justify-between align-center u-m-t-68 u-font-26">
					<view class="text-tips">区块链网络</view>
					<view>{{ $myAppConfig.NFTNetwork }}</view>
				</view>
			</view> -->
			<view class="u-font-36 text-bold u-m-t-60">藏品详情</view>
			<view class="main-card u-m-t-40">
				<u-parse :html="info.desc" @imgtap="e => e.ignore()"></u-parse>
			</view>
			<!-- 			<view class="u-font-36 text-bold u-m-t-60">购买须知</view>
			<view class="main-card u-m-t-40">{{note.buy_note||''}}</view>
			<view class="u-font-36 text-bold u-m-t-60">权益须知</view>
			<view class="main-card u-m-t-40">{{note.power_note||''}}</view> -->
		</view>
		<view class="gap-100"></view>
		<!-- @click="$u.route(`/pages/my/point/point-createorder`,{id})" -->
		<view class="move-btn bg-cayn detail-botbtn text-default" @click="immediate">
			立即兑换
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				info: {},
				note: {},
				authors: {},
				baseUrl:""
			}
		},
		onLoad(data) {
			this.baseUrl = this.$myAppConfig.baseUrl + '/';
			this.id = data.id || ''
			this.loadData()
		},
		methods: {
			loadData() {
				this.$u.api.shop_detail({
					goods_id: this.id
				}).then(res => {
					this.info = res.data.goods_info
					// this.note = res.data.note
					// this.authors = res.data.authors
				})
			},
			copy(data) {
				uni.setClipboardData({
					data
				})
			},
			immediate() {
				this.$u.api.shop_exchange({
					goods_id: this.id
				}).then(res => {
					uni.showToast({
						title: '兑换成功',
						icon: 'none'
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	.rili-top {
		width: 100vw;
		height: 100vw;
		position: absolute;
		top: 0;
		left: 0;
	}

	.rili-gap {
		width: 100vw;
		height: 686rpx;
	}

	.rili-content {
		position: relative;
		z-index: 10;
		padding: 80rpx 50rpx 20rpx 50rpx;
		border-radius: 66rpx;

		.rili-avatar {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
		}

		.rili-line {
			height: 1rpx;
			margin: 40rpx 0 50rpx 0;
		}

		.rili-tag {
			display: inline-block;
			height: 40rpx;
			line-height: 40rpx;
			padding: 0 16rpx;
			background: linear-gradient(90deg, #04D5A3 0%, #00E2E2 100%);
			border-radius: 20rpx 8rpx 20rpx 8rpx;
		}

		.rili-card {
			width: 308rpx;
			height: 132rpx;
			border-radius: 20rpx;
			padding-left: 40rpx;
		}
	}
</style>