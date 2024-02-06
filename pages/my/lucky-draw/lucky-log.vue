<template>
	<view class="page" :class="getThemeClass">
		<view class="record_card card-bg" v-for="(item,index) in list" :key="index">
			<view class="card_left">
				<view class="avatar">
					<image :src="(item.snapshot || {}).prize_image" mode="widthFix"></image>
				</view>
				<view class="card_flex">
					<view class="card_name">{{(item.snapshot || {}).name}}</view>
					<!-- <view class="coding text-content">{{item.name}}</view> -->
				</view>
			</view>
			<view class="card_right">
				<view class="time text-tips">{{(item.snapshot || {}).created_at}}</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemData: [],
				wallet: {},
				loadStatus:'noMore',
				page: 1,
				limit: 10,
				list:[]
			};
		},
		onShow() {
			this.getList(true)
		},
		onReachBottom() {
			if(this.loadStatus=='noMore')return
			this.page++
			this.getList()
		},
		methods: {
			getList(flag){
				if(flag)this.page=1
				this.$u.api.bonus_logs({
						page: this.page,
						limit: this.limit
					}).then(res => {
					if (res.code == 200) {
						this.list = flag? res.data.list.data:this.list.concat(res.data.list.data);
						this.loadStatus = res.data.list.next_page_url?'more':'noMore'
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.record_card {
		display: flex;
		justify-content: space-between;
		// background-color: #fff;
		height: 140rpx;
		margin: 20rpx 30rpx;
		align-items: center;
		border-radius: 10rpx;
		padding-right: 24rpx;

		.card_left {
			display: flex;
			align-items: center;

			.avatar {
				width: 80rpx;
				height: 80rpx;
				margin: 0 24rpx 0 28rpx;
				overflow: hidden;
				display: flex;
				align-items: center;
			}

			.card_flex {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.card_name {
					font-size: 28rpx;
					font-weight: bold;
					width: 260rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}


				.coding {
					// color: #999999;
					font-size: 24rpx;
					margin-top: 14rpx;
					width: 260rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		.card_right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: space-between;

			.grey {
				// color: #764E39;
				font-weight: 800;
			}

			.time {
				margin-top: 14rpx;
				// color: #999999;
				font-size: 24rpx;
			}

		}
	}
</style>
