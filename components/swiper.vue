<template>
	<view>
		<view class="wrap">
			<u-swiper 
				height="280" 
				:list="list" 
				@click="swiperDef" 
				
				name="pic" 
				:bg-color="getBgColor"
				:effect3d="effect3d"
			></u-swiper>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			}
		},
		effect3d: {
			type: Boolean,
			default: false
		}
	},
	name: 'swiper',
	data() {
		return {};
	},
	methods: {
		swiperDef(index) {
			// uni.navigateTo({
			// 	url:'/pages/blog/blog-def/blog-def?id='+this.list[index].id
			// })
			// return
			// console.log(this.list[index].id);
			if (this.list[index].show_type == 1) {
				if (this.list[index].link) {
					// #ifdef APP-PLUS
					plus.runtime.openURL(this.list[index].link);
					// #endif
					// #ifdef H5
					location.href = this.list[index].link;
					// #endif
				}
			}else{
				uni.navigateTo({
					url: '/pages/frontPage/banner-def/banner-def?id=' + this.list[index].id
				});
			}			
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	// padding: 30rpx 30rpx 20rpx 30rpx;
	width: 100%;
	height: 100%;
}
</style>
