<template>
	<view class="page" :class="getThemeClass">
		
		<view class="header-box">
			
			<image :src="spaceData.bgimg || '/static/images/spaceBack.png'" class="header-bg" mode="aspectFill"></image>
			<image src="/static/images/yyj_mb.png" class="header-mb" mode="aspectFill"></image>
			<view class="header-content" :style="{paddingTop: ($u.sys().statusBarHeight + 44) + 'px'}">
				
				<view class="header-content-title">
					<view class="setting-box" v-if="userId === spaceData.user_id" @click="changeBg">
						<u-icon name="photo" color="#ffffff" size="26"></u-icon>
						<text class="u-m-l-10">设置背景</text>
					</view>
				</view>
				
				<view class="header-content-content-box">
					<image :src="spaceData.avatar || '/static/logo.png'" class="header-content-avatar" mode=""></image>
					<view class="header-content-info">
						<view class="header-content-name">
							<text class="">{{ spaceData.nickname }}</text>
						</view>
						<view class="header-content-tips">
							<text>粉丝：{{ spaceData.fans }}</text>
							<text class="u-m-l-35">获赞：{{ spaceData.my_like }}</text>
						</view>
					</view>
					<view class="header-content-attention-btn-box">
						
						<template v-if="status && userId !== spaceData.user_id">
							<view class="attention-btn-plain" @click="focuson(spaceData.user_id)">
								<text>已关注</text>
							</view>
						</template>
						<template v-if="!status && userId !== spaceData.user_id">
							<view class="attention-btn default-btn-bg" @click="focuson(spaceData.user_id)">
								<u-icon name="plus-circle" size="30" />
								<text class="u-m-l-10">关注</text>
							</view>
						</template>
						
					</view>
				</view>
				
				<view class="header-content-bottom">
					<view class="header-content-bottom-item">
						<text>邮箱：</text>
						<text>{{ spaceData.email || '暂无邮箱' }}</text>
					</view>
					
					<view class="header-content-bottom-item">
						<text>网站/作品集：</text>
						<text :class="isUrl(spaceData.homepage)?'url' : ''">{{spaceData.homepage || '暂无作品集'}}</text>
					</view>
					
					<!-- <view class="header-content-bottom-item">
						<text>个人简介：</text>
						<text>{{ spaceData.introduction || '暂无介绍' }}</text>
					</view> -->
				</view>
				
				<view class="header-content-bottom-line bg"></view>
				
			</view>
			
			<view class="content-box bg">
				
				<!-- <view class="content-title-box">
					<view class="content-title-icon"></view>
					<view class="content-title-text">个人简介</view>
				</view>
				
				<view class="card-bg u-p-30 u-m-t-30" style="border-radius: 30rpx;">
					{{ spaceData.introduction || '暂无介绍' }}
				</view> -->
				
				<view class="content-title-box u-m-t-30">
					<view class="content-title-icon"></view>
					<view class="content-title-text">艺术家画廊</view>
				</view>
				
				<view class="featured" style="margin: 30rpx 0rpx 0rpx 0rpx;" :class="getThemeClass">
					<view class="featured_item card-bg" v-for="(item,index) in featuredList" :key="index" @click="go_commodityDef(item.id)">
						<view class="plan">
							<image :src="item.cover || '/static/logo.png'" mode="aspectFit"></image>
						</view>
						<view class="featured_content">
							<view class="cont_header">
								<!-- 作者头像 -->
								<view class="avatar_img">
									<image :src="item.avatar|| '/static/logo.png'" mode="widthFix"></image>
								</view>
				
								<!-- 作者名 -->
								<view>{{item.nickname||''}}</view>
							</view>
				
							<!-- 商品名字 -->
							<view class="cont_title">{{item.title||''}}</view>
				
						</view>
				
						<!-- 喜欢/取消喜欢 -->
						<view class="like" @click="likeCli(item.id,item.status)">
							<image v-if="curScreenStyle"
								:src="item.status == 1?'/static/images/darkLike1.png':'/static/images/heart1.png'"
								mode="widthFix">
								<image v-if="!curScreenStyle"
									:src="item.status == 1?'/static/images/heart2.png':'/static/images/heart1.png'"
									mode="widthFix">
								</image>
						</view>
				
						<!-- 版/衍 -->
						<!-- <view class="type">
							{{item.products_type==0?i18n.invite7:i18n.invite8}}
						</view> -->
					</view>
					
				</view>
				
				<view class="u-p-b-50">
					<u-loadmore :status="listStatus" :margin-top="30" v-if="featuredList.length > 0 || listStatus === 'loading'" />
				</view>
				
			</view>
			
		</view>
		
		<!-- <view class="back">
			<template v-if="spaceData.bgimg">
				<image :src="spaceData.bgimg" mode="widthFix"></image>
			</template>
			<template v-else>
				<image src="/static/images/spaceBack.png" mode="widthFix"></image>
			</template>
		</view> -->
		<!-- 头像 -->
		<!-- <view class="avatar">
			<image :src="spaceData.avatar" mode="widthFix"></image>
		</view> -->
		<!-- 名字 -->
		<view class="artist_info" v-if="false">
			<view class="artist_name">
				<view>{{spaceData.nickname}}</view>
				<!-- 关注 -->
				<view v-if="curScreenStyle && userId != spaceData.user_id" @click="focuson(spaceData.user_id)"
					:class="status?'focus-btn-bg u-m-r-30':'focus-no-btn-bg-bg u-m-r-30'">
					<!-- 取消关注：关注 -->
					{{status? i18n.goods9 :  '+' + i18n.goods10}}
				</view>
				<view v-if="!curScreenStyle && userId != spaceData.user_id" @click="focuson(spaceData.user_id)"
					:class="status?'focus-btn-bg u-m-r-30':'focus-no-btn-bg-bg u-m-r-30'">
					<!-- 取消关注：关注 -->
					{{status?i18n.goods9 :  '+' + i18n.goods10}}
				</view>
			</view>
		</view>
		<!-- 粉丝/获赞 -->
		<view class="earnings" v-if="false">
			<view class="earnings_item">
				<view>{{spaceData.fans}}</view>
				<!-- 粉丝 -->
				<view>{{i18n.invite4}}</view>
			</view>
			<view class="earnings_item">
				<view>{{spaceData.my_like}}</view>
				<!-- 获赞 -->
				<view>{{i18n.invite5}}</view>
			</view>
		</view>
		<!-- <view class="card-bg introduce u-p-t-30 u-p-b-30">
			<view class="u-m-r-30 u-font-32" style="flex-shrink: 0;">
				<text class="text-bold u-font-32">艺术家网站/作品集</text>
				<text class="text-bold u-font-28">（点击查看）</text>
			</view>
			<view class="u-m-t-10" @click="openUrl(isUrl(spaceData.homepage))">
				<text :class="isUrl(spaceData.homepage)?'url' : ''">{{spaceData.homepage || '暂无作品集'}}</text>
			</view>
		</view>
		<view class="card-bg introduce u-p-t-30 u-p-b-30">
			<view class="u-m-r-30 u-font-32" style="flex-shrink: 0;">
				<text class="text-bold u-font-32">艺术家电子邮箱</text>
			</view>
			<view class="u-m-t-10">
				<text class="">{{spaceData.email || '暂无邮箱'}}</text>
			</view>
		</view>
		<view class="introduce card-bg">
			<view class="title">
				艺术家简介
			</view>
			<view class="content">
				{{spaceData.introduction || '暂无介绍'}}
			</view>
		</view> -->
		<!-- 艺术画廊 -->
		<!-- <mytitle :text="i18n.invite6" class="my_title"></mytitle> -->
		<!-- <fall :listData="featuredList"></fall> -->

		<view class="featured" :class="getThemeClass" v-if="false">
			<view class="featured_item card-bg" v-for="(item,index) in featuredList" :key="index" @click="go_commodityDef(item.id)">
				<view class="plan">
					<image :src="item.cover || '/static/logo.png'" mode="aspectFit"></image>
				</view>
				<view class="featured_content">
					<view class="cont_header">
						<!-- 作者头像 -->
						<view class="avatar_img">
							<image :src="item.avatar|| '/static/logo.png'" mode="widthFix"></image>
						</view>

						<!-- 作者名 -->
						<view>{{item.nickname||''}}</view>
					</view>

					<!-- 商品名字 -->
					<view class="cont_title">{{item.title||''}}</view>

				</view>

				<!-- 喜欢/取消喜欢 -->
				<view class="like" @click="likeCli(item.id,item.status)">
					<image v-if="curScreenStyle"
						:src="item.status == 1?'/static/images/darkLike1.png':'/static/images/heart1.png'"
						mode="widthFix">
						<image v-if="!curScreenStyle"
							:src="item.status == 1?'/static/images/heart2.png':'/static/images/heart1.png'"
							mode="widthFix">
						</image>
				</view>

				<!-- 版/衍 -->
				<!-- <view class="type">
					{{item.products_type==0?i18n.invite7:i18n.invite8}}
				</view> -->
			</view>
			
		</view>
		
		<!-- <view class="u-p-b-50">
			<u-loadmore :status="listStatus" :margin-top="30" v-if="featuredList.length > 0 || listStatus === 'loading'" />
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					id: 1,
					// 关注状态
					follow: false
				},
				featuredList: [],
				id: null,
				spaceData: {},
				status: 0, //关注状态0关注1互相关注
				userId: null, //用户id
				
				listStatus: 'loading',
				listPages: 0,
				
				action: `${uni.$myAppConfig.baseUrl}/api/author/bgimg`,
				header: {
					token: uni.getStorageSync('token'),
					lang: uni.getStorageSync('lang'),
				},
			};
		},
		onLoad(options) {
			this.id = options.id
			// this.params.user_id = options.id
			this.authorDetail()
			this.getUserid()
		},
		onPullDownRefresh() {
			this.authorDetail()
		},
		onReachBottom() {
			if(this.listStatus === 'loadmore'){
				this.authorProlist()
			}
		},
		methods: {
			isUrl(url){
				let o = null
				let ur = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
				let ww = /^http?s:\/\//;
				if(url){
					if(ur.test(url.toString())){
						o = url
						if(!ww.test(url.toString())){
							o = 'http://' + url
						}
					}
				}
				return o
			},
			getUserid() {
				this.userId = uni.getStorageSync("id");
			},
			go_commodityDef(id, type) {
				if(type === 1){
					uni.navigateTo({
						url: '/pages/market/goods-def/goods-def-one?id=' + id
					})
				}
				if(type === 2){
					uni.navigateTo({
						url: '/pages/market/goods-def/goods-def?id=' + id
					})
				}
			},
			authorDetail() {
				this.$u.api.author_detail({
					'author_id': this.id,
				}).then(res => {
					this.spaceData = res.data.detail
					// this.params.user_id = res.data.detail.user_id
					this.status = res.data.status
					this.authorProlist(true)
				}).catch(err => {
					
				})
			},
			authorProlist(reset) { //作家作品列表
				if(reset){
					this.featuredList = []
					this.listPages = 0
				}
				this.listStatus = 'loading'
				this.listPages += 1
				
				this.$u.api.author_pro_list({
					user_id: this.id,
					page: this.listPages,
					limit: 10,
				}).then(res => {
					if (res.code == 200) {
						this.featuredList = [...this.featuredList, ...res.data.list.data]
						this.listStatus = res.data.list.next_page_url ? 'loadmore' : 'nomore'
						uni.stopPullDownRefresh()
					} else {
						uni.stopPullDownRefresh()
						this.listStatus = 'nomore'
					}
				}).catch(err => {
					uni.stopPullDownRefresh()
					this.listStatus = 'nomore'
				})
			},
			// 关注/取消关注
			focuson(id) {
				// status为0 = 没关注
				if (!this.status) {
					this.$u.api.attention({
						'user_id': id
					}).then(res => {
						this.status = 1
					}).catch(err => {})
				} else {
					this.$u.api.callback_attention({
						'user_id': id
					}).then(res => {
						this.status = 0
					}).catch(err => {})
				}
			},
			likeCli(id, status) { //喜欢/取消喜欢
				let that = this
				that.featuredList.some((item) => {
					if (item.id == id) {
						// status为0 = 没关注
						if (!item.status) {
							that.$u.api.like_add({
								'id': id
							}).then(res => {
								item.status = 1
							}).catch(err => {})
						} else {
							that.$u.api.like_del({
								'id': id
							}).then(res => {
								item.status = 0
							}).catch(err => {})
						}
					}
				})
			},
			changeBg(){
				uni.chooseImage({
					count: 1,
					success: res => {
						uni.showLoading({
							title: '上传中...'
						})
						uni.uploadFile({
							url: this.action,
							name: 'img',
							filePath: res.tempFilePaths[0],
							header: this.header,
							success: res => {
								uni.hideLoading()
								this.authorDetail()
							},
							file: err => {
								console.error(err);
								uni.hideLoading()
								uni.showToast({
									icon: 'none',
									title: '上传失败，请稍后再试!'
								})
							}
						})
					},
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.header-box{
		position: relative;
		.header-bg{
			position: absolute;
			top: 0;
			left: 0;
			z-index: 0;
			width: 750rpx;
			height: 600rpx;
		}
		.header-mb{
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			width: 750rpx;
			height: 600rpx;
		}
		.header-content{
			position: relative;
			z-index: 2;
			width: 750rpx;
			height: 600rpx;
			
			.header-content-title {
				width: 100%;
				padding: 0rpx 30rpx;
				height: 44px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				color: #fff;
				.setting-box{
					background: rgba(#000, .4);
					border-radius: 30rpx;
					font-size: 24rpx;
					padding: 15rpx 20rpx;
					position: absolute;
					z-index: 999;
				}
			}
			
			.header-content-content-box{
				display: flex;
				align-items: center;
				width: 100%;
				// margin-top: 30rpx;
				padding: 20rpx 30rpx;
				justify-content: space-between;
				.header-content-avatar {
					width: 110rpx;
					height: 110rpx;
					border-radius: 50%;
					border: solid 1rpx #fff;
					flex-shrink: 0;
				}
				.header-content-info {
					width: 100%;
					margin-left: 30rpx;
					.header-content-name{
						font-size: 32rpx;
						color: #fff;
					}
					.header-content-tips{
						margin-top: 25rpx;
						font-size: 22rpx;
						color: #fff;
						opacity: .8;
					}
				}
				
				.header-content-attention-btn-box {
					flex-shrink: 0;
					.attention-btn,
					.attention-btn-plain {
						width: max-content;
						padding: 15rpx 30rpx;
						font-size: 26rpx;
						color: #fff;
						border: solid 1rpx #fff;
						border-radius: 50rpx;
					}
					.attention-btn {
						border: none;
					}
				}
			}
			
			.header-content-bottom {
				width: 100%;
				padding: 30rpx;
				.header-content-bottom-item{
					margin-top: 30rpx;
					font-size: 22rpx;
					color: #fff;
					&:first-child {
						margin-top: 0rpx;
					}
				}
			}
			
			.header-content-bottom-line{
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
				height: 50rpx;
				border-radius: 50rpx 50rpx 0rpx 0rpx;
			}
		}
	}
	
	.content-box {
		padding: 0rpx 30rpx 50rpx 30rpx;
		.content-title-box {
			display: flex;
			align-items: center;
			.content-title-icon {
				width: 5rpx;
				height: 28rpx;
				background: linear-gradient(180deg, #007BFF 0%, #b3c8ff 100%);
				border-radius: 5rpx;
			}
			.content-title-text {
				font-size: 34rpx;
				font-weight: 500;
				margin-left: 20rpx;
			}
		}
	}

	.back {
		width: 100%;

		image {
			width: 100%;
		}
	}

	.avatar {
		border-radius: 50%;
		overflow: hidden;
		width: 116rpx;
		height: 116rpx;
		margin: -58rpx auto 0;

		image {
			width: 100%;
		}
	}

	.artist_info {
		display: flex;
		// color: #111111;
		font-size: 32rpx;
		font-weight: bold;
		float: right;
		width: 100%;
		margin-top: 30rpx;

		.artist_name {
			position: relative;
			display: flex;
			width: 100%;
			justify-content: flex-end;

			view:nth-child(1) {
				position: absolute;
				position: absolute;
				left: 50%;
				transform: translate(-50%)
			}
		}

		.focuson {
			width: 100rpx;
			height: 46rpx;
			border: 1px solid #764E39;
			color: #764E39;
			font-size: 22rpx;
			text-align: center;
			line-height: 46rpx;
			border-radius: 24rpx;
			font-weight: 500;
			margin-right: 30rpx;
		}

		.unsubscribe {
			width: 120rpx;
			height: 46rpx;
			line-height: 46rpx;
			text-align: center;
			border-radius: 24rpx;
			border: 1px solid #A2A2A2;
			// color: #999999;
			font-size: 22rpx;
			font-weight: 500;
			margin-right: 30rpx;
		}
	}

	.earnings {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 100rpx;

		.earnings_item {
			display: flex;
			align-items: center;
			font-size: 26rpx;

			view:nth-child(1) {
				// color: #764E39;
				font-weight: bold;
			}

			view:nth-child(2) {
				// color: #666666;
				font-weight: bold;
				margin-left: 8rpx;
				font-weight: 500;
			}
		}

		.earnings_item:nth-child(2) {
			margin-left: 70rpx;
		}
	}

	.introduce {
		margin: 40rpx 30rpx;
		// background-color: #fff;
		border-radius: 20rpx;
		padding: 40rpx 30rpx 48rpx;

		.title {
			font-size: 32rpx;
			// color: #111111;
			font-weight: bold;
		}

		.content {
			margin-top: 42rpx;
			// color: #666666;
			font-size: 26rpx;
			line-height: 1.8;
			text{
				margin-left: 50rpx;
				color: blue;
			}
		}
		
		
	}

	.featured {
		// background-color: #FAF6F4;
		margin: 30rpx 30rpx 0 30rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		// padding-bottom: 60rpx;

		.featured_item {
			border-radius: 20rpx;
			width: 334rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			position: relative;

			.plan {
				width: 100%;
				height: 336rpx;
				overflow: hidden;
				display: flex;
				align-items: center;
			}

			.featured_content {
				// background-color: #fff;
				padding: 30rpx 24rpx;

				.cont_header {
					display: flex;
					// color: #111111;
					font-size: 24rpx;
					align-items: center;

					.avatar_img {
						width: 44rpx;
						height: 44rpx;
						border-radius: 50rpx;
						margin-right: 25rpx;
						overflow: hidden;
					}

					image {
						width: 100%;
					}
				}

				.cont_title {
					margin-top: 30rpx;
					// color: #111111;
					font-size: 28rpx;
					font-weight: bold;
				}

				.cont_price {
					// color: red;
					font-size: 34rpx;
					font-weight: bold;
					margin-top: 40rpx;

					text {
						font-size: 22rpx;
					}
				}
			}

			.like {
				width: 46rpx;
				height: 46rpx;
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				// background-color: rgba(255, 255, 255, .5);
				text-align: center;
				line-height: 46rpx;

				image {
					width: 40rpx;
				}
			}

			.presale {
				position: absolute;
				// color: #EEB32E;
				font-size: 22rpx;
				top: 290rpx;
				left: 18rpx;
			}

			.type {
				position: absolute;
				// color: #fff;
				font-size: 20rpx;
				top: 290rpx;
				right: 18rpx;
			}
		}
	}
	
	.url{
		color: royalblue !important;
	}
</style>
