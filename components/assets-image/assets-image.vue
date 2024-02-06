<template>
	<image :src="src?src:'/static/logo.png'" :style="{'width':width+'rpx','height':(height>0?height:width)+'rpx','border-radius':radius+'rpx'}" mode="aspectFill" @click="bindClick"></image>
</template>

<script>
	/**
	 * @description assetsImages图片组件
	 * @param {String} src 图片路径
	 * @param {String||Number} width 宽
	 * @param {String||Number} height 高,不填取宽度为正方形
	 * @param {String||Number} radius 圆角
	 * @event {Funtion} click 点击
	 */
	export default{
		name:'assetsImages',
		props:{
			src:{
				type:String,
				default:''
			},
			width:{
				type:[Number, String],
				default: 0
			},
			height:{
				type:[Number, String],
				default: 0
			},
			radius: {
				type: [Number, String],
				default: 0
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