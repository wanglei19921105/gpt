<template>
	<view 
		class="my-video-card"
		:style="{
			'--size': `${pxSize}px`
		}"
	>
		<video 
			id="myVideo"
			class="my-video"
			:src="videoUrl"
			:poster="coverUrl"
			:poster-for-crawler="coverUrl"
			:title="videoTitle"
			@play="videoPlay"
			@pause="videoPause"
			@ended="videoEnded"
		  @error="videoError"
			@touchstart="contentDbclick"
			@tap="contentClick"
			@touchmove="contentMove"
			enable-danmu
			enable-play-gesture
			vslide-gesture
			vslide-gesture-in-fullscreen
		></video>

	</view>
</template>

<script>
	export default {
		name:"my-video-card",
		props: {
			size: {
				type: [String, Number],
				default: 660
			},
			videoUrl: {
				type: String,
				required: true
			},
			videoTitle: {
				type: String
			},
			coverUrl: {
				type: String
			}
		},
		data() {
			return {
				double: false,
				isPlay: false,
				isEnded: false,
				videoContext: null,
				h5ShowControlsTime: null,
			};
		},
		mounted() {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			videoPlay(){
				this.isPlay = true
				this.isEnded = false
			},
			setVideoPlay(){
				if(this.videoContext !== null){
					this.videoContext.play()
				}
			},
			videoPause(){
				this.isPlay = false
			},
			setVideoPause(){
				if(this.videoContext !== null){
					this.videoContext.pause()
				}
			},
			videoEnded(){
				this.isEnded = true
				this.resetVideo()
			},
			setVideoStop(){
				if(this.videoContext !== null){
					this.videoContext.stop()
				}
			},
			resetVideo(){
				if(this.videoContext !== null){
					this.videoContext.seek(0)
				}
			},
			videoError(e){
				uni.showToast({
					icon: 'error',
					title: '视频加载失败！'
				})
				console.error(e)
			},
			contentClick(){
				
			},
			contentDbclick(e) {
				if (!this.double) {
					this.double = true;
					let timer = setTimeout(() => {
						this.double = false;
						clearTimeout(timer);
					}, 300);
				} else {
					// #ifdef H5
					if(this.isPlay){
						this.setVideoPause()
					} else {
						this.setVideoPlay()
					}
					// #endif
				}
			},
			contentMove(e){
				
			}
		},
		computed: {
			pxSize(){
				// if(Number(this.size))
				if(Number(this.size) === NaN){
					console.error('size 为数字类型参数，单位为 rpx');
					return uni.upx2px(600)
				}
				return uni.upx2px(this.size)
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-video-card{
	.my-video{
		width: var(--size);
		height: var(--size);
		border-radius: 10rpx;
	}
}
</style>