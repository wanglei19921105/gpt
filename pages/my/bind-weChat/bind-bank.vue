<template>
	<!-- 绑定银行卡 - 已弃用 -->
	<view class="box" :class="curScreenStyle ? 'page-black' : 'page-white'">
		<!-- 支付宝绑定 -->
		<unavbar title="银行卡绑定"></unavbar>
		<!-- 姓名 -->
		<view class="title">开户行</view>
		<!-- 请输入您的开户行 -->
		<input class="myinput" type="text" v-model="params.bank_name" placeholder="请输入您的开户行" placeholder-class="input_pla" :disabled="status" />
		<!-- 支付宝账号 -->
		<view class="title">银行卡号</view>
		<!-- 请输入您的银行卡号 -->
		<input class="myinput" type="text" v-model="params.bank_account" placeholder="请输入您的银行卡号" placeholder-class="input_pla" :disabled="status" />
		<view class="title">真实姓名</view>
		<!-- 请输入您的真实姓名 -->
		<input class="myinput" type="text" v-model="params.name" placeholder="请输入您的真实姓名" placeholder-class="input_pla" :disabled="status" />
		<!-- 修改账户:立即绑定 -->
		<botBtnp style="margin-top:200rpx;" btnText="立即绑定" @click.native="bind"></botBtnp>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			params: {
				bank_name: '',
				bank_account: '',
				type: '3', //1微信2支付宝
				name: ''
			},
			draw: {},
			status: true
		};
	},
	onShow() {
		this.getDrawinfo();
	},
	methods: {
		getDrawinfo() {
			this.$u.api
				.draw_info({
					type: 3
				})
				.then(res => {
					if (res.code == 200) {
						if (res.data.info) {
							this.draw = res.data.info;
							this.status = true;
						} else {
							this.status = false;
						}
					}
				})
				.catch(err => {});
		},
		bind() {
			if (this.status) {
				this.status = false;
				return false;
			}
			if (!this.params.bank_name) {
				this.$refs.uToast.show({
					title: '请输入您的开户行',
					type: 'error'
				});
				return false;
			}
			if (!this.params.bank_account) {
				this.$refs.uToast.show({
					title: '请输入您的银行卡号',
					type: 'error'
				});
				return false;
			}
			if (!this.params.name) {
				this.$refs.uToast.show({
					title: '请输入您的真实姓名',
					type: 'error'
				});
				return false;
			}
			this.$u.api
				.bind_draw(this.params)
				.then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							// 绑定成功
							title: this.i18n.alipay8,
							type: 'success'
						});
						setTimeout(()=>{
							uni.navigateBack()
						},1500)
					}
				})
				.catch(err => {});
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	min-height: 100vh;
	background-color: #f9f9f9;
}

page {
	background-color: #f9f9f9;
}

.page-black {
	background-color: #1e2020;

	.myinput {
		background-color: #292b2b;
		color: #FFFFFF;
	}

	.title {
		color: #ffffff;
	}
}

.title {
	margin: 40rpx 0 24rpx 32rpx;
	color: #333333;
	font-size: 26rpx;
}

.myinput {
	margin: 24rpx 30rpx 40rpx;
	background-color: #fff;
	border-radius: 20rpx;
	height: 100rpx;
	padding-left: 30rpx;
}

.input_pla {
	color: #aaaaaa;
	font-size: 28rpx;
}
</style>
