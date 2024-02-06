<template>
	<view class="page" :class="getThemeClass">
		<!-- 实名认证 -->
		<!-- <unavbar :title="i18n.verified1"></unavbar> -->
		<!-- 姓名 -->
		<view class="title">{{i18n.verified2}}</view>
		<!-- 请填写您的真实姓名 -->
		<input class="myinput card-bg" v-model="params.id_name" type="text" :placeholder="i18n.verified3"
			placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" :disabled="check.check === 1" />
		<!-- 身份证号 -->
		<view class="title">{{i18n.verified4}}</view>
		<!-- 请填写您的身份证号 -->
		<input class="myinput card-bg" v-model="params.id_num" type="text" :placeholder="i18n.verified5"
			placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" :disabled="check.check === 1" />
		<!-- 立即认证 -->
		<botBtnp style="margin-top: 200rpx;" :btnText="i18n.verified6" @click="verifiedBtn" v-if="check.check === 0"></botBtnp>
		<!-- <botBtnp style="margin-top: 200rpx;" btnText="已认证" :disabled="1" v-else></botBtnp> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				params: {
					id_name: '',
					id_num: ''
				},
				check: {
					check: 0,
					id_name: null,
					id_num: null
				},
			};
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData(){
				this.$u.api.checkInformation().then(res => {
					// console.log(res);
					this.check = res.data.check
					this.$set(this.params, 'id_name', res.data.check.id_name)
					this.$set(this.params, 'id_num', res.data.check.id_num)
				})
			},
			verifiedBtn() {
				this.$u.api.certification_verification(this.params).then(res => {
					if(res.code==200){
						uni.showToast({
							title:"提交成功",
							icon:"none"
						})
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					}
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	min-height: 100vh;
	// 	background-color: #F9F9F9;
	// }

	// page {
	// 	background-color: #F9F9F9;
	// }

	// .page-black {
	// 	background-color: #1E2020;
	// 	min-height: 100vh;

	// 	.title {
	// 		color: #FFFFFF;
	// 	}

	// 	.myinput {
	// 		background-color: #292B2B;
	// 		color: #FFFFFF;
	// 	}
	// }

	.title {
		margin: 40rpx 0 24rpx 32rpx;
		// color: #333333;
		font-size: 26rpx;
	}

	.myinput {
		margin: 24rpx 30rpx 40rpx;
		// background-color: #fff;
		border-radius: 20rpx;
		height: 100rpx;
		padding-left: 30rpx;
	}

	.input_pla {
		// color: #AAAAAA;
		font-size: 28rpx;
	}
</style>
