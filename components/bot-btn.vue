<template>
	<view :class="getThemeClass" class="btn-box">
		<button 
			:class="`${type}-btn-bg btn-bg`"
			:hover-class="`${type}-btn-bg-hover`"
			:type="type"
			:plain="plain"
			:disabled="disabled"
			@click="jumpPage(go)"
			:style="{
				borderRadius: radius,
				display: 'inline-block',
				padding,
				fontSize,
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
				type: Boolean,
				default: false
			},
			radius: {
				type: String,
				default: '10rpx'
			},
			padding: {
				type: String,
				default: '20rpx 150rpx'
			},
			fontSize: {
				type: String,
				default: '32rpx'
			},
			type: { // error
				type: String,
				default: 'default'
			},
		},
		data() {
			return {

			};
		},
		methods: {
			jumpPage(i) {
				// 1.NFT开盲盒
				if (i == 1) {
					this.openWin('/pages/frontPage/blindBox/blindBox?show=' + true)
				}
				// 2.NFT商品-已售罄
				if (i == 2) {
					this.openWin('/pages/market/goods-def/goods-def')
				}
				
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-box{
		width: 100%;
		// padding: 0rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.btn-bg{
		font-size: 34rpx;
		display: inline-block;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: inherit;
	}
</style>
