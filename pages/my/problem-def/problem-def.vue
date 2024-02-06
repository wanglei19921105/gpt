<template>
	<view class="page" :class="getThemeClass">
		<!-- 问题详情 -->
		<!-- <unavbar :title="i18n.questiondet1"></unavbar> -->
		<!-- <view class="line"></view> -->
		<!-- <view v-html="con.title" class="title"></view> -->
		<u-parse class="title" :html="con.title" />
		<!-- <view v-html="con.content" class="content"></view> -->
		<u-parse class="content" :html="con.content" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				con: '',
				id: ''
			};
		},
		onLoad(options) {
			if(options.id){
				this.id = Number(options.id)
			}
			this.getDetail()
		},
		methods: {
			getDetail() {
				this.$u.api.question_detail({
					'id': this.id
				}).then(res => {
					if (res.code == 200) {
						this.con = res.data.detail
					}
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	min-height: 100vh;
	// }

	// .page-black {
	// 	background-color: #1E2020;

	// 	.line {
	// 		background-color: #292B2B;
	// 	}

	// 	.content {
	// 		color: #CCCCCC;
	// 	}
	// }

	.line {
		height: 20rpx;
		// background-color: #F6F6F6;
	}

	.title {
		margin: 30rpx;
		text-align: center;
		font-weight: bold;
		font-size: 30rpx;
	}

	.content {
		margin: 30rpx;
	}
</style>
