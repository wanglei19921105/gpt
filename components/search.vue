<template>
	<view class="box">
		<u-search class="u_search" :placeholder="placeholder" v-model="keyword" height="80"
			:bg-color="curScreenStyle?'#303131':'#fff'" placeholder-color="#AAAAAA"
			:color="curScreenStyle?'#AAAAAA':'#333'" :show-action="false"></u-search>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: {
				type: String,
				default: () => {
					return ''
				}
			}
		},
		name: "search",
		data() {
			return {
				keyword: '',
			};
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 100%;
	}

	.u_search {
		width: 100% !important;
		padding: 0 32rpx;
	}
</style>
