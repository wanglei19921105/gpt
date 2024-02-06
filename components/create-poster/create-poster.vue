<template>
	<view class="">
		<canvas canvas-id="poster" class="poster_canvas"></canvas>
		<view class="qrimg">
			<tki-qrcode foreground="#333333" ref="qrcode" :val="qrVal" @result="qrR" :showLoading="false" />
		</view>
	</view>
</template>

<script>
	/**
	 * createPoster 绘制海报
	 * @property {String} qrVal 二维码值
	 * @property {String} avatar 头像
	 * @property {String} inviteBg 海报背景图
	 * @property {String} name 昵称
	 * @property {Function} create 开始绘制海报
	 * @property {Function} finish 海报绘制成功回调
	 */
	export default {
		name: 'createPoster',
		props: {
			qrVal: {
				type: String,
				default: ''
			},
			avatar: {
				type: String,
				default: ""
			},
			inviteBg: {
				type: String,
				default: ""
			},
			name: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				inviteBgFile: '',
				avatarFile: '',
				qrcodeFile: '',
				flag:true,
				type:0
			}
		},
		methods: {
			create(type) {
				if(type)this.type = type
				if (!this.qrVal) return this.toast('二维码内容异常')
				if (!this.inviteBg) return this.toast('海报底图加载失败')
				// if (!this.avatar) return this.toast('用户头像加载失败')
				// if (!this.name) return this.toast('用户昵称异常')
				uni.showLoading({
					title:"正在加载资源..."
				})
				if(this.flag){
					this.flag = false
					uni.downloadFile({
						url: this.inviteBg,
						success: img => {
							if (img.statusCode === 200) {
								this.inviteBgFile = img.tempFilePath;
								this.$refs.qrcode._makeCode();
								// uni.downloadFile({
								// 	url: this.avatar,
								// 	success: img => {
								// 		if (img.statusCode === 200) {
								// 			uni.hideLoading()
								// 			this.avatarFile = img.tempFilePath;
								// 			this.$refs.qrcode._makeCode();
								// 		}
								// 	},
								// 	fail: () => {
								// 		uni.hideLoading()
								// 		this.flag = true
								// 		this.toast('用户头像加载失败')
								// 		return
								// 	}
								// });
							}
						},
						fail: () => {
							uni.hideLoading()
							this.flag = true
							this.toast('海报底图加载失败')
							return
						}
					});
				}else{
					uni.showToast({
						title:"请稍后！",
						icon:"none"
					})
				}
				
			},
			qrR(url) {
				this.qrcodeFile = url;
				uni.showLoading({
					title: '正在生成海报'
				});
				setTimeout(() => {
					uni.hideLoading();
				}, 5000);
			
				const ctx = uni.createCanvasContext('poster');
				ctx.fillRect(0, 0, 300, 534);
				ctx.drawImage(this.inviteBgFile, 0, 0, 300, 534);
				ctx.setFillStyle('#FFFFFF')
				ctx.fillRect(195, 429, 90, 90);
				ctx.drawImage(this.qrcodeFile, 200, 434, 80, 80);
				// ctx.setFontSize(15)
				// ctx.setFillStyle('#333333')
				// ctx.fillText(this.name, 80, 470)
				// ctx.setFontSize(12)
				// ctx.setFillStyle('#999999')
				// ctx.fillText('邀你加入微纳安选', 80, 490)
				// ctx.fillText('分享优惠好货', 80, 505)
				ctx.save();
				// ctx.beginPath();
				// ctx.arc(40, 484, 30, 0, Math.PI * 2);
				// ctx.setFillStyle('#999999')
				// ctx.fill()
				// ctx.clip();
				// ctx.drawImage(this.avatarFile, 10, 454, 60, 60);
				// ctx.restore();
			
				ctx.draw(true, () => {
					uni.canvasToTempFilePath({
						canvasId: 'poster',
						success: img => {
							uni.hideLoading();
							this.flag = true
							this.$emit('finish',{
								url:img.tempFilePath,
								type:this.type
							})
							if(this.type==0){
								uni.previewImage({
									urls:[img.tempFilePath]
								})
							}
						}
					});
				});
			},
			toast(data){
				uni.showToast({
					title:data,
					icon:"none"
				})
			}
		}
	}
</script>

<style lang="scss">
	.poster_canvas {
		width: 300px;
		height: 534px;
		position: fixed;
		top: -10000rpx;
		left: 0rpx;
	}

	.qrimg {
		position: fixed;
		top: -9999rpx;
		left: 0rpx;
	}
</style>
