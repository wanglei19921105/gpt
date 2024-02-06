<template>
	<view class="result">
		<image src="../../static/images/battle/vs-fail.png" class="result-img" v-if="is_victories==2"></image>
		<image src="../../static/images/battle/vs-win.png" class="result-img" v-if="is_victories==1"></image>
		<image src="../../static/images/battle/vs-draw.png" class="result-img" v-if="is_victories==0"></image>
		<view class="text-center text-white size-36 text-bold" v-if="is_victories==2">很遗憾，本局对战失利</view>
		<view class="text-center text-white size-36 text-bold" v-if="is_victories==1">恭喜你，本局对战成功</view>
		<view class="text-center text-white size-36 text-bold" v-if="is_victories==0">当前对战与对手平局</view>
		<view class="txt-ff size-30 text-bold text-center u-m-t-20">积分 ×{{point}} 奖励已到账</view>
		<view class="u-p-l-30 u-p-r-30 u-m-t-50">
			<view class="result-card flex justify-between align-center" v-if="other_user">
				<view class="flex align-center">
					<image :src="other_user.avatar" mode="aspectFill" class="result-avatar"></image>
					<view class="size-24 text-bold text-white">{{other_user.nickname}}</view>
				</view>
				<image :src="getimage(other_user.now_battle_num)" class="result-icon"></image>
			</view>
			<view class="flex justify-end u-m-t-30" v-if="self">
				<view class="result-card flex justify-between align-center">
					<view class="flex align-center">
						<image :src="self.avatar" mode="aspectFill" class="result-avatar"></image>
						<view class="size-24 text-bold text-white">{{self.nickname}}</view>
					</view>
					<image :src="getimage(self.now_battle_num)" class="result-icon"></image>
				</view>
			</view>
			
			<view class="result-box u-m-t-30" v-if="pre">
				<view class="result-top">抵押藏品信息展示</view>
				<view class="result-bot">
					<view class="result-cont flex align-center">
						<image :src="pre.products_cover" mode="aspectFill" class="result-goodsimg"></image>
						<view class="result-name">
							<view class="">{{pre.products_title}}</view>
							<view class="u-m-t-40">X 1</view>
						</view>
					</view>
					<view class="flex align-center size-22 text-55 u-m-t-20">
						<view class="cuIcon-title text-bold"></view>
						<view class="">对手的抵押藏品正在送来的路上，请稍等！</view>
					</view>
				</view>
			</view>
			<view class="flex justify-between align-center u-m-t-60">
				<view class="result-leftbtn" @click="goMyGoods">前往我的藏品</view>
				<view class="result-rightbtn" @click="backBattelHome">返回对战主页</view>
			</view>
			<view class="gap-200"></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				is_victories:-1,
				other_user:null,
				self:null,
				pre:null,
				point:0,
				
				list:[
					{
						name: '石头',
						value: 2,
						img: '/static/images/battle/stone.png'
					},
					{
						name: '剪刀',
						value: 1,
						img: '/static/images/battle/scissor.png'
					},
					{
						name: '布',
						value: 3,
						img: '/static/images/battle/cloth.png'
					},
				]
			}
		},
		onLoad() {
			this.loadData()
		},
		methods:{
			loadData(){
				this.$u.api.battle_battle_index().then(res=>{
					this.is_victories = res.data.is_victories
					this.other_user = res.data.other_user
					this.self = res.data.self
					this.pre = res.data.pre
					this.point = res.data.point
				})
			},
			backBattelHome(){
				uni.redirectTo({
					url:'./battle'
				})
			},
			goMyGoods(){
				uni.redirectTo({
					url:"/pages/my/collections/collections"
				})
			},
			getimage(value){
				let index;
				for(let i=0;i<this.list.length;i++){
					if(this.list[i].value===value){
						index = i
						break;
					}
				}
				return this.list[index].img
			}
		}
	}
</script>

<style lang="scss">
	.result{
		width: 750rpx;
		min-height: calc(100vh - var(--window-top));
		background-image: url("../../static/images/battle/battle-bg.png");
		background-size: cover;
		.result-img{
			width: 384rpx;
			height: 384rpx;
			margin: 0 183rpx;
		}
		.result-card{
			width: 453rpx;
			height: 120rpx;
			background-image: url("../../static/images/battle/result-bg.png");
			background-size: 100% 100%;
			padding: 0 40rpx;
			.result-avatar{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				border: 1rpx solid #FFFFFF;
				margin-right: 15rpx;
			}
			.result-icon{
				width: 80rpx;
				height: 80rpx;
			}
		}
		.result-box{
			border-radius: 12rpx;
			background-color: #DFE4FF;
			overflow: hidden;
			.result-top{
				height: 88rpx;
				width: 100%;
				background-color: #B8BCE8;
				text-align: center;
				line-height: 88rpx;
				font-weight: bold;
				-webkit-text-stroke: 2rpx #1E1458;
				-webkit-text-fill-color: #FFFFFF;
			}
			.result-bot{
				padding: 24rpx 28rpx;
				.result-cont{
					height: 178rpx;
					border-radius: 16rpx;
					background-color: #B8BCE8;
					padding: 0 20rpx;
					.result-goodsimg{
						width: 138rpx;
						height: 138rpx;
						border-radius: 12rpx;
						margin-right: 20rpx;
					}
					.result-name{
						font-weight: bold;
						-webkit-text-stroke: 2rpx #231C6A;
						-webkit-text-fill-color: #FFFFFF;
						font-size: 24rpx;
					}
				}
			}
		}
		.result-leftbtn{
			width: 300rpx;
			height: 80rpx;
			background-image: url("../../static/images/battle/result-leftbtn.png");
			background-size: 100% 100%;
			font-weight: bold;
			-webkit-text-stroke: 2rpx #BB6E10;
			-webkit-text-fill-color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
		}
		.result-rightbtn{
			width: 300rpx;
			height: 80rpx;
			background-image: url("../../static/images/battle/result-rightbtn.png");
			background-size: 100% 100%;
			font-weight: bold;
			-webkit-text-stroke: 2rpx #660FA7;
			-webkit-text-fill-color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
		}
	}
	.txt-ff{
		color: #FFD050;
	}
</style>