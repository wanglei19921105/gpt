<template>
	<view class="page" :class="getThemeClass">
		<!-- 实名认证 -->
		<!-- <unavbar :title="i18n.verified1"></unavbar> -->
		
		<view class="image-box">
			<image src="/static/images/smwc.png" class="image" mode=""></image>
			<text class="image-text">实名认证成功</text>
		</view>
		
		<view class="card-bg card">
			<view class="card-item">
				<text class="text-tips">姓名</text>
				<text class="text-bold">{{check.id_name || '暂无'}}</text>
			</view>
			<view class="card-item">
				<text class="text-tips">身份证号</text>
				<text class="text-bold">{{check.id_num || '暂无'}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				check: {
					check: 0,
					id_name: null,
					id_num: null
				},
			};
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData(){
				this.$u.api.checkInformation().then(res => {
					this.check = res.data.check
					this.$set(this.params, 'id_name', res.data.check.id_name)
					this.$set(this.params, 'id_num', res.data.check.id_num)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.page{
		padding: 0 30rpx;
	}
	
	.image-box{
		padding: 130rpx 0rpx 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.image{
			width: 180rpx;
			height: 180rpx;
		}
		.image-text{
			font-size: 36rpx;
			font-weight: 500;
			margin-top: 20rpx;
		}
	}
	
	.card{
		padding: 50rpx 30rpx;
		border-radius: 35rpx;
		.card-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 50rpx;
			font-size: 30rpx;
			&:first-child {
				margin-top: 0;
			}
			&-title{}
			&-value{}
		}
	}
</style>
