<template>
	<view class="text-center active-btn"
		:style="{'width':width+'rpx','height':height+'rpx','line-height':height+'rpx','border-radius':height/2+'rpx','font-size':size+'rpx','color':color,'background-color':bgColor}"
		@click="bindClick">{{text}}</view>
</template>

<script>
	/**
	 * @description submitBtn填充式按钮
	 * @param {String} text 文字
	 * @param {String} color 文字颜色
	 * @param {String} bgColor 按钮背景色
	 * @param {String||Number} width 宽
	 * @param {String||Number} height 高
	 * @event {Funtion} click 点击
	 */
	export default {
		name: 'submitBtn',
		props: {
			text: {
				type: String,
				default: '确定'
			},
			color: {
				type: String,
				default: '#20222E'
			},
			bgColor: {
				type: String,
				default: '#FFFFFF'
			},
			width: {
				type: [Number, String],
				default: 694
			},
			height: {
				type: [Number, String],
				default: 90
			},
			size: {
				type: [Number, String],
				default: 34
			}
		},
		methods:{
			bindClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style>
</style>
