<template>
	<view class="page">
		<view class="top">
			<u-icon name="arrow-left" color="#514F4F" size="38" @click="fanh"></u-icon>
		</view>
		<view class="img">
			<image v-if="text.length>0" :src="text[selectIndex].cover" mode=""></image>
			<view class="null" v-else>
				没有藏品
			</view>
		</view>
		<view class="list">
			<view class="" v-for="(item,index) in text" @click="retrieve(index)">
				<image :src="item.cover" mode=""></image>
				<view class="">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="button">
			<view class="shanchu" @click="shanchu">
				<u-icon name="trash" color="#44557A" size="38"></u-icon>
			</view>
			<view class="tianjia" @click="tianjia">
				添加藏品
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: [],
				text: [],
				obj: [],
				selectIndex: 0
			}
		},
		onShow() {
			this.shuju()
		},
		onLoad(option) {

			this.obj = JSON.parse(decodeURIComponent(option.booth))
			console.log(this.obj);
			this.shuju()

		},
		methods: {
			shuju() {
				this.$u.api.preList({
					star_id: this.obj.star_id, //星球id
					floor: this.obj.floor, //层数
					room: this.obj.room
				}).then(res => {
					this.text = res.data.list
					// this.img=res.data.list.0.cover
					console.log(res);
				})
			},
			shanchu() { //删除
				this.$u.api.delPre({
					pre_id: this.text[this.selectIndex].id
				}).then(res => {
					uni.showToast({
						title: '移除展厅成功',
						icon: 'none',
						duration: 2000
					});
					this.text = []
					this.shuju()
					console.log(res);
				})
			},
			retrieve(index) { //点击图片
				this.selectIndex = index
				// this.img=id.cover
			},
			fanh() {
				uni.navigateBack()
			},
			tianjia() {
				// this.$u.api.addPre({}).then(res => {
				// 	console.log(res);
				// })
				uni.navigateTo({
					url: "../../../pages/my/collections/collections-detail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.null {
		color: #44557A;
		font-size: 40rpx;
	}

	.list {
		position: absolute;
		top: 70%;
		height: 220rpx;
		width: 750rpx;
		display: flex;
		overflow-x: scroll;
		/* 水平方向滚动 */

		>view {
			margin-left: 40rpx;
			width: 160rpx;
			height: 220rpx;
			background: url('../../../static/images/2.png');
			border-radius: 16rpx;
			color: #44557A;

			>image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 16rpx;
			}

			>view {
				margin-left: 5rpx;
				width: 150rpx;
				 overflow: hidden;
				white-space: nowrap;
				/* 文本不换行 */
				text-overflow: ellipsis;
				/* 文本溢出时显示省略号 */
			}
		}
	}

	.button {
		position: absolute;
		top: 90%;
		display: flex;
		width: 750rpx;
		justify-content: space-between;

		>view {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.shanchu {
			margin-left: 50rpx;
			width: 110rpx;
			height: 110rpx;
			background: #D4D7DF;
			box-shadow: 2rpx 5rpx 8rpx 1rpx rgba(0, 0, 0, 0.1);
			border-radius: 55rpx 55rpx 55rpx 55rpx;
			opacity: 1;
		}

		.tianjia {
			margin-right: 50rpx;
			width: 480rpx;
			height: 110rpx;
			background: #D4D7DF;
			box-shadow: 2rpx 5rpx 8rpx 1rpx rgba(0, 0, 0, 0.1);
			border-radius: 62rpx 62rpx 62rpx 62rpx;
			opacity: 1;
			font-size: 34rpx;
			font-weight: 500;
			color: #44557A;
			line-height: 116rpx;
		}
	}

	.page {
		position: relative;
		width: 750rpx;
		height: 100vh;
		text-align: center;
		background: url("../../../static/images/zhantai.png");
		background-repeat: no-repeat;
		/* 防止背景出现重复 */
		background-size: cover;
		/* 将背景图片铺满整个背景区域 */
	}

	.top {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
	}

	.img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -100%);
		width: 448rpx;
		height: 448rpx;
		background: linear-gradient(180deg, #B3C2CC 0%, #DDDFE1 100%);
		opacity: 1;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 97%;
			height: 97%;
			border-radius: 30rpx;

		}
	}
</style>