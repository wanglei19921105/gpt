<template>
	<view>
		<view :style="{'height':soundState?'':0}" class="mark"></view>
		<view @touchmove="touchmove" @touchstart="soundStart" @touchend="soundEnd" @touchcancel="soundEnd"
			class="sound-buttom" :class="{soundState}">
			<view v-if="soundProgress" class="sound-progress" :style="{'width':soundProgress}"></view>
			<text class="sound-text">{{soundState?'录音中（'+time+'s）':'按住 说话'}}</text>
			<view class="sound-tip" v-if="soundState">
				<text class="sound-tip-text" :style="{color:cancel?'#f70000':'#FFFFFF'}">{{cancel?'松手取消':'松手发送，上划取消'}}</text>
				<view class="closeIcon" :style="{'backgroundColor':cancel?'#f70000':'EEEEEE'}">
					<uni-im-icons code="e61a" size="10px" color="#FFFFFF"></uni-im-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifndef H5
	const recorderManager = uni.getRecorderManager();
	// #endif
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	
	let soundInterval,soundPath,startTime;
	const windowInfo = uni.getWindowInfo()
	export default {
		emits: ['success'],
		data() {
			return {
				soundState:0,
				soundProgress:0,
				cancel:false,
				time:0
			}
		},
		computed:{
		},
		created() {
			// #ifndef H5
			recorderManager.onStop((res)=> {
				console.log('recorderManager.onStop',{res});
				if(!this.cancel){
					if(this.time < 2){
						return uni.showToast({
							title: '语音时间过短',
							icon: 'none'
						});
					}
					uni.showLoading({
						title: '上传中',
						mask: false
					});
					uniCloud.uploadFile({
						filePath:res.tempFilePath,
						cloudPath:'uni-im/' + uniCloud.getCurrentUserInfo().uid + '/sound/' + Date.now(),
						success: (e) => {
							console.log('uniCloud.uploadFile-success',e,'success',{"url":e.fileID,time:this.time});
							try{
								this.$emit('success',{"url":e.fileID,time:this.time})
							}catch(e){
								console.log(e);
								//TODO handle the exception
							}
							uni.hideLoading()
						},
						fail: (e) =>{
							console.log(e);
							uni.showModal({
								content: JSON.stringify(e),
								showCancel: false,
								confirmText: '知道了'
							});
						},
						complete: (e) =>{
							console.log('complete',e);
							uni.hideLoading()
						}
					})
				}else{
					console.log('用户取消了录音功能','this.time:'+this.time);
				}
			});
			// #endif
		},
		methods: {
			touchmove(e){
				let y = (e.touches[0].screenY - windowInfo.screenTop) || e.touches[0].clientY
				if(windowInfo.windowHeight - y > 50){
					this.cancel = true
				}else{
					this.cancel = false
				}
			},
			soundStart(e){
				// 关闭正在播放的sound
				// getApp().globalData.audioContext.stop()
				
				// #ifdef H5
				// 防止H5端 调试出现鼠标右键菜单
				window.oncontextmenu = function () { return false; }
				// #endif
				
				// #ifdef H5
				return uni.showToast({
					title: 'h5端不支持语音功能',
					icon: 'none'
				});
				// #endif
				recorderManager.start({
					sampleRate:16000,
					numberOfChannels:2,
					format:"mp3"
				});
				startTime = Date.now()
				
				// console.log('soundStart');
			
				//进度条
				this.soundState = 1
				soundInterval = setInterval(()=>{
					this.soundProgress = parseInt(this.soundProgress) + uni.upx2px(450/60) +'px'
					// console.log('this.soundProgress',this.soundProgress);
					this.time = parseInt((Date.now() - startTime) / 1000)
				},1000)
				// e.preventDefault();
			},
			soundEnd(){
				// #ifdef H5
				return
				// #endif
				recorderManager.stop();
				// console.log('soundEnd');
				clearInterval(soundInterval)
				setTimeout(()=> {
					this.soundState = 0
					this.soundProgress = 0
					this.cancel = false
				}, 300);
			}
		}
	}
</script>

<style lang="scss">
	.sound-buttom {
		background-color: #ffffff;
		padding: 10px;
		width: 450rpx;
		height: 46px;
		// border-radius: 10px;
		font-size: 16px;
		align-items: flex-start;
		justify-content: center;
		/* #ifndef APP-NVUE */
		overflow:hidden;
		/* #endif */
	}
	.sound-text{
		position: relative;
		left: -20rpx;
		width: 450rpx;
		font-size: 14px;
		text-align: center;
	}
	.sound-tip{
		position: fixed;
		left: 0;
		bottom: 80px;
		width: 750rpx;
		text-align: center;
		justify-content: center;
		align-items: center;
	}
	.sound-tip-text{
		margin-bottom: 10px;
		color: #999999;
		font-size: 14px;
	}
	.closeIcon{
		width: 30px;
		height: 30px;
		background-color: #DDDDDD;
		border-radius: 100px;
		justify-content: center;
		align-items: center;
	}
	.sound-progress {
		// border-radius: 10px;
		height: 44px;
		position: absolute;
		left: 0;
		top: 0;
		padding: 0;
		transition: width 0.2s linear;
		background-color: #2faf4c;
		opacity: 0.3;
	}
	
	.soundState{
		background-color: #efefef;
	}
	
	.mark{
		width: 750rpx;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 57px;
		right: 0;
		background:rgba(0,0,0,0.7);
		flex: 1;
	}
</style>
