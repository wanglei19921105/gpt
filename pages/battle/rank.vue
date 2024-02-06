<template>
	<view class="rank">
		<view class="flex justify-between">
			<view class="">
				<image src="../../static/images/battle/rank-title.png" class="rank-title"></image>
				<view class="rank-time size-24 u-m-t-15">{{start_time}} ~ {{end_time}}</view>
			</view>
			<image src="../../static/images/battle/rank-img.png" class="rank-img"></image>
		</view>
		<view class="rank-box text-white">
			<view class="rank-top flex align-center">
				<view class="flex-1 text-center size-20">
					<view class="">我的排行</view>
					<view class="txt-ff">{{self.rank_num}}</view>
				</view>
				<view class="flex align-center flex-2">
					<image :src="self.avatar" mode="aspectFill" class="rank-avatar flex-shink"></image>
					<view class="line-1 size-26 u-m-l-10" style="width: 150rpx;">{{self.nickname}}</view>
				</view>
				<view class="flex-1 text-center txt-ff">{{self.total_num}}场</view>
				<view class="flex-1 text-center txt-ff">{{self.win_num}}场</view>
			</view>
			<view class="rank-th flex align-center text-center size-20" style="opacity: 0.6;">
				<view class="flex-1">排名</view>
				<view class="flex-2">头像昵称</view>
				<view class="flex-1">对局数量</view>
				<view class="flex-1">胜场</view>
			</view>
			<view class="" v-for="(item,index) in list" :key="index">
				<view class="flex align-center">
					<view class="flex-1 text-center" v-if="index<3">
						<image :src="`/static/images/battle/rank${index}.png`" class="rank-listimg"></image>
					</view>
					<view class="size-30 text-bold flex-1 text-center" v-else>{{index + 1}}</view>

					<view class="flex align-center flex-2">
						<image :src="item.avatar" mode="aspectFill" class="rank-listimg" style="border-radius: 50%;"></image>
						<view class="line-1 size-24 u-m-l-10" style="width: 150rpx;">{{item.nickname}}</view>
					</view>
					<view class="flex-1 text-center size-24">{{item.total_num}}场</view>
					<view class="flex-1 text-center size-24">{{item.win_num}}场</view>
				</view>
				<view class="rank-line"></view>
			</view>

		</view>

	</view>
</template>

<script>
	export default{
		data(){
			return{
				end_time:'',
				start_time:'',
				list:[],
				self:{}
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:"./award"
			})
		},
		onLoad() {
			this.loadData()
		},
		methods:{
			loadData(){
				this.$u.api.battle_rank().then(res=>{
					this.start_time = res.data.start_time
					this.end_time = res.data.end_time
					this.list = res.data.list
					this.self = res.data.self
				})
			}
		}
	}
</script>

<style lang="scss">
	.rank {
		width: 100vw;
		min-height: calc(100vh - var(--window-top));
		background-image: url("../../static/images/battle/battle-bg.png");
		background-size: cover;
		padding: 30rpx;

		.rank-title {
			width: 407rpx;
			height: 64rpx;
		}

		.rank-time {
			height: 54rpx;
			border-radius: 27rpx;
			padding: 0 25rpx;
			background-color: rgba(192, 229, 248, 0.4);
			color: #FFFFFF;
			line-height: 54rpx;
		}

		.rank-img {
			width: 211rpx;
			height: 372rpx;
		}

		.rank-box {
			border-radius: 24rpx;
			background-color: #2A237A;
			overflow: hidden;
			position: relative;
			top: -164rpx;
			z-index: 10;

			.rank-top {
				height: 100rpx;
				background-color: #2F2398;

				.rank-avatar {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
			}

			.rank-th {
				height: 80rpx;
			}
		}

		.rank-listimg {
			width: 48rpx;
			height: 48rpx;
		}

		.rank-line {
			width: 593rpx;
			height: 1rpx;
			background-color: rgba(255, 255, 255, 0.2);
			margin: 38rpx auto;
		}
	}

	.txt-ff {
		color: #FFD050;
	}
</style>
