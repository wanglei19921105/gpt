<template>
	<view class="">
		<uni-popup ref="popup" type="bottom">
			<view class="battle-botpopup flex flex-direction justify-between align-center" v-if="status==0">
				<view class="text-center">
					<view class="battle-poptitle">邀请队友</view>
					<input type="number" maxlength="11" v-model="mobile" class="battle-inp" placeholder="请输入对手账号"
						placeholder-class="battle-plac" />
					<view class="battle-popcontent">提示：邀请后，如果对方未响应，则不创建</view>
				</view>
				<view class="flex justify-between align-center">
					<view class="battle-popleftbtn u-m-r-24 move-btn" @click="cancel">我再想想</view>
					<view class="battle-poprightbtn move-btn" @click="repeatClick(invite)">确定邀请</view>
				</view>
			</view>

			<view class="battle-botpopup flex flex-direction justify-between align-center" v-if="status==1">
				<view class="text-center">
					<view class="battle-poptitle">等待对方接受中...</view>
					<view class="battle-inp">{{mobile}}</view>
					<view class="battle-popcontent">提示：邀请后，如果对方未响应，则不创建</view>
				</view>
				<view class="battle-timer" @click="repeatClick(cancelBattle)">取消邀请对战</view>
			</view>

			<view class="battle-botpopup flex flex-direction justify-between align-center" v-if="status==2">
				<view class="text-center">
					<view class="battle-poptitle">对方已拒绝</view>
					<view class="battle-inp">{{mobile}}</view>
					<view class="battle-popcontent">提示：邀请后，如果对方未响应，则不创建</view>
				</view>
				<view class="flex justify-between align-center">
					<view class="battle-popleftbtn u-m-r-24 move-btn" @click="repeatClick(cancelBattle)">取消邀请对战</view>
					<view class="battle-poprightbtn move-btn" @click="repeatClick(reinvite)">重新邀请</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	/**
	 * @description 对战专区对话弹窗
	 * @param {String||Number} radius 状态：0.未邀请 1.等待对方接受 2.对方拒绝
	 */
	export default {
		name: "battleInvite",
		props: {
			type: {
				type: [Number, String],
				default: 0
			},
			phone: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				status: 0,
				mobile: '',
				timerTxt: '倒计时：60s',
				timer: null,
				count: 60,
				timerFlag: true
			}
		},
		watch: {
			type(newVal, oldVal) {
				this.status = newVal
				const phone = this.phone
				if (this.status > 0 && phone) this.mobile = phone
			}
		},
		methods: {
			cancel() {
				setTimeout(() => {
					this.hide()
					this.$emit('cancel')
				}, 300)
			},
			invite() {
				if (!this.mobile) return this.toast('请输入对手账号')
				this.$u.api.battle_invite({
					phone: this.mobile
				}).then(res => {
					this.status = 1
					// this.timer = setInterval(() => {
					// 	if (this.count == 0) {
					// 		clearInterval(this.timer);
					// 		this.timer = null
					// 		this.count = 60;
					// 		this.status = 2
					// 	} else {
					// 		this.count--;
					// 	}
					// 	this.timerTxt = `倒计时：${this.count}s`;
					// }, 1000);
				})
			},
			// 对方长时间无响应，自己主动取消邀请对战
			cancelBattle() {
				uni.showModal({
					title: '提示',
					content: '确定要取消邀请对战吗？',
					success: data => {
						if (data.confirm) {
							this.$u.api.battle_cancelInvite().then(res => {
								uni.showToast({
									title:"邀请对战已取消",
									icon:"none"
								})
								this.init()
								this.$emit('restart')
							})
						}
					}
				});
			},
			// 对方拒绝邀请后，发起再次邀请
			reinvite(){
				this.$u.api.battle_againInvite().then(res => {
					this.status = 1
					this.$emit('restart')
				})
			},
			init() {
				this.hide()
				this.status = 0
				this.mobile = ''
			},
			show() {
				this.$refs.popup.open()
			},
			hide() {
				this.$refs.popup.close()
			},
		}
	}
</script>

<style lang="scss">
	.battle-botpopup {
		width: 750rpx;
		height: 676rpx;
		background-image: url("@/static/images/battle/battle-botpop.png");
		background-size: 100% 100%;
		padding: 50rpx;

		.battle-poptitle {
			font-size: 40rpx;
			font-weight: bold;
			color: #3d3d3d;
			margin-top: 36rpx;
		}

		.battle-inp {
			width: 640rpx;
			font-size: 30rpx;
			height: 100rpx;
			border-radius: 20rpx;
			background-color: #F1F1F1;
			text-align: center;
			line-height: 100rpx;
			padding: 0 20rpx;
			margin-top: 50rpx;
		}

		.battle-plac {
			font-size: 30rpx;
			color: #C4C4C5;
		}

		.battle-popcontent {
			font-size: 26rpx;
			color: #3d3d3d;
			margin-top: 36rpx;
			text-align: center;
			margin-bottom: 50rpx;
		}

		.battle-popleftbtn {
			width: 255rpx;
			height: 88rpx;
			text-align: center;
			line-height: 88rpx;
			border-radius: 16rpx;
			font-size: 28rpx;
			color: #333333;
			background-color: #E8E8E8;
		}

		.battle-poprightbtn {
			width: 255rpx;
			height: 88rpx;
			text-align: center;
			line-height: 88rpx;
			border-radius: 16rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			background: linear-gradient(126deg, #4F7EFF 0%, #A34CE8 100%);
		}

		.battle-timer {
			width: 528rpx;
			height: 88rpx;
			text-align: center;
			line-height: 88rpx;
			border-radius: 16rpx;
			background-color: #e8e8e8;
			font-size: 28rpx;
			color: #333333;
		}
	}
</style>
