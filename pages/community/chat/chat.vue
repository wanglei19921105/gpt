<template>
	<view class="page chat" :class="getThemeClass" @click="menuIsShow = false;emojiIsShow = false;">
		<view class="cu-chat msg-list" v-if="selfInfo">
			<view class="" v-for="(item,index) in list" :key="index">
				<view class="" v-if="item.contentType == 101||item.contentType == 102">
					<view class="cu-item self" v-if="selfInfo.userID==item.sendID">
						<view class="main">
							<view class="content bg-green shadow word-warp" v-if="item.contentType == 101">
								<text>{{item.content}}</text>
							</view>
							<image :src="getContentUrl(item.content)" class="radius chat-img" mode="widthFix"
								v-else-if="item.contentType == 102" @click="lookimg(item.content)"></image>
							<!-- <view class="content bg-green shadow word-warp" v-else>
							<text>暂不支持的消息类型</text>
						</view> -->
						</view>
						<view class="cu-avatar radius"
							:style="{ 'background-image': 'url(' + item.senderFaceUrl + ')' }">
						</view>
						<view class="date" v-if="showTime(index,item.sendTime)">{{initTime(item.sendTime)}}</view>
					</view>
					<view class="cu-item" v-else>
						<view class="cu-avatar radius"
							:style="{ 'background-image': 'url(' + item.senderFaceUrl + ')' }">
						</view>
						<view class="main">
							<view class="content bg-green shadow word-warp" v-if="item.contentType == 101">
								<text>{{item.content}}</text>
							</view>
							<image :src="getContentUrl(item.content)" class="radius chat-img" mode="widthFix"
								v-else-if="item.contentType == 102" @click="lookimg(item.content)"></image>
							<!-- <view class="content bg-green shadow word-warp" v-else>
							<text>暂不支持的消息类型</text>
						</view> -->
						</view>
						<view class="date" v-if="showTime(index,item.sendTime)">{{initTime(item.sendTime)}}</view>
					</view>
				</view>
				
			</view>
			<view class="cu-info" v-if="isMute">
				<text class="cuIcon-roundclosefill text-red  u-m-r-10"></text> 当前群聊已被群主禁言
			</view>
		</view>
		<!-- 垫高 -->
		<view :style="{ height:imPlaceholderheight}"></view>
		<!-- 底部 -->
		<view class="chat-bot card-bg" :style="{bottom:chatFootBottom}" v-if="!isMute">
			<view class="flex align-center u-p-t-25 u-p-l-28 u-p-r-28 u-p-b-25">
				<view class="chat-areabox flex-1 card-tag-bg">
					<textarea v-model="chatText" @confirm="sendText" @linechange="linechange"
						:style="{ height: textareaHeight + 'px' }" disable-default-padding hold-keyboard confirm-hold
						auto-blur confirm-type="send" :show-confirm-bar="false" :cursor-spacing="20" maxlength="250"
						:adjust-position="false" class="chat-area card-tag-bg" ref="input-box" @input="textareaChange" />
				</view>
				<view class="flex-shink u-m-l-24 flex align-center">
					<image :src="`/static/images/my/${getThemeName}/emoji.png`" class="chat-icon"
						@click.stop="emojiClick"></image>
					<image :src="`/static/images/my/${getThemeName}/add.png`" class="chat-icon u-m-l-24"
						@click.stop="menuClick"></image>
					<view class="chat-sendbtn bg-green" :style="{'width':sendBtnWidth,'marginLeft':sendML}" @click="repeatClick(sendText)">发送</view>
				</view>
			</view>
			<view class="flex chat-menu" v-if="menuIsShow">
				<view class="text-center" style="margin-right: 100rpx;" @click.stop="sendImage">
					<image :src="`/static/images/my/${getThemeName}/pic.png`" class="chat-menuicon"></image>
					<view class="u-font-24 u-m-t-10">图片</view>
				</view>
				<!-- <view class="text-center">
					<image :src="`/static/images/my/${getThemeName}/video.png`" class="chat-menuicon"></image>
					<view class="u-font-24 u-m-t-10">视频</view>
				</view> -->
			</view>
			<scroll-view :scroll-y="true" v-if="emojiIsShow" class="emojiListBox">
				<text v-for="(uniCodeEmoji,index) in emojiCodes" :key="index"
					@click.stop="clickEmojiItem(uniCodeEmoji,$event)" class="emoji-item">{{uniCodeEmoji}}</text>
			</scroll-view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import emojiCodes from '@/common/emojiCodes.js';
	export default {
		data() {
			return {
				// 群聊id
				id: '',
				// 
				loadStatus: 'loading',
				list: [],
				chatText: '',
				selfInfo: null,
				list: [{
					sendID: 1
				}, {
					sendID: 0
				}],

				menuIsShow: false,
				emojiIsShow: false,

				textareaHeight: 26,
				emojiCodes: emojiCodes,
				KeyboardHeight: 0,
				
				groupid:'',
				
				// 是否禁言
				isMute:true,
				// 
				sendBtnWidth: '0',
				sendML: '0'
			}
		},
		computed: {
			menuBoxHeight() {
				return 260
			},
			emojiBoxHeight() {
				return 260
			},
			chatFootBottom() {
				// 优化性能问题
				if (this.menuIsShow && this.KeyboardHeight) {
					return this.KeyboardHeight - this.menuBoxHeight + 'px'
				}
				if (this.emojiIsShow && this.KeyboardHeight) {
					return this.KeyboardHeight - this.emojiBoxHeight + 'px'
				}

				return this.KeyboardHeight + 'px'
			},
			imPlaceholderheight() {
				let imPlaceholderheight = 35 + this.textareaHeight
				if (this.KeyboardHeight) {
					imPlaceholderheight += this.KeyboardHeight
				} else {
					imPlaceholderheight += (this.menuIsShow ? this.menuBoxHeight : 0) + (this.emojiIsShow ? this
						.emojiBoxHeight : 0)
				}
				return imPlaceholderheight + 'px'
			}
		},
		onLoad(data) {
			this.id = data.id
			this.groupid = data.groupid
			let title = data.name
			uni.setNavigationBarTitle({
				title
			})
			// im连接正常时进入页面
			if(this.$im.loginStatus==1){
				this.selfInfo = this.$im.selfInfo;
				console.log(this.selfInfo);
				this.loadData(true)
			}
			// 监听：在聊天页面刷新，执行的im重新登录并更新完个人信息后的回调函数
			uni.$on('onImReady',()=>{
				this.selfInfo = this.$im.selfInfo
				console.log(this.selfInfo,'聊天页面刷新，更新后的个人信息');
				this.loadData(true)
			})
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: `/pages/community/chat/member?id=${this.groupid}`
			})
		},
		onShow() {
			this.updateTalkState()
		},
		methods: {
			// 当输入框有内容时显示发送按钮
			textareaChange(){
				if(this.chatText.length>0){
					this.sendBtnWidth = '80rpx'
					this.sendML = '24rpx'
				}else{
					this.sendBtnWidth = '0'
					this.sendML = '0'
				}
			},
			// 更新是否禁言状态
			updateTalkState(){
				return new Promise((resolve, reject)=>{
					this.$u.api.districtSendVerify({
						id: this.groupid
					}).then(res=>{
						this.isMute = res.data.isMute
						resolve()
					})
				})
			},
			// 拉取第一页聊天记录
			loadData(flag) {
				this.loadStatus = 'loading';

				let msgID = '';

				// true 第一页 false 非第一页
				if (flag) {
					msgID = '';
					this.list = [];
				} else {
					// 分页逻辑为传入当前页第一条数据的id
					msgID = this.list[0].clientMsgID;
				}
				this.$im
					.imGetChatHistory(this.id, msgID)
					.then(res => {
						uni.stopPullDownRefresh();
						let arr = res;
						if (arr.length > 0) {
							this.list = arr.concat(this.list);
							if (this.list.length % 12 == 0) this.loadStatus = 'more';
							else this.loadStatus = 'noMore';
						} else {
							this.loadStatus = 'noMore';
						}
						if (flag) {
							this.$nextTick(() => {
								this.showLast(0)
							})
						} else {
							this.showTop()
						}
					})
					.catch(() => {
						this.loadStatus = 'noMore';
					});
			},
			// 格式化时间戳
			initTime(time) {
				return this.$im.initTime(time);
			},
			// 两条消息之间间隔5分钟后，才显示时间
			showTime(index, time) {
				if (index == 0) return true;
				let t = time;
				let last = this.list[index - 1].sendTime;
				return t - last >= 300000 ? true : false;
			},
			linechange(e) {
				let {
					height,
					lineCount
				} = e.detail;
				if (lineCount === 1) {
					this.textareaHeight = 26;
				} else if (height <= 100) {
					this.textareaHeight = height - 2;
				}
			},
			menuClick() {
				let t = 0
				if (!this.menuIsShow && this.KeyboardHeight) {
					uni.hideKeyboard()
					t = 88
				}
				setTimeout(() => {
					this.menuIsShow = !this.menuIsShow
					if (this.menuIsShow) {
						this.showLast(0)
					}
				}, t)
				this.emojiIsShow = false;
			},
			emojiClick() {
				this.soundIsShow = false
				this.menuIsShow = false
				let t = 0
				if (!this.emojiIsShow && this.KeyboardHeight) {
					uni.hideKeyboard()
					t = 88
				}
				setTimeout(() => {
					this.emojiIsShow = !this.emojiIsShow
					if (this.emojiIsShow) {
						this.showLast(0)
					}
				}, t)
			},
			clickEmojiItem(emojiUniCode, e) {
				this.chatText += emojiUniCode
				e.stopPropagation()
			},
			// 滚动到底部
			showLast(duration = 300) {
				if (this.list && this.list.length) {
					uni.createSelectorQuery()
						.select('.msg-list')
						.boundingClientRect(rect => {
							// console.log('容器高度',rect);
							if (rect) {
								// 使页面滚动到底部
								// console.log('showLast',rect.height);
								uni.pageScrollTo({
									scrollTop: rect.height,
									duration,
									complete: e => {
										// console.log(e);
									}
								});
							}
						})
						.exec();
				}
			},
			// 滚动到顶部
			showTop() {
				uni.pageScrollTo({
					scrollTop: 1,
					duration: 0,
					complete: e => {
						// console.log(e);
					}
				});
			},
			// 发送文本框消息
			sendText() {
				if (!this.chatText) return this.$refs.uToast.show({
					title: '请输入内容',
					type: 'error'
				})
				this.updateTalkState().then(()=>{
					if(this.isMute) return this.$refs.uToast.show({
						title: '当前群聊已被群主禁言',
						type: 'error'
					})
					this.$im.imCreateTextMessage(this.chatText, this.id).then(res => {
						let message = {
							sendID: this.selfInfo.userID,
							content: this.chatText,
							senderFaceUrl: this.selfInfo.faceURL,
							sendTime: Date.now(),
							contentType: 101
						}
						this.list.push(message)
						this.chatText = ''
						this.$nextTick(() => {
							this.showLast()
						})
					})
				})
				
			},
			// 发送图片消息
			sendImage() {
				this.updateTalkState().then(()=>{
					if(this.isMute) return this.$refs.uToast.show({
						title: '当前群聊已被群主禁言',
						type: 'error'
					})
					this.$im.imCreateImgMessage(this.id).then(res => {
						let data = {
							sourcePicture: {
								url: res
							}
						};
						let message = {
							sendID: this.selfInfo.userID,
							content: JSON.stringify(data),
							sendTime: Date.now(),
							senderFaceUrl: this.selfInfo.faceURL,
							contentType: 102
						};
						this.list.push(message)
						this.$nextTick(() => {
							this.showLast()
						})
					})
				})
				
			},
			// 图片消息return图片url
			getContentUrl(data) {
				return JSON.parse(data).sourcePicture.url;
			},
			// 点击查看大图
			lookimg(data) {
				uni.previewImage({
					urls: [this.getContentUrl(data)]
				});
			},
		},
		onReady() {
			// #ifdef H5
			//通过监听窗口变化 获取键盘弹出或收起事件
			window.addEventListener('resize', () => {
				this.showLast(0);
			})
			// #endif

			// #ifndef H5
			// 监听键盘高度变化显示最后一条消息
			uni.onKeyboardHeightChange(({
				height
			}) => {
				this.KeyboardHeight = height
				if (height) {
					this.showLast(0);
				} else {
					this.menuIsShow = false
					this.emojiIsShow = false
				}
			});
			// #endif
			
			uni.$on('onRecvNewMessage',message=>{
				// 只处理当前聊天对象的消息
				if (this.id != message.groupID) return
				let obj = {
					sendID: message.sendID,
					content: message.content,
					sendTime: message.sendTime,
					senderFaceUrl: message.senderFaceUrl,
					contentType: message.contentType
				};
				// 手动添加聊天记录并滚动到屏幕底部
				this.list.push(obj);
				this.$nextTick(() => {
					this.showLast()
				})
			})
		}
	}
