<template>
	<view class="bottom-copyright" v-if="icon && name && icp">
		<view class="bottom-copyright-item">
			<image :src="icon" class="bottom-copyright-item-bsn-image" mode=""></image>
			<text class="bottom-copyright-item-bsn-text">{{ name }}</text>
		</view>
		<view class="bottom-copyright-item u-m-t-10">
			<text class="bottom-copyright-item-record-text">{{ icp }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"bottom-copyright",
		data() {
			return {
				icon: '',
				name: '',
				icp: '',
			};
		},
		created() {
			this.loadData()
		},
		methods: {
			loadData(){
				this.$u.api.open_status().then(res => {
					this.icon = res.data.sys.icon
					this.name = res.data.sys.support
					this.icp = res.data.sys.icp
					uni.setStorageSync('exchange_rate', res.data.sys.exchange_rate);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.bottom-copyright{
	padding: 30rpx 0rpx;
	&-item{
		display: flex;
		align-items: center;
		justify-content: center;
		&-bsn{
			&-image{
				width: 50rpx;
				height: 30rpx;
			}
			&-text{
				font-size: 22rpx;
				color: #b3b3b3;
				margin-left: 10rpx;
			}
		}
		&-record{
			margin-top: 20rpx;
			&-text{
				font-size: 18rpx;
				color: #666666;
			}
		}
	}
}
</style>