<template>
	<view class="">
		<web-view :src="src" v-if="src" :update-title="false"></web-view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				src:''
			}
		},
		onLoad(data) {
			let url = data.url
			if(url){
				this.src = this.$myAppConfig.baseUrl + '/3d/#/?url='+url
			}
		}
	}
</script>

<style>
</style>