<template>
	<view class="poster">
		<image src="../../../static/images/poster-bgimg.png" class="poster-bgimg" mode="widthFix"></image>
		<view class="gap-100"></view>
		<view class="posterbox" @click="createPoster">
			<image :src="info.cover" mode="aspectFill" class="poster-cover"></image>
			<view class="text-center u-font-30 u-m-t-24 text-bold text-default">{{info.title}}</view>
			<view class="text-center u-font-22 u-m-t-15 text-bold text-default">{{info.amount}}</view>
			<view class="text-right poster-content u-font-22 text-default">
				<view>{{info.author}}</view>
				<view class="u-m-t-35">{{info.type}}</view>
				<view class="flex justify-end">
					<view class="u-m-t-25 poster-hash">{{info.goods_hash}}</view>
				</view>
				<view class="flex justify-end">
					<view class="u-m-t-25 poster-hash">{{info.deal_hash}}</view>
				</view>
				<view class="flex justify-end">
					<view class="u-m-t-25 poster-hash">{{info.address}}</view>
				</view>
			</view>
			<view class="poster-code">
				<tki-qrcode foreground="#333333" ref="qrcode" :size="140" :val="info.qrVal" @result="qrR" :showLoading="false" />
			</view>
		</view>
		<view class="text-center u-font-22 u-m-t-20" style="color: #7E8087;">点击证书下载</view>
		<view class="gap-100"></view>
		
		<canvas canvas-id="poster" class="poster_canvas"></canvas>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				
				info:{
					cover:'',
					title:'',
					amount:'',
					author:'',
					type:'',
					goods_hash:'',
					deal_hash:'',
					address:'',
					qrVal:''
				},
				
				qrFile:'',
				coverFile:'',
				bgFile:'',
				
				path:'',
				
				flag:true
			}
		},
		onLoad(data) {
			this.id = data.id||''
			this.loadData()
		},
		methods:{
			loadData(){
				this.$u.api.certificateInfo({
					id: this.id
				}).then(res => {
					this.info.cover = res.data.pre.products_real_cover
					this.info.title = res.data.pre.products_title
					this.info.amount =res.data.pre.price +'USDT'
					this.info.author = res.data.pre.author_nickname
					this.info.type = res.data.pre.type_name
					this.info.goods_hash = res.data.pre.mint_tx
					this.info.deal_hash = res.data.pre.trade_hash
					this.info.address = uni.$myAppConfig.NFTAddress
					this.info.qrVal = res.data.pre.href
					setTimeout(()=>{
						this.$refs.qrcode._makeCode();
					},300)
					this.download()
				})
			},
			qrR(res){
				this.qrFile = res
			},
			download(){
				if(!this.info.cover)return
				uni.downloadFile({
					url: this.info.cover,
					success: img => {
						if (img.statusCode === 200) {
							this.coverFile = img.tempFilePath;
						}
					}
				});
				let bgUrl = 'http://tkzc.zhendexiangbudao.com/uploads/test/c9c36410312a2d09acf070a73c880fd.png'
				// let bgUrl = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b06745e9-1399-4b09-848c-8da02e19cfcc/6f5886fd-ab6f-463f-8cae-76496a49e6ec.png'
				uni.downloadFile({
					url: bgUrl,
					success: img => {
						if (img.statusCode === 200) {
							this.bgFile = img.tempFilePath;
						}
					}
				});
			},
			createPoster(){
				if(this.path){
					uni.previewImage({
						urls:[this.path],
						indicator: 'none'
					})
					return
				}
				
				if(!this.flag)return
				this.flag = false
				
				for (let key in this.info) {
					if (this.info[key] == '') {
						uni.showToast({
							title:"藏品信息不完善，证书生成失败",
							icon:"none"
						})
						this.flag = true
						return false
					}
				}
				if(!(this.bgFile&&this.coverFile&&this.qrFile)){
					uni.showToast({
						title:"藏品图片下载失败，证书生成失败",
						icon:"none"
					})
					this.flag = true
					return false
				}
				uni.showLoading({
					title: '正在生成证书...'
				});
				setTimeout(() => {
					this.flag = true
					uni.hideLoading();
				}, 5000);
				const ctx = uni.createCanvasContext('poster');
				ctx.fillRect(0, 0, 300, 590);
				// 背景图
				ctx.drawImage(this.bgFile, 0, 0, 300, 590);
				// 封面图
				ctx.drawImage(this.coverFile, 100, 50, 100, 100);
				// 藏品名
				ctx.setFillStyle('#111926')
				ctx.setFontSize(15)
				ctx.setTextAlign('center')
				ctx.fillText(this.info.title, 150, 170)
				// 价格
				ctx.fillText(this.info.amount, 150, 195)
				// 创作者
				ctx.setFontSize(12)
				ctx.setTextAlign('right')
				ctx.fillText(this.info.author, 265, 280)
				// 作品类型
				ctx.fillText(this.info.type, 265, 315)
				// 作品哈希
				ctx.setFontSize(10)
				this.drawText(ctx, this.info.goods_hash,265,345,35,165)
				// 交易哈希
				this.drawText(ctx, this.info.deal_hash,265,395,35,165)
				// 合约地址
				this.drawText(ctx, this.info.address,265,448,35,165)
				// 二维码
				ctx.drawImage(this.qrFile, 195, 505, 70, 70);

				ctx.draw(true, () => {
					uni.canvasToTempFilePath({
						canvasId: 'poster',
						success: img => {
							uni.hideLoading();
							this.flag = true
							this.path = img.tempFilePath
							uni.previewImage({
								urls:[img.tempFilePath],
								indicator: 'none'
							})
							// #ifdef H5
							uni.showToast({
								title:"请截图保存",
								icon:"none"
							})
							// #endif
						}
					});
				});
			},
			// 绘制文本换行
			drawText (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
			    let lineWidth = 0;
			    let lastSubStrIndex = 0; //每次开始截取的字符串的索引
			    for (let i = 0; i < str.length; i++) {
			        lineWidth += ctx.measureText(str[i]).width;
			        if (lineWidth > canvasWidth) {
			            ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
			            initHeight += 10; //22为 文字大小20 + 2
			            lineWidth = 0;
			            lastSubStrIndex = i;
			            titleHeight += 10;
			        }
			        if (i == str.length - 1) { //绘制剩余部分
			            ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
			        }
			    }
			    // 标题border-bottom 线距顶部距离
			    titleHeight = titleHeight + 10;
			    return titleHeight;
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: linear-gradient(to bottom,#CEFBFB, #F5F8F8);
	}
	.poster{
		width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.poster-bgimg{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
	}
	.posterbox{
		width: 600rpx;
		height: 1180rpx;
		background-image: url("../../../static/images/poster-bg.png");
		background-size: 100% 100%;
		position: relative;
		z-index: 100;
		padding: 100rpx 70rpx 0 70rpx;
		.poster-cover{
			width: 200rpx;
			height: 200rpx;
			border-radius: 24rpx;
			margin: 0 130rpx;
		}
		.poster-content{
			width: 460rpx;
			position: absolute;
			top: 540rpx;
		}
		.poster-hash{
			width: 330rpx;
		}
		.poster-code{
			position: absolute;
			bottom: 30rpx;
			right: 70rpx;
		}
	}
	
	.poster_canvas {
		width: 300px;
		height: 590px;
		position: fixed;
		top: -10000rpx;
		left: 0rpx;
	}
</style>