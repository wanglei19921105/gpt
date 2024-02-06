<template>
	<view class="page" :class="getThemeClass">
		<view class="coll-head">
			<u-tabs
				:list="tabs" 
				:is-scroll="true" 
				:current="current" 
				@change="change" 
				:active-color="getMainColor" 
				:inactive-color="getNavInactiveColor" 
				:bg-color="getBgColor"
			></u-tabs>
		</view>
		<view class="gap-100"></view>
		<view v-for="(item, index) in list" :key="index" class="itemBox flex" @click="godetail(item.id)">
			<image :src="item.cover" mode="widthFix"></image>
			<view class="u-m-l-20">
				<view class="flex u-m-b-16">
					<view class="size-30">{{item.title}}</view>
				</view>
				<view class="flex u-m-b-20">
					<view class="time">冻结期:{{item.sale_expire}}天</view>
					<view class="time u-m-l-20">回报率:{{item.rate_return}}%</view>
				</view>
				<view class="flex u-m-b-20">
					<view class="time" v-if="item.vip_ids">VIP{{item.vip_ids}}可买</view>
					<view class="time u-m-l-20" v-if="item.user_max_num">限购{{item.user_max_num}}份</view>
				</view>
				<view style="color: #E21362;">
					<text class="size-44 text-bold">{{item.price}}</text>
					<text>USDT</text>
					<text class="">≈￥{{(item.price*exchange_rate).toFixed(2)}}</text>
				</view>
			</view>
		</view>
		<empty v-if="!list.length"></empty>
		<!-- <uni-load-more :status="loadStatus"></uni-load-more> -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				page:1,
				list:[],
				loadStatus:'noMore',
				tabs: [{
						name:'VIP1区',
						id:0
					},{
						name:'VIP2区',
						id:1
					},{
						name:'VIP3区',
						id:2
					},{
						name:'VIP4区',
						id:3
					},{
						name:'VIP5区',
						id:4
					},{
						name:'VIP6区',
						id:5
					},{
						name:'VIP7区',
						id:6
					},{
						name:'VIP8区',
						id:7
					},{
						name:'VIP9区',
						id:8
					},{
						name:'VIP10区',
						id:9
					}
				],
				current: 0,
				vip_level:0,
				exchange_rate:''
			}
		},
		onLoad() {
			this.loadData(true)
			this.exchange_rate = uni.getStorageSync('exchange_rate');
		},
		onReachBottom() {
			// if(this.listStatus === 'loadmore'){
				this.page++
				this.loadData(false)
			// }
		},
		methods:{
			loadData(flag){
				if(flag)this.page=1
				this.$u.api.vip_index({
						page: this.page,
						type: this.tabs[this.current].id
					}).then(res => {
					if (res.code == 200) {
						this.list = flag? res.data.list.data:this.list.concat(res.data.list.data);
						this.vip_level = res.data.vip_level
						// this.loadStatus = res.data.list.next_page_url?'more':'noMore'
					}
				})
			},
			change(index) {
				if(this.current==index)return
				this.current = index;
				console.log(this.vip_level,this.current);
				if (this.vip_level+1 < this.current) {
					this.$refs.uToast.show({
						title: "vip等级不够，无权限查看！",
						type: 'error'
					});
					return
				}else{
					this.loadData(true)
				}
				
			},
			godetail(id){
				if (this.vip_level-1 < this.current) {
					this.$refs.uToast.show({
						title: "vip等级不够，无权限查看！",
						type: 'error'
					});
					return
				} else{
					uni.navigateTo({
						url:`/pages/Special/SpecialDetails?id=${id}&&vip=${this.current}`
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.page{
		padding-top: calc(var(--status-bar-height));
	}
	.coll-head{
		width: 750rpx;
		position: fixed;
		top: calc(var(--status-bar-height));
		left: 0;
		z-index: 10;
	}
	.itemBox {
		overflow: hidden;
		background-color: #1E1E1E;
		margin: 32rpx 30rpx;
		border-radius: 30rpx;
		padding: 28rpx;
		>image{
			width: 170rpx;
			border-radius: 20rpx;
		}
		.time{
			background: rgba(115, 246, 162, 0.15);
			color: #73F6A2;
			font-size: 20rpx;
			padding: 9rpx 16rpx;
			border-radius: 10rpx;
		}
		.Limited{
			background: rgb(0, 0, 0);
			color: #ffffff;
			font-size: 20rpx;
			padding: 9rpx 16rpx;
			border-radius: 10rpx;
		}
	}
	
	.head_img {
		image {
			width: 100%;
		}
	}
	
	.casting_info {
		padding: 0 30rpx;
	
		.casting_head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 190rpx;
	
			.name {
				// color: #111111;
				font-size: 32rpx;
				margin-bottom: 36rpx;
				font-weight: bold;
			}
	
			.price {
				font-size: 38rpx;
	
				text {
					font-size: 26rpx;
				}
			}
	
			.head_right {
				// color: #eeb32e;
				font-weight: bold;
				font-size: 30rpx;
			}
	
		}
	
		.casting_flex {
			height: 96rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
	
			.casting_left {
				font-size: 26rpx;
			}
	
			.casting_right {
				// color: #111111;
				font-size: 28rpx;
				display: flex;
				align-items: center;
	
				.avatar {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					margin-right: 24rpx;
					overflow: hidden;
	
					image {
						width: 100%;
					}
				}
				.uicon {
					margin-left: 20rpx;
					width: 22rpx;
					border-radius: 0;
				}
			}
		}
	
		.casting_flex + .casting_flex {
			border-top: 1px solid;
		}
	}
	
	.btns {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin: 30rpx 0 30rpx 0rpx;
			.btn {
				width: 300rpx;
				height: 94rpx;
				line-height: 94rpx;
				text-align: center;
				font-size: 32rpx;
				border-radius: 10rpx;
			}
			.cancel{
				background-color: #fff;
				border: 3rpx solid red;
				color: red;
			}
		}
		.dfk{
			display: flex;
			width: 630rpx;
			margin-top: 20rpx;
		}
</style>