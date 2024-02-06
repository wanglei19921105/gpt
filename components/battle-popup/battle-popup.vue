<template>
	<view class="">
		<uni-popup ref="popup" type="center">
			<view class="battle-popup flex flex-direction align-center">
				<image :src="iconPath" class="battle-icon"></image>
				<view class="battle-poptitle" v-if="title">{{title}}</view>
				<view class="battle-popcontent" v-if="content">{{content}}</view>
				<view class="flex justify-between align-center">
					<view class="battle-popleftbtn u-m-r-24 move-btn" @click="cancel">{{cancelTxt}}</view>
					<view class="battle-poprightbtn move-btn" @click="repeatClick(submit)">{{confrimTxt}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	/**
	 * @description 对战专区对话弹窗
	 * @param {String} iconPath 图标路径
	 * @param {String} title 标题
	 * @param {String} content 内容
	 * @param {String} cancelTxt 取消文本
	 * @param {String} confrimTxt 确认文本
	 */
	export default {
		name:"battlePopup",
		props:{
			iconPath:{
				type:String,
				default:'/static/images/battle/battle-icon.png'
			},
			title:{
				type:String,
				default:''
			},
			content:{
				type:String,
				default:''
			},
			cancelTxt:{
				type:String,
				default:'我再想想'
			},
			confrimTxt:{
				type:String,
				default:'确认'
			}
		},
		methods:{
			show(){
				this.$refs.popup.open()
			},
			hide(){
				this.$refs.popup.close()
			},
			cancel(){
				setTimeout(()=>{
					this.hide()
					this.$emit('cancel')
				},300)
			},
			submit(){
				setTimeout(()=>{
					this.hide()
					this.$emit('confrim')
				},300)
			}
		}
	}
</script>

<style lang="scss">
	.battle-popup{
		width: 630rpx;
		height: 640rpx;
		background-image: url("@/static/images/battle/battle-popup.png");
		background-size: 100% 100%;
		padding: 50rpx 50rpx 0 50rpx;
		.battle-icon{
			width: 220rpx;
			height: 220rpx;
		}
		.battle-poptitle{
			font-size: 40rpx;
			font-weight: bold;
			color: #3d3d3d;
			margin-top: 36rpx;
		}
		.battle-popcontent{
			font-size: 26rpx;
			color: #3d3d3d;
			margin-top: 36rpx;
			text-align: center;
			margin-bottom: 50rpx;
		}
		.battle-popleftbtn{
			width: 255rpx;
			height: 88rpx;
			text-align: center;
			line-height: 88rpx;
			border-radius: 16rpx;
			font-size: 28rpx;
			color: #333333;
			background-color: #E8E8E8;
		}
		.battle-poprightbtn{
			width: 255rpx;
			height: 88rpx;
			text-align: center;
			line-height: 88rpx;
			border-radius: 16rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			background: linear-gradient(126deg, #4F7EFF 0%, #A34CE8 100%);
		}
	}
</style>