</script>

<style lang="scss">
	@import "@/common/main.css";
	@import "@/common/icon.css";
	.chat-sendbtn{
		border-radius: 10rpx;
		color: #FFFFFF;
		font-size: 24rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		transition: width 0.3s, margin-left 0.3s;
	}
	.word-warp {
		word-break: break-all;
		word-wrap: break-word;
		line-break: anywhere;
	}

	.chat-bot {
		width: 100vw;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;

		.chat-icon {
			width: 42rpx;
			height: 42rpx;
		}

		.chat-areabox {
			padding: 10px;
			border-radius: 10px;
			font-size: 28rpx;

			.chat-area {
				width: 100%;
			}
		}

		.chat-menu {
			width: 750rpx;
			height: 260px;
			padding-top: 25rpx;
			padding-left: 52rpx;

			.chat-menuicon {
				width: 68rpx;
				height: 68rpx;
			}
		}

		.emojiListBox {
			height: 260px;
			width: 100%;
			padding: 0 27rpx 27rpx 27rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.emoji-item {
			text-align: center;
			font-size: 65rpx;
			width: 87rpx;
			height: 87rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			/* #ifndef APP-NVUE */
			display: inline-block;
			/* #endif */
		}
	}

	.chat-img {
		width: 300rpx;
		max-height: 500rpx;
	}
</style>
