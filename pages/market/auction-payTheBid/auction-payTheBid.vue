<template>
	<view class="page" :class="getThemeClass">
		<!-- 出价 -->
		<!-- <unavbar :title="i18n.payauction1"></unavbar> -->
		<view class="head_hint">
			<!-- 您将竞价 -->
			{{i18n.payauction2}}
			<text>{{previewData.author_nickname}}</text>
			<!-- 的 -->
			{{i18n.payauction3}}
			<text>{{previewData.title}}</text>
		</view>
		<view class="auction_card card-bg">
			<view class="auction_title">
				<!-- 您的出价 -->
				{{i18n.payauction4}}
			</view>
			<view class="auction_price">
				<input type="number" v-model="bid" />
				<text>USDT</text>
			</view>
			<view style="width: 100%;height: 2rpx;" class="line"></view>
			<view class="hint text-content">
				<!-- 必须至少为 -->
				{{i18n.payauction5}}：<text class="text-main">{{previewData.min}}USDT</text>
			</view>
			<view class="auction_flex">
				<!-- 版权费 -->
				<view class="text-content">{{i18n.payauction6}}{{previewData.copyright_tax}}%</view>
				<!-- USDT -->
				<view>{{copyright.toFixed(2)}}{{i18n.payauction10}}</view>
			</view>
			<view class="auction_flex">
				<!-- 服务费 -->
				<view class="text-content">{{i18n.payauction7}}{{previewData.plat_free}}%</view>
				<!-- USDT -->
				<view>{{formalities.toFixed(2)}}{{i18n.payauction10}}</view>
			</view>
		</view>
		<!-- 支付方式 -->
		<!-- <payWay></payWay> -->
		<!-- 出价 -->
		<botBtnp @click.native="pay" style="margin-top: 232rpx;" :btnText="i18n.payauction1"></botBtnp>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bid: 0,
				id: null, //拍卖id
				previewData: {}, //出价预览数据
			};
		},
		onLoad(option) {
			this.id = option.id
			this.preview()
		},
		watch: {
			bid(val) {
				this.$nextTick(function() {
					this.bid = parseInt(val)
				})
			}
		},
		computed: {
			copyright() { //版权费
				return this.bid * (this.previewData.copyright_tax) * 0.01
			},
			formalities() { //手续费
				return this.bid * (this.previewData.plat_free) * 0.01
			},
		},
		methods: {
			preview() { //出价预览
				let that = this
				that.$u.api.my_auction_show({
					'id': that.id
				}).then(res => {
					if (res.code == 200) {
						that.previewData = res.data
					}

				}).catch(err => {})
			},
			pay() {
				let that = this
				if (that.bid < that.previewData.min) {
					that.$refs.uToast.show({
						// 出价至少未 USDT
						title: this.i18n.payauction5 + that.previewData.min + this.i18n.payauction10,
						type: 'warning',
					})
					return false
				}

				that.$u.api.update_price({
					'id': that.id,
					'price': that.bid
				}).then(res => {
					if (res.code == 200) {
						that.$refs.uToast.show({
							// 出价成功
							title: this.i18n.payauction9,
							type: 'success',
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '../../my/my-auction/my-auction?current=' + 1
							})
						}, 1000)
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 66rpx 0rpx;
	}
	.auction_card {
		// background-color: #fff;
		border-radius: 20rpx;
		// height: 474rpx;
		margin: 30rpx;
		// text-align: center;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		// justify-content: space-evenly;
		padding: 48rpx 30rpx 46rpx;

		.auction_title {
			// color: #333333;
			font-size: 28rpx;

		}

		.auction_price {
			// color: #333333;
			font-size: 60rpx;
			font-weight: bold;
			display: flex;
			margin-top: 75rpx;
			align-items: baseline;
			margin-bottom: 20rpx;

			text {
				font-size: 38rpx;
			}

			input {
				font-size: 60rpx;
			}
		}

		.hint {
			// color: #ABABAB;
			font-size: 27rpx;
			margin-top: 32rpx;

			text {
				// color: #303030;
			}
		}
	}

	.head_hint {
		font-size: 30rpx;
		text-align: center;
		margin: 0rpx 30rpx;

		text {
			font-weight: bold;
			margin: 0 20rpx;
		}
	}

	.auction_flex {
		display: flex;
		margin-top: 38rpx;
		justify-content: space-between;
	}
</style>
