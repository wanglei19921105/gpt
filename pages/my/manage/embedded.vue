<template>
	<view class="page">
		<view class="statusbar"></view>
		<web-view v-if="urlshand" :webview-styles="webviewStyles" :src="urlshand"></web-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urlfee:'',
				urlshand:'',
				webviewStyles: {
					progress: {
					}
				},
			};
		},
		onLoad(options) {
			this.urlshand = options.urlshand
			// console.log(this.urlshand,'urlshand之后的');
		},
		methods:{

		}
	}
</script>

<style lang="scss" scoped>
	.statusbar{
		width: 100%;
		height: var(--status-bar-height);
	}
</style>
