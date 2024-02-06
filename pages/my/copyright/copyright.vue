<template>
	<view class="box" :class="curScreenStyle? 'page-black' : 'page-white'">
		<!-- 对外转增 - 暂已弃用 -->
		<!-- <unavbar :title="i18n.record3"></unavbar> -->
		<view class="card">
			<view class="cover_img">
				<image :src="itemData.cover" mode="widthFix"></image>
			</view>
			<view class="card_flex">
				<!-- NFT铸品名称 -->
				<view>{{itemData.title}}</view>
				<!-- <view class="price">
					199.00<text>USDT</text></view> -->
			</view>
		</view>
		<!-- 转出平台账户 -->
		<view class="title">{{i18n.Copyright1}}</view>
		<!-- 请输入转出得钱包地址 -->
		<input class="myinput" type="text" v-model="params.other_info" :placeholder="i18n.Copyright2"
			placeholder-class="input_pla" />
		<!-- 安全密码 -->
		<view class="title">{{i18n.Copyright3}}</view>
		<!-- 输入安全密码 -->
		<input class="myinput" type="text" v-model="params.security" :placeholder="i18n.Copyright4"
			placeholder-class="input_pla" />
		<view class="hint">
			<!-- * 转出时请注意核对地址，资产一旦转出将无法找回 -->
			* {{i18n.Copyright5}}
		</view>
		<!-- 确认转出 -->
		<botBtnp :btnText="i18n.Copyright6" style="margin-top: 200rpx;" @click.native="transferOut"></botBtnp>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					product_pre_id: null,//作品id
					other_info: '',//账号
					type: 2,//	转增类型1内部2外部
					security: '',//安全密码
				},
				itemData:{}
			};
		},
		onLoad(option) {
			if(option.item){
				this.itemData = JSON.parse(decodeURIComponent(option.item))
			}
			this.params.product_pre_id = this.itemData.id
		},
		methods: {
			transferOut() {
				if (!this.params.other_info) {
					this.$refs.uToast.show({
						// 请输入手机账号
						title: this.i18n.Copyright7,
						type: 'error',
					})
					return false
				}
				if (!this.params.security) {
					this.$refs.uToast.show({
						// 请输入密码
						title: this.i18n.Copyright8,
						type: 'error',
					})
					return false
				}
				if (!this.params.product_pre_id) {
					this.$refs.uToast.show({
						// 转出失败,请稍后再试
						title: this.i18n.Copyright9,
						type: 'error',
					})
					return false
				}
				if (!this.params.type) {
					this.$refs.uToast.show({
						// 转出失败,请稍后再试
						title: this.i18n.Copyright9,
						type: 'error',
					})
					return false
				}
				this.$u.api.given(this.params).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							// 转赠成功
							title: this.i18n.Copyright10,
							type: 'success',
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'../transferRecord/transferRecord'
							})
						},1000)
					}
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #F9F9F9;
		min-height: 100vh;
	}

	page {
		background-color: #F9F9F9;
	}

	.page-black {
		background-color: #1E2020;
		min-height: 100vh;

		.card {
			background-color: #292B2B;

			.card_flex {
				color: #FFFFFF;

				.price {
					color: #F7924C;
				}
			}
		}

		.title {
			color: #FFFFFF;
		}

		.myinput {
			background-color: #292B2B;
			color: #FFFFFF;
		}
	}

	.card {
		height: 266rpx;
		border-radius: 12rpx;
		background-color: #fff;
		margin: 20rpx 30rpx;
		display: flex;
		align-items: center;
		
		.cover_img{
			width: 200rpx;
			height: 200rpx;
			margin-left: 30rpx;
			overflow: hidden;
		}
		
		image {
			width: 100%;
		}

		.card_flex {
			padding: 30rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
		}

		.price {
			color: #A11716;
			font-size: 32rpx;

			text {
				font-size: 24rpx;
			}
		}
	}

	.title {
		color: #333333;
		font-size: 26rpx;
		margin: 36rpx 0 20rpx 30rpx;
	}

	.myinput {
		height: 100rpx;
		background-color: #fff;
		margin: 24rpx 30rpx 40rpx;
		padding-left: 30rpx;
		border-radius: 20rpx;
	}

	.input_pla {
		color: #AAAAAA;
		font-size: 28rpx;
	}

	.hint {
		margin: 30rpx 40rpx;
		color: #B3272A;
		font-size: 24rpx;
	}
</style>
