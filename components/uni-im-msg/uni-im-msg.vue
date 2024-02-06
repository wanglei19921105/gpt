<template>
	<view class="msg-box" :class="{self}">
		<cloud-image width="80rpx" height="80rpx" borderRadius="5px"
			:src="avatarUrl||'/static/im/avatarUrl.png'" mode="widthFix" class="avatarUrl">
		</cloud-image>
		<view class="msg-content" @longpress.prevent="showControl" ref="msg-content">
			<uni-icons @click="retries" :color="msg.state===0?'#999':'#d22'" :type="msgStateIcon" class="msgStateIcon">
			</uni-icons>
			<cloud-image width="200rpx" height="200rpx" @click="previewImage(msg.body.url||msg.body)" v-if="msg.type == 'image'"
				:src="msg.body.url||msg.body" mode="aspectFill" />
			<!-- msg.body.url||msg.body 这个写法是为了兼容老版的设计，新版直接 msg.body.url即可-->
			<view @click="playSound(msg.body.url)" v-if="msg.type == 'sound'" class="text selfText sound-box"
				:style="{width:soundBoxWidth}">
				<text class="sound-time">{{msg.body.time}}''</text>
				<view class="sound-icon-box" style="width: 18px;height: 18px;">
					<image v-if="soundPlayState" src="/static/im/sound-ing.gif" style="width: 18px;height: 18px;"
						mode="widthFix"></image>
					<uni-im-icons v-else :class="{'sound-icon-active':soundPlayState}" code="e6f5" size="18px"
							color="#000000"></uni-im-icons>
				</view>
			</view>
			<template v-if="msg.type == 'text'">
				<!-- #ifdef APP-NVUE -->
				<view class="rich-text-box" :class="msgClass">
					<text v-if="msg.body == htmlString" class="msg-text">{{ msg.body }}</text>
					<rich-text v-else class="rich-text" @clickLink="clickLink" :nodes="nodes"></rich-text>
				</view>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
				<view class="text-box" :class="msgClass">
					<template v-if="msg.body == htmlString">
						<text class="msg-text">{{msg.body}}</text>
					</template>
					<template v-else>
						<template v-for="(item,index) in nodes">
							<text :key="index" class="msg-text" v-if="item.type == 'text'">{{ item.text }}</text>
							<text :key="index" v-if="item.name == 'a'" @click="clickLink(item.attrs.href)"
								class="link msg-text">{{item.attrs.href}}</text>
						</template>
					</template>
				</view>
				<!-- #endif -->
			</template>

			<template v-if="msg.type == 'code'">
				<uni-im-code-view :code="msg.body"></uni-im-code-view>
			</template>

			<!-- <uni-link href="https://ext.dcloud.net.cn/" text="https://ext.dcloud.net.cn/"></uni-link> -->
			<view @click="playVideo" class="video-box" v-if="msg.type == 'video'">
				<image class="video-img" mode="aspectFill"
					:src="videoUrl+'?x-oss-process=video/snapshot,t_1000,f_jpg,w_200,m_fast'"></image>
				<view class="video-box-mark"></view>
				<uni-im-icons code="e650" size="35" color="#FFF" class="play-video-icon"></uni-im-icons>
			</view>
			<template v-if="msg.type == 'file'">
				<view class="file-msg-box" @click="downLoadFile">
					<view class="file-msg-info">
						<text class="file-msg-info-name">{{fileName}}</text>
						<text class="file-msg-info-size">{{fileSize}}</text>
					</view>
					<uni-im-icons code="e858" size="50" color="#EEEEEE" class="file-icon"></uni-im-icons>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import parseHtml from './html-parser.js';
	let audioContext
	setTimeout(()=> {
		audioContext = getApp().globalData.audioContext
	}, 0);
	
	export default {
		data() {
			return {
				username: "用户名",
				videoUrl: '',
				soundPlayState: 0
			};
		},
		mounted() {
			if(this.msg.type == 'video'){
				this.videoUrl = this.msg.body.url

			}else if(this.msg.type == 'sound'){
				audioContext.onPlay(() => {
					// console.log('soundPlayStart------------------');
					let src = getApp().globalData.uniIm.audioContext.src
					if(src == this.msg.body.url){
						this.soundPlayState = 1
					}
				});
				
				let soundPlayEnd = () => {
					// console.log('soundPlayEnd------------------');
					this.soundPlayState = 0
				}
				audioContext.onPause(soundPlayEnd);
				audioContext.onStop(soundPlayEnd);
				audioContext.onEnded(soundPlayEnd);
				audioContext.onError(soundPlayEnd);
			}
		},
		props: {
			msg: {
				type: Object,
				default () {
					return {
						body: ""
					}
				}
			},
			self: {
				type: Boolean,
				default () {
					return false
				}
			},
			avatar_file: {
				type: [Object, String, Boolean],
				default () {
					return {
						url: "/static/im/avatarUrl.png"
					}
				}
			},
			index: {
				type: Number
			}
		},
		computed: {
			msgStateIcon() {
				switch (this.msg.state) {
					case 0:
						//	发送中
						return 'spinner-cycle'
						break;
					case -100:
						//	发送失败
						return 'refresh-filled'
						break;
					case -200:
						//	禁止发送（内容不合法）
						return 'info-filled'
						break;
					default:
						return ''
						break;
				}
			},
			mineId() {
				return uniCloud.getCurrentUserInfo().uid
			},
			msgClass() {
				var msgClass = ''
				if (this.msg.type == 'text') {
					let textLength = this.msg.body.replace(/[\u0000-\u007f]/g, "a").replace(/[\u0080-\u07ff]/g, "aa")
						.replace(
							/[\u0800-\uffff]/g, "aa").length
					if (textLength > 30) {
						msgClass += ' exceed'
					}
				}
				if (this.self) {
					msgClass += ' self-text-box'
				}
				return msgClass
			},
			avatarUrl() {
				if (this.self) {
					// console.error('uniIdStore.userInfo',uniIdStore.userInfo)
					return uniIdStore.userInfo.avatar_file?.url
				} else {
					return this.avatar_file?.url
				}
			},
			soundBoxWidth() {
				return uni.upx2px(750 / 60 * this.msg.body.time) + 50 + 'px'
			},
			htmlString() {
				if (this.msg.type != 'text') {
					return "";
				}
				let content = this.msg.body //.replace(/</g, "< ");
				if (/</g.test(content)) {
					return content
				}
				if (!content) {
					return "";
				}
				
				// 找网址
				let urlPattern = /(https?:\/\/|www\.)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
				content = content.replace(urlPattern, function(match) {
					var href = match;
					if (match.indexOf("http") == -1) {
						//如果不带http://开头就带上
						href = "http://" + match;
					}
					return '<a class="link" target="_blank" href="' + href + '">' + match + "</a> ";
				});
				/*
				// 手机号正则
				const regPhone = /(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}/g;
				content = content.replace(regPhone, " <a href='tel:$&'>$&</a>")
				// 固定电话正则 
				const regTel = /(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?/g;
				content = content.replace(regTel, " <a href='tel:$&'>$&</a>")
				
				// 邮箱正则
				const regMail = /([a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4})/ig;
				content = content.replace(regMail, " <a href='mailto:$&'>$&</a>")
				*/
				return content
				
			},
			nodes() {
				if (this.msg.body == this.htmlString) {
					return
				}
				try {
					let nodes = parseHtml(this.htmlString)
					// console.log('nodes',nodes);
					nodes.map(item => {
						// console.log('item',item);
						if (item.attrs && item.attrs.class) {
							item.attrs.class += " msg-text"
						} else {
							item.attrs = {
								class: "msg-text"
							}
						}
						return item
					})
					return nodes
				} catch (e) {
					console.error('htmlString error：', e);
					return ''
					//TODO handle the exception
				}

			},
			fileSize() {
				if (this.msg.type == 'file') {
					let size = this.msg.body.size
					if(size < Math.pow(1024,1) ){
						return parseInt(size * 10)/10 + 'B'
					}else if(size < Math.pow(1024,2) ){
						return parseInt(size/Math.pow(1024,1) * 10) / 10 + 'KB'
					}else if(size < Math.pow(1024,3) ){
						return parseInt(size/Math.pow(1024,2) * 10) / 10 + 'MB'
					}else {
						return 'err'
					}
					
				}
			},
			fileName(){
				if (this.msg.type == 'file') {
					let name = this.msg.body.name
					if(name.length < 30){
						return name
					}else{
						return name.slice(0,15) + '...'+name.slice(-15)
					}
				}
			}
		},
		methods: {
			clickLink(href) {
				// console.log(href);
				// #ifdef APP-PLUS
				plus.runtime.openURL(href);
				// #endif
				// #ifdef H5
				window.open(href)
				// #endif
				// #ifdef MP
				uni.setClipboardData({
					data: href,
					complete: (e) => {
						// console.log(e);
					}
				});
				// #endif
			},
			playSound(url) {
				// console.log("playSound", url);
				audioContext.src = url;
				// console.log(78998797,audioContext);
				if(this.soundPlayState === 1){
					// console.log('播放中，执行关闭');
					audioContext.stop()
				}else{
					audioContext.stop()
					audioContext.play();
				}
			},
			previewImage(url) {
				uni.showLoading();
				if (url.includes('://') && !url.includes('https://img-cdn-tc.dcloud.net.cn/uploads/avatar') && !url
					.includes('https://ask.dcloud.net.cn/uploads/avatar')) {
					uniCloud.getTempFileURL({
						fileList: [url]
					}).then(res => {
						// 兼容uniCloud私有化部署
						let fileList = res.fileList || res.result.fileList
						uni.previewImage({
							urls: [fileList[0].tempFileURL],
							complete() {
								uni.hideLoading()
							}
						})
					})
				} else {
					uni.previewImage({
						urls: [url],
						complete() {
							uni.hideLoading()
						}
					})
				}
			},
			playVideo() {
				uni.navigateTo({
					url: "/uni_modules/uni-im/pages/common/video/video?url=" + this.videoUrl,
					animationDuration: 300,
					animationType: "fade-in"
				})
			},
			async showControl() {
				let msgContentDomInfo;
				// #ifndef APP-NVUE
				const query = uni.createSelectorQuery().in(this);
				await new Promise(callback => {
					query.selectAll('.msg-content').boundingClientRect(data => {
						msgContentDomInfo = data[0]
						// console.log('data--------', data);
						callback(msgContentDomInfo)
					}).exec();
				})
				// #endif

				// #ifdef APP-NVUE
				let ref = this.$refs['msg-content']
				await new Promise(callback => {
					const dom = weex.requireModule('dom')
					dom.getComponentRect(ref, e => {
						msgContentDomInfo = e.size
						callback(e)
					})
				})
				// #endif

				// console.log('msgContentDomInfo', msgContentDomInfo);

				this.$emit('showControl', {
					index: this.index,
					msgContentDomInfo
				})
				// if (this.msg.type == 'text') {
				// 	uni.setClipboardData({
				// 		data: this.msg.body,
				// 		success: function() {
				// 			console.log('success');
				// 			uni.showToast({
				// 				title: '文本复制成功',
				// 				icon: 'none'
				// 			});
				// 		},
				// 		complete: (e) => {
				// 			console.log(e);
				// 		}
				// 	});
				// }
			},
			retries() {
				// if (this.msg.state == -200) {
				// 	return uni.showToast({
				// 		title: '内容不合法',
				// 		icon: 'error'
				// 	});
				// }
				this.$emit('retries', this.msg)
			},
			downLoadFile() {
				// #ifdef H5
				return window.open(this.msg.body.url)
				// #endif
				
				// #ifndef H5
				uni.downloadFile({
					url: this.msg.body.url,
					success: (res) => {
						if (res.statusCode === 200) {
							// console.log('下载成功');
							// console.log(res.tempFilePath);
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: (res)=> {
									// console.log('res',res);
									uni.openDocument({filePath:res.savedFilePath})
								}
							});
						}
					}
				});
				// #endif
			}
		}
	}
