<template>
	<view class="page" :class="getThemeClass">
		<!-- 用户协议 -->
		<!-- <unavbar :title="i18n.useragreement1"></unavbar> -->
		<!-- <view class="line"></view> -->
		<!-- <view class="u-p-30" v-html="content" ></view> -->
		<u-parse class="u-p-30 text-main" :html="content" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				value: '',
			};
		},
		onShow() {
			this.userRule()
		},
		methods: {
			userRule() {
				this.$u.api.user_rule({
					type: 1
				}).then(res => {
					this.content = res.data.text.content
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.line {
		height: 20rpx;
		// background-color: #F9F9F9;
	}
</style>
