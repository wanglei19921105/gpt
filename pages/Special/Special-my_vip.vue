<template>
	<view class="page" :class="getThemeClass">
		<view v-for="(item, index) in list" :key="index" class="itemBox" :style="{ backgroundImage: `url(./static/images/my_vip/vip_cardbg${item.level}.png)`,color:cardColors[item.level-1]}" @click="godetail()">
			<!-- 当前等级 -->
			<view class="currentLevel" v-if="item.level == item.vip_level" :style="{backgroundColor:cardBgColors[item.level-1]}">当前等级</view>
			<view class="size-36 u-m-t-35 u-m-b-35 text-bold">{{item.name}}</view>
			<!-- 没有蒙版 -->
			<view class="" v-if="item.status">
				<!-- 1-9 -->
				<view v-if="item.level != 10">
					<!-- 未达成 -->
					<view v-if="!item.level_status">
						<view class="flex justify-between" style="width: 480rpx;">
							<view class="size-18">当前消费金额{{item.current_amount}}，还需{{item.still_need}}可升级</view>
							<text class="size-20">VIP{{item.level + 1}}</text>
						</view>
						<view class="itemBox_progress">
							<u-line-progress :active-color="cardColors[item.level-1]" height=10 :show-percent="false" :percent="item.percentage"></u-line-progress>
						</view>
					</view>
					<!-- 已达成 -->
					<view class="itemBox_progress" v-else>
						<view class="size-20">已达成</view>
						<u-line-progress :active-color="cardColors[item.level-1]" height=10 :show-percent="false" percent="100"></u-line-progress>
					</view>
				</view>
				<!-- 10 -->
				<view class="size-20 u-p-t-20" v-else>
					已达到最高等级
				</view>
			</view>
			<!-- 蒙版-未解锁 -->
			<view class="unlocked_Vip" v-else>
				<view class="Vip_centet">
					<image class="Vip_Lock" src="/static/images/my_vip/unlocked_Vip.png" mode="" />
					<view>待解锁等级</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
			}
		},
		onLoad() {
			this.loadData(true)
		},
		computed: {
			cardColors() { //每个字体颜色
				const colors = [
					'#4C748D',
					'#8D674C',
					'#50719E',
					'#50519E',
					'#304376',
					'#5B6A8C',
					'#836270',
					'#8B6026',
					'#675EB8',
					'#FFFFFF',
				];
				return colors.slice(0, this.list.length); /* 返回与list数组长度相同的颜色数组 */
			},
			cardBgColors(){ //每个背景颜色
				const bgcolors = [
					'#BBDAE7',
					'#E7CCBB',
					'#AEC6DF',
					'#AEB0DF',
					'#BEC6E4',
					'#D1DBE7',
					'#E1CBD6',
					'#F0E3D4',
					'#D4CAED',
					'#3F425D',
				];
				return bgcolors.slice(0,this.list.length);
			}
		},
		methods:{
			loadData(){
				this.$u.api.vip_my_vip({
						page: this.page,
					}).then(res => {
					if (res.code == 200) {
						// this.list = res.data.vip_levels
						const vipLevels = res.data.vip_levels;
						//计算进度条百分比
						vipLevels.forEach(level => {
							const currentAmount = parseFloat(level.current_amount);
							const total = parseFloat(level.total);
							const percentage = (currentAmount / total * 100);
							level.percentage = percentage;
						});
						this.list = vipLevels;
					}
				})
			},
			godetail(id){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.itemBox {
		width: 694rpx;
		height: 260rpx;
		margin: 32rpx 30rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding: 28rpx;
		display: flex;
		flex-direction: column;
		position: relative;
		.currentLevel{
			width: 104rpx;
			height: 42rpx;
			line-height: 42rpx;
			text-align: center;
			font-size: 20rpx;
			border-radius: 23rpx 0rpx 16rpx 0rpx;
			background-color: rgba(187, 218, 231, 0.47);
			position: absolute;
			left: 0;
			top: 0;
		}
		.unlocked_Vip{
			width: 694rpx;
			height: 260rpx;
			background: linear-gradient(117deg, rgba(255,255,255,0.56) 3%, rgba(178,189,209,0.85) 57%);
			border-radius: 24rpx;
			position: absolute;
			top: 0;
			left: 0;
			.Vip_centet{
				display: flex;
				align-items: center;
				margin-left: 30rpx;
				margin-top: 155rpx;
				.Vip_Lock{
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}
			}
		}
		.itemBox_progress{
			width: 480rpx;
		}
	}
</style>