</script>
<style lang="scss">
	/* #ifndef APP-NVUE */
	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	/* #endif */
	.msg-box {
		width: 750rpx;
		// flex: 1;
		flex-direction: row;
		justify-content: flex-start;
		padding: 0 16rpx;
		margin: 16rpx 0;
		position: relative;
		// border-style: solid;
		// border-width: 1px;
		// border-color: #2C405A;
	}

	/* #ifdef H5 */
	.msg-box,
	.msg-box * {
		cursor: default;
	}

	/* #endif */

	.msg-content {
		margin: 0 16rpx;
		flex-direction: row;
		align-items: center;
	}

	.username {
		font-size: 26rpx;
		color: #666666;
		margin: 8rpx 0;
	}

	.text-box {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 18rpx;
		border-radius: 5px;
		background-color: #FFFFFF;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		line-height: 20px;
	}

	.rich-text-box {
		padding: 18rpx;
		border-radius: 5px;
		background-color: #FFFFFF;
	}

	.rich-text {
		background-color: transparent;
		width: 500rpx;
	}

	.msg-text {
		font-size: 16px;
		justify-content: space-between;
		/* #ifndef APP-NVUE */
		word-break: break-all;
		user-select: text;
		cursor: text;
		/* #endif */
	}

	.link {
		// font-size: 16px;
		color: #007fff;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.self-text-box {
		background-color: #4CD964;
	}

	.exceed {
		width: 400rpx;
	}

	.self {
		flex-direction: row-reverse;
	}

	.selfIcon {
		//transform: rotate(180deg);
	}

	.msgStateIcon {
		margin-right: 10rpx;
	}

	.video-box {
		width: 200rpx;
		height: 200rpx;
		position: relative;
	}

	.video-img {
		width: 200rpx;
		height: 200rpx;
	}

	.play-video-icon {
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		top: 70rpx;
		left: 70rpx;
	}

	.video-box-mark {
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.sound-box {
		flex-direction: row;
		background-color: #94EB6A;
		height: 44px;
		padding: 10px;
		width: 66px;
		border-radius: 5px;
		justify-content: flex-end;
		align-items: center;
	}

	.sound-time {
		font-size: 14px;
		margin-right: 2px;
	}

	.sound-icon-active {
		transform: option;
		opacity: 10;
		background-color: #007AFF;
		transition-property: background-color;
		transition-duration: 0.3s;
		transition-delay: 0.1s;
		transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1.0);
	}

	.file-msg-box {
		background-color: #FFFFFF;
		width: 500rpx;
		padding: 20rpx;
		border-radius: 8px;
		flex-direction: row;
		justify-content: space-between;
	}

	.file-msg-info {
		width: 300rpx;
		flex-direction: column;
		justify-content: space-around;
	}

	.file-msg-info-name {
		/* #ifndef APP-NVUE */
		word-wrap: break-word;
		/* #endif */
		font-size: 16px;
	}

	.file-msg-info-size {
		font-size: 12px;
		color: #666;
	}
</style>
