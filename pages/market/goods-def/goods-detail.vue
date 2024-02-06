<template>
	<view class="page" :class="getThemeClass">
		<!-- <unavbar title="详情">
			<template #like>
				<view class="title_right">
					<image v-if="!curScreenStyle && userId != authors.user_id"
						:src="goodsData.like_status?'../../../static/images/heart2.png':'../../../static/images/heart1.png'"
						mode="widthFix" @click="likeCli(product_pre.id)"></image>
					<image v-if="curScreenStyle && userId != authors.user_id"
						:src="goodsData.like_status?'../../../static/images/darkLike1.png':'../../../static/images/darkLike0.png'"
						mode="widthFix" @click="likeCli(product_pre.id)">
					</image>
					<view class="like_num" v-if="userId != authors.user_id">{{product_pre.collect}}</view>
					<image @click="shareCli"
						:src="curScreenStyle?'../../../static/images/darkShare.png':'../../../static/images/share.png'"
						mode="widthFix"></image>
				</view>
			</template>
		</unavbar> -->
		<!-- 顶部照片/铸品名称/铸品简介 -->
		<view class="head">
			<view class="gap-30"></view>
		<!-- 	<view class="flex justify-center align-center">
			    <view class="detail-coverimg" :style="{'background-image':'url('+product_pre.products_cover+')'}"></view>
			</view> -->
			<view class="flex justify-center align-center">
				
				<view class="detail-coverimg flex justify-center align-center card-bg">
					<template v-if="type == 1">
						<template v-if="product_pre.display_mode == 1">
							<ay-cubic :img="product_pre.products_cover" @click="myPreviewImage(product_pre.products_cover)" />
						</template>
						<template v-else>
							<!-- <view
								class="detail-coverimg" 
								:style="{'background-image':'url('+product_pre.products_cover+')'}"
								@click="myPreviewImage(product_pre.products_cover)"
								v-else
							></view> -->
							<image
								class="detail-coverimg-image" 
								:src="product_pre.products_cover"
								 @click="myPreviewImage(product_pre.products_cover)"
								mode="aspectFit"
							></image>
						</template>
					</template>
					
					<template v-if="type == 2">
						<my-music-card
							:musicUrl="product_pre.products_cover" 
							:coverUrl="product_cast.cover"
							:themeName="getThemeName"
						/>
					</template>
					
					<template v-if="type == 3">
						<my-video-card
							:videoUrl="product_pre.products_cover" 
							:coverUrl="product_cast.cover" 
							:videoTitle="product_pre.products_titl"
						/>
					</template>
					
				</view>
			</view>
			<view class="head_main card-bg">
				<view class="main_flex align-center">
					<view class="main_name">{{product_pre.products_title}}</view>
					<view class="instock text-tips u-flex align-center">
						<text class="u-m-r-10" style="flex-shrink: 0;" v-if="product_pre.tab_no">编号：#{{product_pre.tab_no}}</text>
						<!-- <u-icon class="u-m-l-10" size="25" name="arrow-right"></u-icon> -->
						
						<!-- <botBtn
							v-if="product_pre.products_status == 0"
							padding="5rpx 10rpx"
							radius="10rpx"
							fontSize="22rpx"
							@click="showSerialNumberList = true"
						>查看全部编号</botBtn> -->
					</view>
				</view>
				<view class="">
					<my-rarity margin="30rpx 0rpx 0rpx 0rpx" :type="product_pre.rarity_type" />
				</view>
				<!-- <view class="content">
					<u-parse :html="product_cast.desc"></u-parse>
				</view> -->
				<view class="main_flex margin-top-30">
					<view class="instock text-content">发行总量：{{product_pre.total_issue}}件</view>
					<view class="instock text-content">流通量：{{product_cast.turnover}}</view>
					<view class="instock text-content" v-if="product_pre.class_name">分类：{{product_pre.class_name}}</view>
				</view>
			</view>
		</view>
		
		<!-- 作者信息 -->
		<view class="author card-bg">
			<view class="author_top">
				<!-- 头像/名字/粉丝 -->
				<view class="author_top_left" @click="authorInfo">
					<!-- 头像 -->
					<view class="avatar">
						<image :src="authors.avatar||'/static/logo.png'" mode="widthFix"></image>
					</view>
					<view class="active_info">
						<!-- 名字 -->
						<view class="active_name ">
							{{authors.nickname}}
							<image class="arrow" src="../../../static/images/rightArrow.png" mode="widthFix"></image>
						</view>
						<view class="fans text-content">
							<!-- 粉丝 -->
							{{authors.fans}} {{i18n.goods1}}
						</view>
					</view>
				</view>
				<!-- 关注 -->
				<view v-if="curScreenStyle && userId != authors.user_id" @click="focuson(authors.user_id)"
					:class="goodsData.status?'focus-btn-bg':'focus-no-btn-bg-bg'">
					<!-- 取消关注：关注 -->
					{{goodsData.status? i18n.goods9 :  '+' + i18n.goods10}}
				</view>
				<view v-if="!curScreenStyle && userId != authors.user_id" @click="focuson(authors.user_id)"
					:class="goodsData.status?'focus-btn-bg':'focus-no-btn-bg-bg'">
					<!-- 取消关注：关注 -->
					{{goodsData.status?i18n.goods9 :  '+' + i18n.goods10}}
				</view>
			</view>
			<!-- 个人介绍 -->
			<view class="active_content">
				{{authors.introduction}}
			</view>
		</view>
		
		<view class="certification card-bg">
			<mytitle :text="i18n.goods2" class="my_title"></mytitle>
			<view class="info_item border-color">
				<view class="item_name text-call">{{i18n.goods4}}</view>
				<view class="item_value">
					<view class="item_valuetext">
						<!-- {{product_cast.contract_address}} -->
						{{ $myAppConfig.NFTAddress }}
					</view>
					<image class="copy_img" 
					@click="copy($myAppConfig.NFTAddress)" 
					src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="info_item border-color">
				<!-- NFT铸造品ID号 -->
				<view class="item_name text-call">{{i18n.goods5}}</view>
				<view class="item_value">
					<view class="item_valuetext color-main">
						<!-- {{product_pre.nft_id}} -->
						{{product_pre.mint_tx}}
					</view>
					<!-- <image class="copy_img" @click="copy(product_pre.nft_id)" src="../../../static/images/copy.png" mode="widthFix"></image> -->
					<image class="copy_img" @click="copy(product_pre.mint_tx)" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- <view class="info_item" v-if="false">
				<view class="item_name">藏品类别</view>
				<view class="item_value">
					<view class="item_valuetext" style="color: #A11716;">{{product_cast.nft_class}}</view>
				</view>
			</view> -->
			<view class="info_item border-color">
				<!-- NFT认证协议 -->
				<view class="item_name text-call">{{i18n.goods6}}</view>
				<view class="item_value">{{ $myAppConfig.NFTAgreement }}</view>
			</view>
			<view class="info_item border-color">
				<view class="item_name text-call">{{i18n.goods7}}</view>
				<view class="item_value">{{ $myAppConfig.NFTNetwork }}</view>
			</view>
		</view>
		
		<view class="main-card u-m-l-30 u-m-r-30">
			<mytitle text="藏品详情" class="my_title"></mytitle>
			<u-parse :html="product_cast.desc" class="u-m-t-20"></u-parse>
		</view>

		<!-- 作者信息 -->
		<view class="author" v-if="false">
			<view class="author_top">
				<!-- 头像/名字/粉丝 -->
				<view class="author_top_left" @click="authorInfo">
					<!-- 头像 -->
					<view class="avatar">
						<image :src="authors.avatar" mode="widthFix"></image>
					</view>
					<view class="active_info">
						<!-- 名字 -->
						<view class="active_name">
							{{authors.nickname}}
							<image class="arrow" src="../../../static/images/rightArrow.png" mode="widthFix"></image>
						</view>
						<view class="fans">
							<!-- 粉丝 -->
							{{authors.fans}} {{i18n.goods1}}
						</view>
					</view>
				</view>
				<!-- 关注 -->
				<view v-if="curScreenStyle && userId != authors.user_id" @click="focuson(authors.user_id)"
					:class="goodsData.status?'unsubscribe':'focuson'">
					<!-- 取消关注：关注 -->
					{{goodsData.status?i18n.goods9:i18n.goods10}}
				</view>
				<view v-if="!curScreenStyle && userId != authors.user_id" @click="focuson(authors.user_id)"
					:class="goodsData.status?'unsubscribe':'focuson'">
					<!-- 取消关注：关注 -->
					{{goodsData.status?i18n.goods9:i18n.goods10}}
				</view>
			</view>
			<!-- 个人介绍 -->
			<view class="active_content">
				{{authors.introduction}}
			</view>
		</view>

		<!-- 认证信息 -->
		<view class="certification" v-if="false">
			<mytitle :text="i18n.goods2" class="my_title"></mytitle>
			<view class="info_item">
				<!-- 权益属性 -->
				<view class="item_name">{{i18n.goods3}}</view>
				<view class="item_value">{{product_pre.total_issue==1?i18n.goods11:i18n.goods12}}</view>
			</view>
			<view class="info_item">
				<view class="item_name">{{i18n.goods4}}</view>
				<view class="item_value">
					<view class="item_valuetext">
						{{product_pre.contract_address}}
					</view>
					<image class="copy_img" @click="copy(product_pre.contract_address)" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="info_item">
				<!-- NFT铸造品ID号 -->
				<view class="item_name">{{i18n.goods5}}</view>
				<view class="item_value">
					<view class="item_valuetext">
						{{product_pre.mint_tx}}
					</view>
					<image class="copy_img" @click="copy(product_pre.mint_tx)" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="info_item">
				<!-- NFT认证协议 -->
				<view class="item_name">{{i18n.goods6}}</view>
				<view class="item_value">ERC721</view>
			</view>
			<view class="info_item">
				<view class="item_name">{{i18n.goods7}}</view>
				<view class="item_value">Polygon</view>
			</view>
		</view>
		<!-- 权益说明 -->
		<explain :text="i18n.blindboxdef4" :cont="note.power_note"></explain>
		<view class="gap-100"></view>
		<!-- 购买须知 -->
		<!-- <explain :text="i18n.blindboxdef5" :cont="note.buy_note"></explain> -->

		<view class="move-btn bg-cayn detail-botbtn text-default" @click="$u.route(`/pages/market/goods-def/goods-poster`,{id})" v-if="product_pre.products_type==0">
			藏品证书
		</view>
		<u-popup v-model="show" mode="bottom" height="524rpx">
			<view class="popup_title">{{i18n.goods15}}</view>
			<view class="popup_flex">
				<view class="popup_item">
					<image src="../../../static/images/weibo.png" mode="widthFix"></image>
					<!-- 微博 -->
					<view class="popup_text">{{i18n.goods16}}</view>
				</view>
				<view class="popup_item">
					<image src="../../../static/images/weChat.png" mode="widthFix"></image>
					<!-- 微信 -->
					<view class="popup_text">{{i18n.goods17}}</view>
				</view>
				<view class="popup_item">
					<image src="../../../static/images/lockup.png" mode="widthFix"></image>
					<!-- 朋友圈 -->
					<view class="popup_text">{{i18n.goods18}}</view>
				</view>
			</view>
			<!-- 取消 -->
			<button class="cancel" type="default" @click="cancelCli">{{i18n.goods19}}</button>
		</u-popup>
		<!-- 安全密码-弹出框 -->
		<pwdPay :stauts="payStatus" @closeMain="closeMain"></pwdPay>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import explain from '../../../components/explain.vue'
	export default {
		components: {
			explain
		},
		data() {
			return {
				// 用户信息
				user: {
					id: 1,
					// 关注状态
					follow: false
				},
				show: false,
				collect: false,
				likeNum: 1235,
				// 安全密码支付-弹出框
				payStatus: {
					show: false,
					url: 2
				},
				goodsData: {}, //商品详情信息总和
				product_pre: {}, //商品信息
				product_cast: {}, //铸造信息
				authors: {}, //艺术家信息
				note: {}, //购买权益相关
				userId: null, //用户ID
				
				id: 0,
				type: 1,
			};
		},
		onLoad(option) {
			if (option.id) {
				this.getUserid()
				this.id = option.id
				this.produictDet(option.id)
				// this.history(option.id)
			}
		},
		onPullDownRefresh() {
			this.produictDet(this.id)
		},
		methods: {
			history(id) { //增加历史记录
				this.$u.api.history({
					'id': id
				}).then(res => {

				}).catch(err => {

				})
			},
			getUserid() {
				this.userId = uni.getStorageSync("id");
			},
			produictDet(id) {
				this.$u.api.my_object_detail({
					'id': id
				}).then(res => {
					if (res.code == 200) {
						
						this.goodsData = res.data
						this.product_pre = res.data.product_pre
						this.product_cast = res.data.product_cast
						this.authors = res.data.authors
						this.note = res.data.note
						this.type = res.data.product_cast.type
						uni.stopPullDownRefresh()
					}
				}).catch(err => {

				})
			},
			// 分享
			shareCli() {
				this.show = true
			},
			// 分享取消
			cancelCli() {
				this.show = false
			},
			// 立即购买按钮	
			buy() {
				if (this.userId == this.product_pre.user_id) {
					this.$refs.uToast.show({
						// 不能购买自己的作品
						title: this.i18n.goods8,
						type: 'error',
					})
					return false
				}

				uni.navigateTo({
					url: '../casting-buy/casting-buy?id=' + this.product_pre.id
				})

				// if (this.payStatus.show) {
				// 	this.payStatus.show = false
				// 	return
				// }
				// this.payStatus.show = true
			},
			// 收藏/数量
			likeCli(id) {
				let that = this
				if (!this.goodsData.like_status) {
					that.$u.api.like_add({
						'id': id
					}).then(res => {
						this.goodsData.like_status = 1
						this.product_pre.collect = this.product_pre.collect + 1
					}).catch(err => {})
				} else {
					that.$u.api.like_del({
						'id': id
					}).then(res => {
						this.goodsData.like_status = 0
						this.product_pre.collect = this.product_pre.collect - 1
					}).catch(err => {})
				}
			},
			// 监听弹窗打开状态
			closeMain(val) {
				this.payStatus.show = val
			},
			// 作者头像/名称点击事件
			authorInfo() {
				uni.navigateTo({
					url: '../artist-space/artist-space?id=' + this.product_pre.products_cast_id
				})
			},
			// 关注/取消关注
			focuson(id) {
				// status为0 = 没关注
				if (!this.goodsData.status) {
					this.$u.api.attention({
						'user_id': id
					}).then(res => {
						this.goodsData.status = 1
					}).catch(err => {})
				} else {
					this.$u.api.callback_attention({
						'user_id': id
					}).then(res => {
						this.goodsData.status = 0
					}).catch(err => {})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

	.page-black {
		// background-color: #1E2020;

		.like_num {
			// color: #FFFFFF !important;
		}

		.head_main {
			// background-color: #292B2B !important;

			.main_name {
				// color: #FFFFFF;
			}

			.content {
				// color: #E0E0E0 !important;
			}
		}

		.main_name {
			// color: #FFFFFF !important;
		}

		.author {
			// background-color: #292B2B;

			.active_name {
				// color: #FFFFFF !important;
			}

			.active_content {
				// color: #E0E0E0;
			}
		}

		.certification {
			// background-color: #292B2B;
		}

		.item_valuetext,
		.item_value {
			// color: #FFFFFF !important;
		}

		.buy {
			// background-color: #292B2B;

			.price_text {
				// color: #FFFFFF !important;
			}

			.price_number {
				color: #F7924C;
			}

			.buy_btn {
				background-color: #F7924C;
			}
		}

		// .focuson {
		// 	color: #F7924C !important;
		// 	border: 1px solid #F7924C !important;
		// }

		// /deep/.u-drawer-bottom {
		// 	background-color: #303131;
		// }

		// .popup_text {
		// 	color: #FFFFFF !important;
		// }

		// .cancel {
		// 	background-color: #FD8C46;
		// }
	}

	.title_right {
		display: flex;
		align-items: center;

		.like_num {
			// color: #333333;
			font-size: 26rpx;
			margin: 0 36rpx 0 12rpx;
		}

		image {
			width: 38rpx;
		}
	}

	.head {
		image {
			width: 100%;
			height: 750rpx !important;
			box-sizing: border-box;
		}

		.head_main {
			// transform: translateY(-60rpx);
			border-radius: 20rpx;
			// background-color: #fff;
			margin: 30rpx;
			padding: 40rpx 32rpx;

			.main_flex {
				display: flex;
				justify-content: space-between;

				.main_name {
					font-size: 32rpx;
					font-weight: bold;
					// color: #111111;
				}

				.instock {
					font-size: 24rpx;
					// color: #999999;
				}
			}

			.content {
				// color: #666666;
				font-size: 26rpx;
				margin-top: 42rpx;
			}
		}
	}

	.author {
		margin: 24rpx 30rpx;
		border-radius: 20rpx;
		// background-color: #fff;
		padding: 34rpx 30rpx 40rpx;

		.author_top {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.author_top_left {
				display: flex;
				align-items: center;

				.avatar {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					overflow: hidden;

					image {
						width: 100%;
					}
				}

				.active_info {
					margin-left: 24rpx;

					.active_name {
						// color: #111111;
						font-size: 28rpx;
						font-weight: bold;

						.arrow {
							width: 12rpx;
							margin-left: 14rpx;
						}
					}

					.fans {
						margin-top: 16rpx;
						font-size: 22rpx;
						// color: #999999;
					}

				}
			}

			.focuson {
				width: 100rpx;
				height: 46rpx;
				border: 1px solid;
				// color: #764E39;
				font-size: 22rpx;
				text-align: center;
				line-height: 46rpx;
				border-radius: 24rpx;
				font-weight: 500;
				// margin-right: 30rpx;
			}

			.unsubscribe {
				width: 120rpx;
				height: 46rpx;
				line-height: 46rpx;
				text-align: center;
				border-radius: 24rpx;
				border: 1px solid;
				// color: #999999;
				font-size: 22rpx;
				font-weight: 500;
				// margin-right: 30rpx;
			}
		}

		.active_content {
			// color: #666666;
			font-size: 26rpx;
			margin-top: 38rpx;
			line-height: 1.6;
		}
	}

	.certification {
		// background-color: #fff;
		margin: 24rpx 30rpx;
		border-radius: 20rpx;
		padding: 32rpx 30rpx 0;

		.info_item {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1rpx;
			&:last-child {
				border-bottom: none;
			}

			.item_name {
				// color: #999999;
				font-size: 27rpx;
				width: 280rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.item_value {
				display: flex;
				align-items: center;
				// color: #333333;
				font-size: 29rpx;
				justify-content: flex-end;
			}

			.item_valuetext {
				width: 300rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: right;
			}

			.copy_img {
				width: 22rpx;
				margin-left: 20rpx;
			}
		}

		// .info_item+.info_item {
		// 	border-top: 1px solid;
		// }
	}

	.buy {
		height: 110rpx;
		// background-color: #fff;
		margin-top: 52rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 24rpx 0 32rpx;
		width: 750rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;

		.price {
			display: flex;
			align-items: center;
			color: #A11716;

			.price_text {
				color: #333333;
				font-size: 26rpx;
			}

			.price_number {
				font-size: 38rpx;
				margin-left: 18rpx;

				.symbol {
					font-size: 24rpx;
				}
			}
		}

		.buy_btn {
			width: 200rpx;
			height: 78rpx;
			// background-color: #764E39;
			color: #fff;
			line-height: 78rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
		}

		// 已售罄
		.soldout {
			// background-color: #D2D2D2;
		}
	}

	.popup_title {
		font-size: 30rpx;
		// color: #999999;
		text-align: center;
		margin-top: 54rpx;
	}

	.popup_flex {
		display: flex;
		justify-content: space-around;
		margin-top: 86rpx;

		.popup_item {
			display: flex;
			flex-direction: column;
			align-items: center;


			image {
				width: 90rpx;
			}

			.popup_text {
				// color: #333333;
				font-size: 24rpx;
				margin-top: 20rpx;
			}
		}
	}

	.cancel {
		margin: 90rpx 30rpx 0;
		// background-color: #764E39;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		color: #fff;
		font-size: 32rpx;
		border-radius: 10rpx;
	}
</style>
