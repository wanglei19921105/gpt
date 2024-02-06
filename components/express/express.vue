<template>
	<view class="">
		<uni-popup ref="popup" type="center">
			<view class="express">
				<lee-logistics height="890rpx" :data="express" />
				<view class="active-btn express-btn main-linear text-white size-28 text-bold" @click="hide()">关闭</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import leeLogistics from './lee-logistics/lee-logistics.vue'
	/**
	 * express 物流信息弹窗
	 * @property {Object} express 物流对象
	 * @author JCY
	 */
	export default {
		name: 'nomore',
		props: {
			express: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		components:{ leeLogistics },
		methods:{
			show(){
				this.$refs.popup.open()
			},
			hide(){
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss">
	.express {
		width: 700rpx;
		height: 1000rpx;
		.express-btn{
			width: 400rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-weight: bold;
			border-radius: 10rpx;
			margin: 30rpx auto 0 auto;
		}
	}
</style>
