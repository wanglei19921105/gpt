<template>
	<view class="page" :class="getThemeClass">
		<!-- 我的粉丝 -->
		<!-- <unavbar :title="i18n.fan1"></unavbar> -->
		<view class="card_box">
			<empty v-if="!fansList.length"></empty>
			
			<template v-for="(item,index) in fansList">
				
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
							:class="item.status? '' : 'border-color-main color-main'"
							@click="follow(item.user_id)"
						>{{item.status? '取消关注' : '互相关注'}}</button>
					</view>
				</view>
				
			</template>
		</view>
		<u-loading mode="circle" :show="show" size="44" style="position: fixed;left: 50%;top: 50%;"></u-loading>
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
				fansList: [],
				show: false
			};
		},
		onShow() {
			this.getFans()
		},
		methods: {
			getFans() {
				this.$u.api.my_fans(this.params).then(res => {
					this.fansList = res.data.list.data
				}).catch(err => {

				})
			},
			// 互相关注
			follow(id) {
				this.fansList.some(item => {
					if (item.user_id == id) {
						// 取消关注
						if (item.status) {
							this.show = true
							this.$u.api.callback_attention({
								'user_id': id
							})
							setTimeout(() => {
								this.getFans()
								this.show = false
							}, 1000)
							return true
						} else {
							// 关注
							this.show = true
							this.$u.api.attention({
								'user_id': id
							})
							setTimeout(() => {
								this.getFans()
								this.show = false
							}, 1000)
							return true
						}
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
			padding: 10rpx 20rpx;
			line-height: inherit;
			&::after {
				content: '';
			}
		}
	}
</style>
