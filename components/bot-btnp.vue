<template>
	<view :class="getThemeClass" class="btn-box">
		<button
			type="default" 
			@click="jumpPage(go)"
			:class="['default-btn-bg', {'audit': disabled == 1 || disabled == 3}]"
			hover-class="default-btn-bg-hover"
			:plain="plain"
			:disabled="disabled == 0 || disabled == 3? false : true" 
			v-if="disabled != 2"
			:style="{
				borderRadius: radius,
				display: 'inline-block',
				fontSize,
				padding,
			}"
		>
			<slot>{{btnText}}</slot>
		</button>
	</view>
</template>

<script>
	export default {
		name: "bot-Btn",
		props: {
			btnText: {
				type: String,
				default: () => {
					return ''
				}
			},
			go: {
				type: String,
				default: () => {
					return ''
				}
			},
			plain: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Number,
				default: () => {
					return 0
				}
			},
			radius: {
				type: String,
				default: '10rpx'
			},
			padding: {
				type: String,
				default: '25rpx 150rpx'
			},
			fontSize: {
				type: String,
				default: '32rpx'
			}
		},
		data() {
			return {

			};
		},
		methods: {
			jumpPage(i) {
				// 2.NFT商品详情-已售罄
				if (i == 2) {
					// uni.navigateTo({
					// 	url: '/pages/market/goods-soldOut/goods-soldOut'
					// })
				}
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>

	.audit {
		border: 1px solid #a1a4ab;
	}
	
	.btn-box{
		width: 100%;
		padding: 0rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.default-btn-bg{
		display: inline-block;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: inherit;
		width: 100%;
	}

	uni-button:after {
		border: none;
	}
</style>
