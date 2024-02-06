<template>
	<view class="page flex flex-direction justify-center align-center" :class="getThemeClass">
		
		<image :src="path" mode="aspectFit" class="compound-getimg"></image>
		
		<botBtn class="u-m-t-50" @click="submit" radius="50rpx">领取藏品</botBtn>
		<!-- <view class="compound-btn move-btn" @click="submit">领取藏品</view> -->
		
		<image src="/static/images/compound-close.png" class="img-60 margin-top-48" @click="back"></image>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				path:''
			}
		},
		onLoad(data) {
			this.id = data.id
			this.path = data.path
		},
		methods:{
			submit(){
				this.$u.api.mix_receive({id:this.id}).then(res=>{
					if(res.code==200){
						uni.showToast({
							title:"领取成功",
							icon:"none"
						})
						setTimeout(()=>{
							uni.navigateBack()
						},1500)
					}
				})
			},
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	// .content {
	// 	background-color: #F1C7AB;
	// 	height: 100%;
	// 	min-height: 100vh;
	// }
	.compound-getimg{
		width: 400rpx;
		height: 580rpx;
		border-radius: 15rpx;
		margin-bottom: 60rpx;
	}
	// .compound-btn{
	// 	width: 400rpx;
	// 	height: 88rpx;
	// 	border-radius: 44rpx;
	// 	background-color: #E4BC81;
	// 	text-align: center;
	// 	line-height: 88rpx;
	// 	color: #6B5E4B;
	// }
	// .page-black{
	// 	background-color: #48423B !important;
	// 	.compound-txt{
	// 		color: #FFFFFF;
	// 	}
	// }
</style>