<template>
	<view>
		<web-view :src="exhibitionUrl" 
		:update-title="false"
			:webview-styles="{
				progress: {
					color: getMainColor
				}
			}"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				exhibitionUrl: '',
			};
		},
		onLoad() {
			this.getUserinfo()
		},
		methods:{
			getUserinfo() {
				this.$u.api.openaiRegister().then(res => {
					if (res.code == 200) {
						this.exhibitionUrl = res.data.baseUrl
					}
				}).catch(err => {
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
