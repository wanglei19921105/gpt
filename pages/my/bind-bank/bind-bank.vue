<template>
	<view class="page" :class="getThemeClass">
		<!-- 支付宝绑定 -->
		<!-- <unavbar title="银行卡绑定"></unavbar> -->
		<view class="title">开户银行</view>
		<input class="myinput card-bg" type="text" v-model="params.bank_name" placeholder="请输入您的银行名称" placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" />
		<view class="title">开户行地址</view>
		<input class="myinput card-bg" type="text" v-model="params.bank_address" placeholder="请输入您的开户行地址" placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"  />
		<view class="title">银行卡号</view>
		<input class="myinput card-bg" type="text" v-model="params.bank_account" placeholder="请输入您的银行卡号" placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"  />
		<view class="title">真实姓名</view>
		<input class="myinput card-bg" type="text" v-model="params.name" placeholder="请输入您的真实姓名" placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" />
		<botBtnp style="margin-top:200rpx;" :btnText="status?'确认修改':'立即绑定'" @click.native="bind"></botBtnp>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			params: {
				bank_name: '',
				bank_address:'',
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
							let info = res.data.info
							this.params.bank_name = info.bank_name
							this.params.bank_address = info.bank_address
							this.params.bank_account = info.bank_account || info.account
							this.params.name = info.name
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
			if (!this.params.bank_name) {
				this.$refs.uToast.show({
					title: '请输入您的开户银行名称',
					type: 'error'
				});
				return false;
			}
			// if (!this.params.bank_address) {
			// 	this.$refs.uToast.show({
			// 		title: '请输入您的开户行地址',
			// 		type: 'error'
			// 	});
			// 	return false;
			// }
			if (!this.params.bank_account) {
				this.$refs.uToast.show({
					// 请输入您的支付宝账号
					title: '请输入您的银行卡号',
					type: 'error'
				});
				return false;
			}
			if (!this.params.name) {
				this.$refs.uToast.show({
					// 请输入您的支付宝账号
					title: '请输入您的真实姓名',
					type: 'error'
				});
				return false;
			}
			this.$u.api
				.bind_draw({...this.params, account: this.params.bank_account})
				.then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							// 绑定成功
							title: this.status? '修改成功' : this.i18n.alipay8,
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
.title {
	margin: 40rpx 0 24rpx 32rpx;
	font-size: 26rpx;
}

.myinput {
	margin: 24rpx 30rpx 40rpx;
	border-radius: 20rpx;
	height: 100rpx;
	padding-left: 30rpx;
}

.input_pla {
	font-size: 28rpx;
}
</style>
