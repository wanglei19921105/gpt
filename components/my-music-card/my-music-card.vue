<template>
	<view 
		class="my-music-card"
		:class="isPlay && 'play'"
		:style="{
			'--size': `${pxSize}px`
		}"
	>
		<view class="my-music-box" @click="isPlay? setMusicPause() : setMusicPlay()">
			<image :src="`/static/images/my-video-card/${themeName}/yybfq.png`" class="my-music-bg"></image>
			<image :src="`/static/images/my-video-card/${themeName}/yybfqt.png`" class="my-music-bg-t" :class="isProgress&&'progress'"></image>
			<view class="my-music-content">
				<image src="/static/images/my-video-card/cp.png" class="my-music-content-bg"></image>
				<image :src="coverUrl" class="my-music-content-cover"></image>
				<image src="/static/images/my-video-card/m_p.png" class="my-music-content-pay-icon"></image>
				<u-loading mode="circle" size="50" v-if="isLoading"></u-loading>
			</view>
		</view>
		<view class="my-music-progres">
			<view class="my-music-progres-box" style="padding: 0;">
				<slider 
					:value="(currentTime / duration) * 100" 
					@change="progresChange"
					@changing="progresChanging"
					activeColor="#007BFF" 
					:backgroundColor="themeName === 'light'? '#ced3df' : '#0a0f17'"
					block-color="#007BFF" 
					block-size="20" 
					class="my-music-progres-slider"
				/>
			</view>
			<view class="my-music-progres-box">
				<text class="my-music-progres-text">{{getCurrentTime}}</text>
				<text class="my-music-progres-text">{{getDuration}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-music-card",
		props: {
			size: {
				type: [String, Number],
				default: 660
			},
			musicUrl: {
				type: String,
				required: true
			},
			coverUrl: {
				type: String
			},
			themeName: {
				type: String,
				default: 'light'
			}
		},
		data() {
			return {
				isPlay: false,
				musicContext: null,
				duration: 0,
				currentTime: 0,
				isSliding: false,
				isLoading: false,
				isProgress: false,
				isProgressTime: 0,
			};
		},
		mounted() {
			this.initAudio()
		},
		beforeDestroy() {
			this.destroyAudio()
		},
		methods: {
			initAudio(){
				this.musicContext = uni.createInnerAudioContext()
				this.musicContext.src = this.musicUrl
				this.musicContext.onPlay(this.musicPlay)
				this.musicContext.onPause(this.musicPause)
				this.musicContext.onError(this.musicError)
				this.musicContext.onWaiting(this.musicWaiting)
				this.musicContext.onTimeUpdate(this.musicTimeUpdate)
				this.musicContext.onCanplay(() => {
					this.duration = this.musicContext.duration
				})
			},
			destroyAudio(){
				this.musicContext.offCanplay()
				this.musicContext.offPlay(this.musicPlay)
				this.musicContext.offPause(this.musicPause)
				this.musicContext.offEnded(this.musicError)
				this.musicContext.offWaiting(this.musicWaiting)
				this.musicContext.offTimeUpdate(this.musicTimeUpdate)
				this.musicContext.destroy()
			},
			musicPlay(){
				this.isPlay = true
				this.isLoading = false
			},
			setMusicPlay(){
				if(this.musicContext !== null){
					this.musicContext.play()
				}
			},
			musicPause(){
				this.isPlay = false
				this.isLoading = false
				this.isProgress = false
			},
			setMusicPause(){
				if(this.musicContext !== null){
					this.musicContext.pause()
				}
			},
			musicTimeUpdate(e){
				if(!this.isSliding){
					if(this.musicContext.currentTime - this.isProgressTime > 1) {
						this.isProgress = !this.isProgress
						this.isProgressTime = this.musicContext.currentTime
					}
					this.currentTime = this.musicContext.currentTime
				}
				this.isLoading = false
			},
			setMusicSeek(time){
				if(this.musicContext !== null && time){
					this.musicContext.seek(time)
					if(this.isSliding) this.isSliding = false
					this.isProgress = false
					this.isProgressTime = 0
					this.setMusicPlay()
				}
			},
			progresChange(e){
				this.setMusicSeek((e.detail.value / 100) * this.duration)
			},
			progresChanging(e){
				this.isSliding = true
			},
			musicWaiting(){
				this.isLoading = true
			},
			musicError(e){
				uni.showToast({
					icon: 'error',
					title: '音频加载失败！'
				})
				console.error(e)
			},
			formatSeconds(seconds) {
			  let secondTime = parseInt(seconds);
			  let minuteTime = 0;
			  let hourTime = 0;
			  if(secondTime > 60) {
			    minuteTime = parseInt(secondTime / 60);
			    secondTime = parseInt(secondTime % 60);
			    if(minuteTime > 60) {
			      hourTime = parseInt(minuteTime / 60);
			      minuteTime = parseInt(minuteTime % 60);
			    }
			  }
				let result = `${parseInt(minuteTime) < 10? '0' + parseInt(minuteTime) : parseInt(minuteTime)}:${parseInt(secondTime) < 10? '0' + parseInt(secondTime) : parseInt(secondTime)}`
				if(hourTime > 0) {
				  result = `${parseInt(hourTime) < 10? '0' + parseInt(hourTime) : parseInt(hourTime)}:${result}`
				}
			  return result;
			}
		},
		computed: {
			pxSize(){
				if(Number(this.size) === NaN){
					console.error('size 为数字类型参数，单位为 rpx');
					return uni.upx2px(600)
				}
				return uni.upx2px(this.size)
			},
			getDuration(){
				return this.formatSeconds(this.duration)
			},
			getCurrentTime(){
				return this.formatSeconds(this.currentTime)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	@keyframes cover-jioapian-Playing-animation {
	  0% {
	    transform: rotate(-1deg);
	  }

	  50% {
	    transform: rotate(1deg);
	  }

	  100% {
	    transform: rotate(-1deg);
	  }
	}
	
	@keyframes cover-Playing-animation {
	  0% {
	    transform: rotate(0deg);
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}
	
.my-music-card{
	width: var(--size);
	height: var(--size);
	display: flex;
	flex-direction: column;
	align-items: center;
	.my-music-box {
		width: calc(var(--size) - 150rpx);
		height: calc(var(--size) - 140rpx);
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.my-music-bg{
			width: calc(var(--size) - 150rpx);
			height: calc(var(--size) - 135rpx);
			position: absolute;
			top: 0;
			left: 0;
		}
		.my-music-bg-t{
			width: calc((var(--size) - 150rpx) / 3);
			height: calc(var(--size) - 135rpx - 40rpx);
			position: absolute;
			top: -5rpx;
			right: -5rpx;
			z-index: 2;
			transition: transform .8s ease-in-out;
			transform-origin: 80rpx 100rpx;
			transform: rotate(0deg);
		}
		.my-music-content{
			width: calc(var(--size) - 150rpx - 160rpx);
			height: calc(var(--size) - 150rpx - 160rpx);
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			.my-music-content-bg {
				width: calc(var(--size) - 150rpx - 160rpx);
				height: calc(var(--size) - 150rpx - 160rpx);
				position: absolute;
				animation: cover-jioapian-Playing-animation 2s linear 0s infinite;
				animation-play-state: paused;
			}
			.my-music-content-cover{
				width: calc(var(--size) - 150rpx - 160rpx - 100rpx);
				height: calc(var(--size) - 150rpx - 160rpx - 100rpx);
				position: absolute;
				border-radius: 50%;
				animation: cover-Playing-animation 30s linear 0s infinite;
				animation-play-state: paused;
			}
			.my-music-content-pay-icon{
				width: 90rpx;
				height: 90rpx;
				position: absolute;
			}
		}
	}
	
	&.play{
		.my-music-box {
			.my-music-bg-t{
				transform: rotate(17deg);
				&.progress {
					transform: rotate(15deg);
				}
			}
			.my-music-content{
				.my-music-content-bg{
					animation-play-state: running;
				}
				.my-music-content-cover{
					animation-play-state: running;
				}
				.my-music-content-pay-icon{
					display: none;
				}
			}
		}
	}
	
	.my-music-progres{
		width: var(--size);
		.my-music-progres-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0rpx 30rpx;
			.my-music-progres-slider{
				width: 100%;
				/deep/ .uni-slider-thumb{
					box-shadow: 0 0 20px #007BFF;
				}
			}
			.my-music-progres-text {
				font-size: 26rpx;
				color: rgb(113, 142, 156);
			}
		}
	}
}
</style>