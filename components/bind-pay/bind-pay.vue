<template>
	<view class="">
		<!-- 没绑卡 -->
		<uni-popup ref="popup" type="center">
			<view class="bindbox">
				<view class="text-center size-36 text-bold margin-bottom-40">申请绑卡</view>
				<view class="size-26 text-bold margin-bottom-20">银行卡号</view>
				<input type="text" v-model="cardNo" placeholder="请输入银行卡号" placeholder-class="size-26" class="bindinp margin-bottom-20" />
				<view class="size-26 text-bold margin-bottom-20">真实姓名</view>
				<input type="text" v-model="userName" placeholder="请输入姓名" placeholder-class="size-26" class="bindinp margin-bottom-20" />
				<view class="size-26 text-bold margin-bottom-20">银行预留手机号</view>
				<input type="text" v-model="phoneNo" placeholder="请输入手机号" placeholder-class="size-26" class="bindinp margin-bottom-20" />
				<view class="size-26 text-bold margin-bottom-20">身份证号</view>
				<input type="text" v-model="certificateNo" placeholder="请输入身份证号" placeholder-class="size-26" class="bindinp" />
				<view class="bindbtn" @click="apply">申请绑卡</view>
			</view>
		</uni-popup>
		<uni-popup ref="confrim" type="center">
			<view class="bindbox">
				<view class="text-center size-36 text-bold margin-bottom-40">确认绑卡</view>
				<view class="size-26 text-bold margin-bottom-20">银行卡号</view>
				<input type="text" v-model="cardNo" disabled placeholder="请输入银行卡号" placeholder-class="size-26" class="bindinp margin-bottom-20" />
				<view class="size-26 text-bold margin-bottom-20">银行预留手机号</view>
				<input type="text" v-model="phoneNo" disabled placeholder="请输入手机号" placeholder-class="size-26" class="bindinp margin-bottom-20" />
				<view class="size-26 text-bold margin-bottom-20">验证码</view>
				<input type="text" v-model="smsCode" placeholder="请输入验证码" placeholder-class="size-26" class="bindinp" />
				<view class="bindbtn" @click="submit">确认绑卡</view>
			</view>
		</uni-popup>

		<!-- 绑过卡了 -->
		<uni-popup ref="sms" type="center">
			<view class="bindbox">
				<view class="text-center size-36 text-bold margin-bottom-40">支付验证</view>
				<view class="flex justify-between align-center margin-bottom-40">
					<view class="flex align-center">
						<image src="/static/images/bank.png" class="img-48"></image>
						<view class="margin-left-15 size-24">银行卡尾号{{ cardNo }}</view>
					</view>
					<view class="binddel" @click="unbind">
						<text class="cuIcon-repair"></text>
						<text class="margin-left-10">解绑</text>
					</view>
				</view>
				<view class="size-26 text-bold margin-bottom-20">手机号</view>
				<input type="text" v-model="phoneNo" disabled placeholder="请输入绑卡手机号" placeholder-class="size-26" class="bindinp margin-bottom-20" />
				<view class="size-26 text-bold margin-bottom-20">验证码</view>
				<view class="bindinp flex justify-between align-center">
					<input type="text" v-model="smsCode" placeholder="请输入验证码" placeholder-class="size-26" />
					<view class="" @click="sendsms">{{ codetext }}</view>
				</view>

				<view class="bindbtn" @click="pay">确认支付</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	name: 'bindPay',
	data() {
		return {
			cardNo: '',
			userName: '',
			phoneNo: '',
			certificateNo: '',
			sdMsgNo: '',
			smsCode: '',

			codetext: '发送验证码',
			timer: null,
			count: 60,
			flag: true,

			formdata: {},
			api: '',
			type: 1
		};
	},
	methods: {
		pay() {
			if (!this.smsCode) {
				uni.showToast({
					title: '请输入验证码',
					icon: 'none'
				});
				return;
			}
			this.$u.api[this.api]({
				smsCode: this.smsCode,
				...this.formdata
			}).then(res => {
				if (res.data.result.head.respCode == '000000') {
					uni.showToast({
						title: '支付成功'
					});
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/my/pending-payment/pending-payment'
						});
					}, 1500);
				} else {
					uni.showToast({
						title: res.data.result.head.respMsg,
						icon: 'none'
					});
				}
			});
		},
		apply() {
			if (!this.cardNo) {
				uni.showToast({
					title: '请输入银行卡号',
					icon: 'none'
				});
				return;
			}
			if (!this.userName) {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none'
				});
				return;
			}
			if (!this.phoneNo) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
				return;
			}
			if (!this.certificateNo) {
				uni.showToast({
					title: '请输入身份证号',
					icon: 'none'
				});
				return;
			}
			this.$u.api
				.apply_card({
					cardNo: this.cardNo,
					userName: this.userName,
					phoneNo: this.phoneNo,
					certificateNo: this.certificateNo
				})
				.then(
					res => {
						uni.showToast({
							title: '申请成功，验证码已发送',
							icon: 'none'
						});
						this.sdMsgNo = res.data.result.sdMsgNo;
						this.$refs.popup.close();
						this.$refs.confrim.open();
					},
					err => {
						uni.showToast({
							title: '信息错误，请检查后重试！',
							icon: 'none'
						});
					}
				);
		},
		submit() {
			if (!this.cardNo) {
				uni.showToast({
					title: '请输入银行卡号',
					icon: 'none'
				});
				return;
			}
			if (!this.phoneNo) {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none'
				});
				return;
			}
			if (!this.smsCode) {
				uni.showToast({
					title: '请输入验证码',
					icon: 'none'
				});
				return;
			}
			this.$u.api
				.confirm_card({
					cardNo: this.cardNo,
					sdMsgNo: this.sdMsgNo,
					phoneNo: this.phoneNo,
					smsCode: this.smsCode
				})
				.then(res => {
					uni.showToast({
						title: '绑卡成功，请重新发起支付'
					});
					this.$refs.confrim.close();
				});
		},
		openbind() {
			this.sdMsgNo = '';
			this.cardNo = '';
			this.userName = '';
			this.certificateNo = '';
			this.smsCode = '';
			this.phoneNo = '';
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
		openSms(data, api, formdata, type) {
			this.api = api;
			this.formdata = formdata;
			this.smsCode = '';
			this.type = type;
			this.phoneNo = data.phone_no;
			this.cardNo = data.card_no.substr(data.card_no.length - 4);
			this.$refs.sms.open();
		},
		unbind() {
			this.$u.api.unbind_card().then(res => {
				uni.showToast({
					title: '解绑成功，请重新绑卡',
					icon: 'none'
				});
				this.$refs.sms.close();
				this.openbind();
			});
		},
		sendsms() {
			if (this.flag) {
				uni.showLoading();
				this.flag = false;
				this.$u.api
					.sand_sms({
						phoneNo: this.phoneNo,
						order_id: this.formdata.order_id,
						type: this.type
					})
					.then(res => {
						uni.hideLoading();
						uni.showToast({
							title: '发送成功',
							icon: 'none'
						});
						this.settimer();
					});
			}
		},
		settimer() {
			this.timer = setInterval(() => {
				if (this.count == 0) {
					this.flag = true;
					clearInterval(this.timer);
					this.codetext = '获取验证码';
					this.count = 60;
				} else {
					this.count--;
					this.codetext = this.count + '秒后重试';
				}
			}, 1000);
		}
	}
};
</script>

<style lang="scss">
.bindbox {
	width: 600rpx;
	padding: 30rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
}
.bindinp {
	height: 80rpx;
	line-height: 80rpx;
	background-color: #eeeeee;
	border-radius: 15rpx;
	width: 100%;
	padding: 0 15rpx;
	box-sizing: border-box;
}
.bindbtn {
	height: 80rpx;
	border-radius: 15rpx;
	line-height: 80rpx;
	text-align: center;
	color: #ffffff;
	background-color: #f7924c;
	margin-top: 50rpx;
}
.binddel {
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 20rpx;
	border-radius: 15rpx;
	color: #ffffff;
	background-color: #f7924c;
	font-size: 24rpx;
}
</style>
