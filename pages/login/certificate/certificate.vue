<template>
	<view class="page" :class="getThemeClass">
		<!-- 隐私政策 -->
		<!-- <unavbar :title="i18n.privacypolicy1"></unavbar> -->
		<!-- <view class="line"></view> -->
		<!-- <view class="u-p-30" v-html="content"></view> -->
		<u-parse class="u-p-30 text-main" :html="content" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
			};
		},
		onShow() {
			this.userRule()
		},
		methods: {
			userRule() {
				this.$u.api.user_rule({
					type: 4
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
