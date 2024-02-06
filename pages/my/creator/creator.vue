<template>
	<view class="page" :class="getThemeClass">
		<!-- 创作者认证 -->
		<!-- <unavbar :title="i18n.creator1"></unavbar> -->
		<!-- 作者昵称 -->
		<view class="title">{{i18n.creator2}}</view>
		<!-- 请输入您的昵称 -->
		<input class="myinput card-bg" type="text" v-model="params.nickname" :placeholder="info?info.nickname:i18n.creator2"
			placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"  :disabled="Boolean(info)" />
		<!-- 链接到您的艺术家网站/作品集 -->
		<view class="title">{{i18n.creator3}} </view>
		<!-- 请输入您的网站链接 -->
		<input class="myinput card-bg" type="text" v-model="params.homepage" :placeholder="info?info.homepage:i18n.creator4"
			placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"  :disabled="Boolean(info)" />
		<!-- 电子邮箱 -->
		<view class="title">{{i18n.creator5}}</view>
		<!-- 请输入您的电子邮箱 -->
		<input class="myinput card-bg" type="text" v-model="params.email" :placeholder="info?info.email:i18n.creator6"
			placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"  :disabled="Boolean(info)" />
		<!-- 个人简介 -->
		<!-- <view class="title">{{i18n.creator7}}</view> -->
		<!-- <view class="title">艺术家简介</view>
		<view class="textarea_box card-bg">
			<textarea class="mytextarea" v-model="params.introduction"
				:placeholder="(Boolean(info) && !!info.introduction)?info.introduction:i18n.creator8+'100'+i18n.creator9" placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" 
				maxlength="-1" minlength="100" :auto-height="true" :disabled="(Boolean(info) && !!info.introduction) && !isChange" />
			<view class="u-m-b-30 u-flex justify-end">
				<text class="u-font-24 text-tips">{{ params.introduction.length }}/800</text>
			</view>
		</view> -->
		
		<view class="title text-bold color-red" v-if="refuse && certification === 3">
			<text>* 拒绝原因：{{ refuse }}</text>
		</view>
		<!-- <view class="title u-m-t-10">
			<text></text>
		</view> -->
		<!-- 提交 -->
		<!-- <botBtnp style="margin: 300rpx 0 30rpx;" :btnText="certification==0?'提交':'审核中'||" :disabled="certification" @click.native="submit">
		</botBtnp> -->
		<botBtnp style="margin: 300rpx 0 30rpx;"
			v-if="certification === 2 && isChange"
			btnText="提交修改"
			@click="change">
		</botBtnp>
		<!-- <botBtnp style="margin: 300rpx 0 30rpx;"
			v-if="certification === 2 && !isChange"
			btnText="修改简介"
			@click="changeIsChange">
		</botBtnp> -->
		<!-- 10提交11审核中12重新提交 -->
		<botBtnp style="margin: 300rpx 0 30rpx;"
			:btnText="certification==0?i18n.creator10:''||certification==1?i18n.creator11:''||certification==3?i18n.creator12:''"
			v-if="certification !== 2"
			:disabled="certification" @click="submit">
		</botBtnp>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					nickname: '',
					homepage: '',
					email: '',
					// introduction: ''
				},
				certification: 0, //作者认证0未申请1待认证2已认证3已拒绝
				show: false,
				info: {},
				refuse: '',
				isChange: false,
			};
		},
		onShow() {
			this.authorIndex()
		},
		methods: {
			authorIndex() {
				this.isChange = false
				this.$u.api.author_index().then(res => {
					if (res.data.author_auth == 0) {
						this.certification = 0
						this.info = null
						return
					}
					if (res.data.author_auth == 1) {
						this.certification = 1
						this.info = res.data.log
						return
					}
					if (res.data.author_auth == 2) {
						this.certification = 2
						this.info = res.data.log
						return
					}
					if (res.data.author_auth === 3 && res.data.log.type === 0) {
						this.certification = 3
						this.info = null
						this.refuse = res.data.log.refuse
						return
					}
					if (res.data.author_auth === 3 && res.data.log.type === 1) {
						this.certification = 3
						this.info = res.data.log
						this.params = res.data.log 
						this.refuse = res.data.log.refuse
						// this.changeIsChange()
						// this.$set(this.params, 'introduction', '')
						return
					}
				}).catch(err => {})
			},
			submit() {
				if (this.certification == 0 || this.certification == 3) {
					if (!this.params.nickname) {
						this.$refs.uToast.show({
							// 请填写作者昵称
							title: this.i18n.creator13,
							type: 'error'
						});
						return false;
					}
					if (!this.params.homepage) {
						this.$refs.uToast.show({
							// 请填写网站链接
							title: this.i18n.creator14,
							type: 'error'
						});
						return false;
					}
					if (!this.params.email) {
						this.$refs.uToast.show({
							// 请填写电子邮箱
							title: this.i18n.creator15,
							type: 'error'
						});
						return false;
					}
					// if (!this.params.introduction) {
					// 	this.$refs.uToast.show({
					// 		// 请填写个人简介
					// 		title: this.i18n.creator16,
					// 		type: 'error'
					// 	});
					// 	return false;
					// }
					// if (this.params.introduction.length < 100) {
					// 	this.$refs.uToast.show({
					// 		// 个人简介不少于100字
					// 		title: this.i18n.creator17,
					// 		type: 'error'
					// 	});
					// 	return false;
					// }
					this.$u.api.author_apply(this.params).then(res => {
						if (res.code == 200) {
							this.$refs.uToast.show({
								// 提交成功
								title: this.i18n.creator18,
								type: 'success'
							});
							this.authorIndex()
						}
					}).catch(err => {})
				}
			},
			change() {
				if (this.certification === 2) {
					// if (!this.params.nickname) {
					// 	this.$refs.uToast.show({
					// 		// 请填写作者昵称
					// 		title: this.i18n.creator13,
					// 		type: 'error'
					// 	});
					// 	return false;
					// }
					// if (!this.params.homepage) {
					// 	this.$refs.uToast.show({
					// 		// 请填写网站链接
					// 		title: this.i18n.creator14,
					// 		type: 'error'
					// 	});
					// 	return false;
					// }
					// if (!this.params.email) {
					// 	this.$refs.uToast.show({
					// 		// 请填写电子邮箱
					// 		title: this.i18n.creator15,
					// 		type: 'error'
					// 	});
					// 	return false;
					// }
					// if (!this.params.introduction) {
					// 	this.$refs.uToast.show({
					// 		// 请填写个人简介
					// 		title: this.i18n.creator16,
					// 		type: 'error'
					// 	});
					// 	return false;
					// }
					// if (this.params.introduction.length < 100) {
					// 	this.$refs.uToast.show({
					// 		// 个人简介不少于100字
					// 		title: this.i18n.creator17,
					// 		type: 'error'
					// 	});
					// 	return false;
					// }
					this.$u.api.biography(this.params).then(res => {
						if (res.code == 200) {
							this.$refs.uToast.show({
								// 提交成功
								title: this.i18n.creator18,
								type: 'success'
							});
							this.authorIndex()
						}
					}).catch(err => {})
				}
			},
			// changeIsChange(){
			// 	this.isChange = true
			// 	this.$set(this.params, 'introduction', this.info.introduction)
			// 	this.$set(this.info, 'introduction', '')
			// }
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	min-height: 100vh;
	// 	background-color: #F9F9F9;
	// }

	// .page-black {
	// 	background-color: #1E2020;
	// 	overflow: hidden;

	// 	.myinput,
	// 	.mytextarea {
	// 		background-color: #292B2B;
	// 		color: #FFFFFF;
	// 	}

	// 	.title {
	// 		color: #FFFFFF;
	// 	}

	// 	.textarea_box {
	// 		background-color: #292B2B;
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

	.textarea_box {
		margin: 24rpx 30rpx 40rpx;
		overflow: hidden;
		padding: 0 30rpx;
		// background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.mytextarea {
		padding-top: 32rpx;
		min-height: 226rpx;
		// background-color: #fff;
		width: 100%;
	}
</style>
