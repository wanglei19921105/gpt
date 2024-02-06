<template>
	<view class="page" :class="getThemeClass">
		<empty v-if="!clendar.length"></empty>
		<view class="u-p-l-28 u-p-r-28">
			<view class="main-card u-m-t-20 pos-re" v-for="(item,index) in clendar" :key="index" @click="$u.route('/pages/my/calendar/calendar-detail',{id:item.id})">
				<view class="rili-tag text-default u-font-28 text-bold">即将开始 {{item.show_at}}</view>
				<view class="gap-50"></view>
				<image :src="item.cover" mode="aspectFill" class="rili-img"></image>
				<view class="u-m-t-40 u-font-36 text-bold">{{item.title}}</view>
				<view class="text-tips u-m-t-28 u-font-26">限量{{item.num}}份</view>
				<view class="flex justify-between align-center u-m-t-24">
					<view class="flex align-center">
						<image :src="item.author.avatar||'/static/logo.png'" mode="aspectFill" class="rili-authorimg"></image>
						<view class="u-m-l-12 u-font-26 text-bold">{{item.author.nickname}}</view>
					</view>
					<view class="rili-price">{{item.price}}USDT</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			clendar:[]
		};
	},
	onLoad() {
		this.loadData();
	},
	methods: {
		loadData() {
			this.$u.api.calendars().then(res=>{
				this.clendar = res.data.clendar
			})
		}
	}
};
</script>

<style lang="scss">
	.rili-tag{
		height: 56rpx;
		line-height: 56rpx;
		padding: 0 25rpx;
		background: linear-gradient(90deg, #04D5A3 0%, #00E2E2 100%);
		border-radius: 20rpx 8rpx 20rpx 8rpx;
		position: absolute;
		top: 0;
		left: 0;
	}
.rili-img{
		width: 634rpx;
		height: 634rpx;
		border-radius: 20rpx;
	}
	.rili-authorimg{
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
	}
	.rili-price{
		font-size: 40rpx;
		font-weight: bold;
	}
</style>
