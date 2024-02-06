<template>
	<view class="page">
		<view class="kfz">
			展台开发中
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:[]
			}
		},
		onLoad(option) {
			
			this.obj = JSON.parse(decodeURIComponent(option.booth))
			console.log(this.obj);
			this.$u.api.preList({
				star_id: this.obj.star_id, //星球id
				floor: this.obj.floor ,//层数
				room:this.obj.room
			}).then(res => {
				
				console.log(res);
			})
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 750rpx;
		height: 100vh;
		text-align: center;
	}
	.kfz{
		font-size: 50rpx;
		margin-top: 30rpx;
		color: #000;
	}
</style>