<template>
	<view class="page" :class="getThemeClass">
		<!-- 我的关注 -->
		<!-- <unavbar :title="i18n.follow1"></unavbar> -->
		<view class="card_box">
			<empty v-if="!followData.length"></empty>
			
			<template v-for="(item,index) in followData">
				
				<view class="card card-bg" :key="item.id">
					<view class="flex-shrink-0">
						<u-avatar :src="item.avatar || '/static/logo.png'" size="85"></u-avatar>
					</view>
					
					<view class="content u-m-l-20">
						<view class="">
							<text class="u-font-28 text-main">{{ item.nickname }}</text>
						</view>
						<view class="u-font-22 text-content u-m-t-15">
							<text>粉丝：{{ item.fans }}</text>
							<text class="u-m-l-20">喜欢：{{ item.my_like }}</text>
						</view>
					</view>
					
					<view class="flex-shrink-0">
						<button 
							class="unfollow card-bg"
							:class="item.status? 'border-color-main color-main' : ''"
							@click="unfollow(item.user_id)"
						>{{item.status? '关注' : '取消关注'}}</button>
					</view>
				</view>
				
			</template>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					page: 1,
					limit: 10
				},
				followData:[]
			};
		},
		onShow() {
			this.getFollowlist()
		},
		methods: {
			getFollowlist() {
				this.$u.api.my_concern(this.params).then(res => {
					this.followData = res.data.list.data
				}).catch(err => {})
			},
			// 取消关注
			unfollow(id) {
				this.followData.some(item => {
					if (item.user_id == id) {
						this.$u.api.callback_attention({'user_id':id})
						this.getFollowlist()
						// if (item.follow) {
						// 	item.follow = false
						// 	return true
						// } else {
						// 	item.follow = true
						// 	return true
						// }
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.card_box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 0 30rpx;
		justify-content: space-between;
	}

	.card {
		width: 100%;
		margin-bottom: 30rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.flex-shrink-0{
			flex-shrink: 0;
		}
		.content {
			display: flex;
			flex-direction: column;
			width: 100%;
		}

		.unfollow {
			border-radius: 50rpx;
			border: 1rpx solid #999999;
			color: #999999;
			font-size: 22rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0;
			padding: 10rpx 15rpx;
			line-height: inherit;
			&::after {
				content: '';
			}
		}
	}
</style>
