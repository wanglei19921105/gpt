<template>
	<view class="page" :class="getThemeClass">
		<image src="/static/images/ranking/yqph_bg.png" class="yqph_bg" mode="widthFix"></image>

		<view class="content">
			<view class="time">
				<text>{{time}}-{{end_time}}</text>
			</view>
			
			<view class="ranking-box-box">
				<view class="ranking-box">
					<view class="ranking-header">
						<view class="ranking-header-item">排名</view>
						<view class="ranking-header-item">昵称</view>
						<view class="ranking-header-item">账号</view>
						<view class="ranking-header-item">邀请人数</view>
					</view>
					
					<scroll-view class="ranking-content" scroll-y>
						<view style="padding-top: 100rpx;" v-if="!itemData.length && listStatus !== 'loading'">
							<empty></empty>
						</view>
						<view v-for="(item,index) in itemData" :key="index">
							<view class="ranking-content-item" :class="index<3? 'active' : ''" :key="index">
								<view class="ranking-content-item-avatar">
									<view v-if="index < 3">
										<image :src="`/static/images/ranking/top_${index + 1}.png`" class="ranking-content-item-avatar-mark" mode=""></image>
										<image :src="item.avatar" class="ranking-content-item-avatar-image" mode="aspectFill"></image>
									</view>
									<view v-else>
										<text>{{ index + 1 }}</text>
									</view>
								</view>
								<view class="line-1">{{item.nickname}}</view>
								<view class="">{{init(item.user_account)}}</view>
								<view class="">{{item.child_num}}</view>
							</view>
						</view>
						<u-loadmore :status="listStatus" :margin-top="30" color="#999" v-if="itemData.length > 0 || listStatus === 'loading'" />
					</scroll-view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemData: [],
				wallet: {},
				child_num:0,
				time:'',
				end_time:'',
				listStatus: 'loading',
			};
		},
		onShow() {
			this.getAirdrop()
		},
		methods: {
			getAirdrop() {
				this.$u.api.active_rank().then(res => {
					if (res.code == 200) {
						this.time = res.data.time
						this.end_time = res.data.end_time
						this.itemData = res.data.ranking_list
						this.listStatus = false ? 'loadmore' : 'nomore'
					}
				}).catch(err => {})
			},
			init(num){
				return num.substr(0,3) + "****" + num.substr(7)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: calc(100vh - var(--window-top) - var(--window-bottom));
		overflow: hidden;
		background-color: #0c0236;
		position: relative;
		.yqph_bg {
			width: 750rpx;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 0;
		}
		.content{
			width: 750rpx;
			padding: 30rpx;
			position: relative;
			z-index: 0;
			padding-top: 470rpx;
			.time {
				font-size: 18rpx;
				color: #fff;
				text-align: center;
			}
			.ranking-box-box{
				width: 100%;
				padding: 55rpx 20rpx;
				.ranking-box{
					width: 100%;
					background: #3D1F83;
					border-radius: 20rpx;
					border: 1rpx solid rgba(255,255,255,0.6);
					.ranking-header{
						border-bottom: 1rpx solid rgba(255,255,255,0.6);
						.ranking-header-item{
							text-align: center;
							color: #fff;
							font-size: 26rpx;
						}
					}
					.ranking-content{
						height: 40vh;
						.ranking-content-item{
							border-bottom: 1rpx solid rgba(255,255,255,0.6);
							font-size: 24rpx;
							color: #FFFFFF;
							text-align: center;
							&:last-child {
								border-bottom: none;
							}
							&.active{
								background: linear-gradient(91deg, #C42553 0%, #AF255C 36%, #292B94 100%);
							}
							
							.ranking-content-item-avatar{
								height: 65rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								position: relative;
								.ranking-content-item-avatar-mark{
									position: absolute;
									width: 50rpx;
									height: 50rpx;
									top: -30rpx;
									right: 5rpx;
								}
								.ranking-content-item-avatar-image{
									width: 65rpx;
									height: 65rpx;
									border: solid 1rpx #fff;
									border-radius: 50%;
								}
							}
						}
					}
					
					.ranking-header, .ranking-content-item{
						width: 100%;
						padding: 30rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						
						>:nth-child(1){
							width: 20%;
						}
						>:nth-of-type(2){
							width: 30%;
						}
						>:nth-of-type(3){
							width: 30%;
						}
						>:nth-of-type(4){
							width: 20%;
						}
					}
				}
			}
		}
	}
</style>
