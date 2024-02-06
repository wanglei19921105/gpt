<template>
	<view :class="curScreenStyle==0  ? 'page-white' : 'page-black'">
		<SortPickerList ref="sortPickerList" @clickData="clickData" ></SortPickerList>
	</view>
</template>


<script>
	import SortPickerList from "../../../components/International-sortPickerList/index.vue";
	export default {
		components: {
			SortPickerList
		},
		onReady() {
			var that = this
			that.$refs["sortPickerList"].initPage();
		},
		methods: {
			clickData(data) {
				uni.setStorageSync('areacode',data.value)
				this.$store.commit('setAreacode',data.value)
				uni.navigateBack({
					
				})
			},
		}
	}
</script>

<style>

</style>
