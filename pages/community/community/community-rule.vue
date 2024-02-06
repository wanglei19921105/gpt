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
				
				id:'',
				type:''
			};
		},
		onLoad(data) {
			this.id = data.id
			this.type = data.type
			let title = ''
			if(this.type=='guide')title = '进驻指南'
			else if(this.type=='activity')title = '社区活动'
			else if(this.type=='punish')title = '违规处罚'
			uni.setNavigationBarTitle({
				title
			})
			this.userRule()
		},
		methods: {
			userRule() {
				this.$u.api.districtContent({
					id: this.id,
					type: this.type
				}).then(res => {
					this.content = res.data.info.content
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
