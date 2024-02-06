<template>
	<view class="page" :class="getThemeClass">
		<!-- 团队 -->
		<view class="card-bg flex align-center justify-between teamTitle">
			<view class="size-24 text-content">级别</view>
			<view class="size-24 text-content">人数</view>
			<view class="size-24 text-content">佣金</view>
		</view>
		<view class="card-bg teamTitle u-p-t-40 u-p-r-20" style="padding-bottom: 0;">
			<view class="flex align-center justify-between u-p-b-60" v-for="(item,index) in list" :key="index">
				<view class="size-24" style="width: 33%;">{{item.name}}</view>
				<view class="size-24 line-1 text-center" style="width: 26%;">{{item.num}}</view>
				<view class="size-24 flex align-center justify-end" style="width: 33%;" @click="$u.route('/pages/my/myTeam/myTeamDetails',{type:Number(index)})">
					<text class="text-right line-1" style="width: 95%;">{{item.sum}}</text>
					<uni-icons type="right" size="16" color="#FFFFFF"></uni-icons>
				</view>
			</view>
		</view>
		<view class="tishi">提示：佣金显示为下级所获得的佣金金额，本人获得的佣金金额请在钱包中查看。</view>
		<!-- 排行榜 -->
		<view class="rankheat">
			<image class="rankheat-title" src="/static/images/index/light/rankheat-title.png" mode="aspectFill" />
			<view class="rankheat_header flex justify-between align-center">
				<view class="rankheat_header_item">排行</view>
				<view class="rankheat_header_item">账号</view>
				<view class="rankheat_header_item">日消费额</view>
			</view>
			<view class="rankheat-myRank flex justify-between align-center">
				<view>{{users.ranking == null?'暂未上榜':users.ranking}}</view>
				<view class="myRank_item flex justify-between align-center">
					<image :src="users.avatar" mode="aspectFill" class="myRank_item_avatar"></image>
					<view>{{users.user_account}}（我）</view>
				</view>
				<view>{{users.total_expenses}} USDT</view>
			</view>
		</view>

		<scroll-view class="rankheat_item" scroll-y>
			<!-- <view style="padding-top: 100rpx;" v-if="!itemData.length && listStatus !== 'loading'">
				<empty></empty>@scrolltolower="rankUpdate"
			</view> -->
			<view class="ranknum flex justify-between align-center" v-for="(item,index) in itemData" :key="index">
				<view class="ranking-content-item-avatar">
					<template v-if="index < 3">
						<image :src="`/static/images/index/light/top_${index + 1}.png`" class="ranking-content-item-avatar-mark" mode=""></image>
					</template>
					<template v-else>
						<text class="rankindex">{{ index + 1 }}</text>
					</template>
				</view>
				<view class="rank-item flex justify-between align-center" >
					<view class="flex align-center">
						<image :src="item.avatar" mode="aspectFill" class="rank-avatar"></image>
						<view class="size-24">{{item.user_account}}</view>
					</view>
				</view>
				<view class="rank-num">{{item.total_expenses}} USDT</view>
			</view>
			<!-- <u-loadmore :status="listStatus" :margin-top="30" color="#999" v-if="itemData.length > 0 || listStatus === 'loading'" /> -->
		</scroll-view>
		<view class="flex rank-rule" @click="activityRule">
			<view style="color:#747982">注：查看</view>
			<view>《活动规则与奖励说明》</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				itemData: [],
				listStatus: 'loading',
				page:1,
				teammore:true,
				users:[]
			};
		},
		onLoad() {
			this.loadData()
			this.Leaderboard()
		},
		methods:{
			loadData(){
				this.$u.api.my_team().then(res => {
					this.list = res.data.data
					console.log(this.list)
				}).catch(err => {})
			},
			Leaderboard(){
				this.$u.api.mechi_rank({
					// type:this.page
				}).then(res=>{
					if (res.code == 200) {
						this.itemData = res.data.rankings
						this.users  = res.data.users
						// this.listStatus = 'nomore'
					}
				})
			},
			activityRule(){
				uni.navigateTo({
					 url: '/pages/my/myTeam/rankRule'
				});
			},
			rankUpdate(){
				if (this.teammore) {
					this.listStatus = 'loading'
					this.page += 1
				}else{
					return
				}
				this.$u.api.rank({
					type:this.page
				}).then(res=>{
					if (res.code == 200) {
						if (res.data.ranking_list!= 0) {
							this.itemData = [...this.itemData, ...res.data.ranking_list]
						}else{
							this.teammore = false
							this.listStatus = 'nomore'
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.teamTitle{
	padding: 30rpx 44rpx;
	margin: 28rpx;
	border-radius: 20rpx;
}
.rank-rule{
	padding: 30rpx;
}
.tishi{
	font-size: 22rpx;
	padding: 30rpx;
	color: #FFFFFF;
}
.rankheat-title{
	display: block;
	width: 234.5rpx;
	height: 37.5rpx;
	margin: 50rpx auto;
}
.rankheat_header{
	width: 694rpx;
	height: 88rpx;
	padding: 0 30rpx;
	background: #1E1E1E;
	margin: 0 auto;
	border-radius: 20rpx 20rpx 0 0;
	.rankheat_header_item{
		color: #A4A6AC;
		font-size: 24rpx;
	}
}
.rankheat-myRank{
	width: 694rpx;
	height: 88rpx;
	color: #8BF9AB;
	font-size: 24rpx;
	padding: 0 30rpx;
	background: #232925;
	margin: 0 auto;
	.myRank_item{
		height: 88rpx;
		.myRank_item_avatar{
				width: 40rpx;
				height: 40rpx;
				border-radius: 20rpx;
				margin-right: 20rpx;
		}
	}
}
.rankheat_item .ranknum:nth-child(even) {
  background-color:#232323;
}
.rankheat_item{
	width: 694rpx;
	height: 801rpx;
	border-radius: 0 0 20rpx 20rpx;
	background: #1E1E1E;
	margin: 0 auto;
	.ranknum{
		width: 100%;
		height: 88rpx;
		padding-right: 35rpx;
		.ranking-content-item-avatar{
			width: 100rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			.ranking-content-item-avatar-mark{
				width: 34rpx;
				height: 40rpx;
			}
		}
		.rankindex{
			font-size: 24rpx;
			color: #E1E1E1;
		}
		.rank-item{
			height: 88rpx;
			.rank-avatar{
				width: 40rpx;
				height: 40rpx;
				border-radius: 20rpx;
				margin-right: 20rpx;
			}
		}
		.rank-num{
			font-size: 24rpx;
		}
	}
}


</style>
