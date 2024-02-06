<template>
	<view>
		<web-view class="web" :src="src" @message="getMessage" :update-title="false"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		onShow() {
			let lang = uni.getStorageSync('lang') || 1
			let token = uni.getStorageSync("token")
			let screen = false
			console.log(token);
			this.src = `/static/index.html?lang=${lang}&token=${token}&screen=${screen}`
		},
		methods: {
			// 接收H5消息
			getMessage(data){
				console.log(data);
				// H5点了立即购买后
				uni.navigateTo({
					url: '../../casting/casting-pay/casting-pay?id=' + data.detail.data[0].action
				})
			}
		}
	}
</script>

<style>

</style>
