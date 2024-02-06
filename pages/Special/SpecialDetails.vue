<template>
	<view class="page" :class="getThemeClass">
		<unavbar title="详情" v-if="false">
			<!-- <template #like>
				<view class="title_right">
					<image @click="share"
						:src="curScreenStyle?'../../static/images/darkShare.png':'../../static/images/share.png'"
						mode="widthFix"></image>
				</view>
			</template> -->
		</unavbar>
		<!-- 顶部照片/铸品名称/铸品简介 -->
		<view class="head">
			<!-- <view class="gap-30"></view> -->
			<view class="flex justify-center align-center">
				<view class="detail-coverimg flex justify-center align-center" v-if="product_cast.display_mode == 1">
					<ay-cubic :img="product_cast.cover" />
				</view>
			 <!-- <view 
					class="detail-coverimg" 
					:style="{'background-image':'url(' + product_cast.cover + ')'}" 
					v-else
				></view> -->
				<view class="detail-coverimg flex justify-center align-center" v-else>
					<image class="detail-coverimg-image" :src="product_cast.cover" mode="aspectFit"></image>
				</view>
			</view>
			<view class="head_main3d card-bg text-center" @click="gothreed" v-if="product_cast.modeling">查看3D展示</view>
			<view class="head_cent">
				<view class="head_upperpart">
					<view class="price_number">
						{{product_cast.up_price}}
						<text class="symbol">USDT</text>
					</view>
				</view>
				<view class="head_main card-bg">
					<view class="main_flex">
						<view class="main_name">{{product_cast.title}}</view>
						<view class="instock text-tips">
							<!-- <text>编号：{{product_cast.tab_no}}</text> -->
						</view>
					</view>
					<view class="flex align-center u-m-t-30">
						<my-rarity margin="0rpx 30rpx 0rpx 0rpx" :type="product_cast.rarity_type" />
						<view class="xiangou" v-if="product_cast.vip_ids">VIP{{product_cast.vip_ids}}可买</view>
						<view class="xiangou u-m-l-20" v-if="product_cast.user_max_num">限购{{product_cast.user_max_num}}份</view>
						<view class="xiangou u-m-l-20" v-if="product_cast.rate_return">回报率：{{product_cast.rate_return}}%</view>
						<my-u-tag
							text="实物"
							bg-color="#43d189"
							color="#d3efda"
							border-color="#98e7be"
							size="default"
							class="my-u-tag"
							v-if="product_cast.has_goods==1"
						/>
					</view>
					<!-- <view class="content">
						<u-parse :html="product_cast.desc"></u-parse>
					</view> -->
					<view class="main_flex u-m-t-30 text-content">
						<view class="instock text-content u-flex-col align-center">
							<text>发行总量</text>
							<text class="u-m-t-5">{{product_cast.total_issue}}件</text>
						</view>
						<!-- 真实库存 -->
						<!-- <view class="instock text-content u-flex-col align-center">
							<text>剩余库存</text>
							<text>{{product_cast.sur_issue}}件</text>
						</view> -->
						<!-- 虚假库存 -->
						<view class="instock text-content u-flex-col align-center">
							<text>剩余库存</text>
							<text class="u-m-t-10">{{product_cast.inventory}}件</text>
						</view>
						<view class="instock text-content u-flex-col align-center">
							<text>流通量</text>
							<text class="u-m-t-10">{{product_cast.turnover}}件</text>
						</view>
						<view class="instock text-content u-flex-col align-center">
							<text>分类</text>
							<text class="u-m-t-10">{{product_cast.class_name}}</text>
						</view>
						<view class="instock text-content u-flex-col align-center">
							<text>冻结时间</text>
							<text class="u-m-t-10">{{product_cast.sale_expire? `${product_cast.sale_expire}天` : '无'}}</text>
						</view>
						
						
						<!-- <view class="instock text-content">发行总量：{{product_cast.total_issue}}件</view> -->
						<!-- 真实库存 -->
						<!-- <view class="instock">剩余库存：{{product_cast.sur_issue}}件</view> -->
						<!-- 虚假库存 -->
						<!-- <view class="instock text-content">剩余库存：{{product_cast.inventory}}件</view>
						<view class="instock text-content">流通量：{{product_cast.turnover}}</view>
						<view class="instock text-content">分类：{{product_cast.class_name}}</view> -->
					</view>
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
						<view class="active_name">
							{{authors.nickname}}
							<image class="arrow" src="../../static/images/rightArrow.png" mode="widthFix"></image>
						</view>
						<view class="fans">
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

		<mytitle :text="i18n.goods2" class="my_title"></mytitle>
		<view class="certification card-bg">
			<view class="info_item border-color">
				<view class="item_name text-content">{{i18n.goods4}}</view>
				<view class="item_value">
					<view class="item_valuetext">
						<!-- {{product_cast.contract_address}} -->
						{{ $myAppConfig.NFTAddress }}
					</view>
					<image class="copy_img" 
					@click="copy($myAppConfig.NFTAddress)" 
					src="../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="info_item border-color">
				<!-- NFT铸造品ID号 -->
				<view class="item_name text-content">{{i18n.goods5}}</view>
				<view class="item_value">
					<view class="item_valuetext color-red">
						购买后确认
					</view>
				</view>
			</view>
			<!-- <view class="info_item border-color" v-if="false">
				<view class="item_name text-content">藏品类别</view>
				<view class="item_value">
					<view class="item_valuetext" style="color: #A11716;">{{product_cast.nft_class}}</view>
				</view>
			</view> -->
			<view class="info_item border-color">
				<!-- NFT认证协议 -->
				<view class="item_name text-content">{{i18n.goods6}}</view>
				<view class="item_value">{{ $myAppConfig.NFTAgreement }}</view>
			</view>
			<view class="info_item border-color">
				<view class="item_name text-content">{{i18n.goods7}}</view>
				<view class="item_value">{{ $myAppConfig.NFTNetwork }}</view>
			</view>
		</view>
		<!-- 藏品详情 -->
		<explain text="作品详情" :cont="product_cast.desc"></explain>
			<!-- <mytitle text="作品详情" class="my_title"></mytitle>
		<view class="main-card u-m-l-30 u-m-r-30 u-m-t-30 u-m-b-30">
			<u-parse :html="product_cast.desc" @imgtap="e => e.ignore()" class="u-m-t-20"></u-parse>
		</view> -->
		
		<!-- 认证信息 -->
		<view class="certification" v-if="false">
			<mytitle :text="i18n.goods2" class="my_title"></mytitle>
			<view class="info_item">
				<view class="item_name">{{i18n.goods4}}</view>
				<view class="item_value">
					<view class="item_valuetext">
						{{product_cast.contract_address}}
					</view>
					<image class="copy_img" @click="copy(product_cast.contract_address)" src="../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="info_item">
				<!-- NFT铸造品ID号 -->
				<view class="item_name">{{i18n.goods5}}</view>
				<view class="item_value">
					<view class="item_valuetext" style="color: #A11716;">
						待确认
					</view>
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
		<!-- 购买须知 -->
		<explain :text="i18n.blindboxdef5" :cont="note.buy_note"></explain>
	<view class="gap-200"></view>
		<!-- 立即购买 -->
		<view class="buy card-bg border-color">
			<view class="buy-content">
				<view class="price">
					<!-- 价格 -->
					<view class="price_text text-main">
						{{i18n.goods13}}:
					</view>
					<view class="price_number" style="color: #E21362;">
						{{product_cast.up_price}}
						<text class="symbol">USDT</text>
					</view>
				</view>
				<view class="">
					<botBtn
						v-if="product_cast.inventory === 0 || product_cast.show_type === 3"
						padding="20rpx 60rpx"
						radius="50rpx"
						disabled
					>已售罄</botBtn>
					<botBtn
						@click="buy"
						padding="20rpx 60rpx"
						radius="50rpx"
						v-else
					>立即购买</botBtn>
				</view>
			</view>
			
		</view>
		
		<u-popup v-model="show" mode="bottom" height="524rpx">
			<view class="popup_title">{{i18n.goods15}}</view>
			<view class="popup_flex">
				<view class="popup_item">
					<image src="../../static/images/weibo.png" mode="widthFix"></image>
					<!-- 微博 -->
					<view class="popup_text">{{i18n.goods16}}</view>
				</view>
				<view class="popup_item">
					<image src="../../static/images/weChat.png" mode="widthFix"></image>
					<!-- 微信 -->
					<view class="popup_text">{{i18n.goods17}}</view>
				</view>
				<view class="popup_item">
					<image src="../../static/images/lockup.png" mode="widthFix"></image>
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
		
		
		<create-poster ref="poster" :avatar="avatar" :qrVal="QRcode" :inviteBg="backImg" @finish="finish"></create-poster>
	</view>
</template>

<script>
	import explain from '../../components/explain.vue'
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
				product_cast: {}, //商品信息
				authors: {}, //艺术家信息
				note: {}, //购买权益相关
				userId: null, //用户ID
				
				first_diff:0,
				user_is_first:0,
				user_lucky_status:0,
				
				id:'',
				
				new_type:0,
				
				avatar: '',
				QRcode: '',
				backImg: '',
				posturl: '',
				vip:0
			};
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
				this.vip = Number(option.vip)+1
				this.getUserid()
			}
		},
		onShow() {
			this.produictDet(this.id)
		},
		methods: {
			share(){
				if (this.posturl) {
					uni.previewImage({
						urls: [this.posturl]
					});
				} else {
					this.$refs.poster.create();
				}
			},
			gothreed(){
				uni.navigateTo({
					url:`/pages/threeD/threeD?url=${this.product_cast.modeling}`
				})
			},
			finish(data) {
				this.posturl = data.url;
			},
			getUserid() {
				this.userId = uni.getStorageSync("id");
			},
			produictDet(id) {
				this.$u.api.vip_product_detail({
					'cast_id': id
				}).then(res => {
					if (res.code == 200) {
						this.user_lucky_status = res.data.user_lucky_status
						this.new_type = res.data.product_cast.new_type
						this.first_diff = res.data.first_diff
						this.user_is_first = res.data.user_is_first
						this.goodsData = res.data
						this.product_cast = res.data.product_cast
						this.authors = res.data.authors
						this.note = res.data.note
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
			// 立即购买按钮	 this.product_cast.id
			buy(data) {
				uni.navigateTo({
					url:`/pages/Special/Special-buy?id=${this.product_cast.id}`
				})
			},
			// 收藏/数量
			likeCli(id) {
				let that = this
				if (!this.goodsData.like_status) {
					that.$u.api.like_add({
						'id': id
					}).then(res => {
						this.goodsData.like_status = 1
						this.product_cast.collect = this.product_cast.collect + 1
					}).catch(err => {})
				} else {
					that.$u.api.like_del({
						'id': id
					}).then(res => {
						this.goodsData.like_status = 0
						this.product_cast.collect = this.product_cast.collect - 1
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
					url: '../artist-space/artist-space?id=' + this.authors.id
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
	.xiangou{
		padding: 8rpx 10rpx;
		border-radius: 10rpx;
		font-size: 22rpx;
		border: 1rpx solid #EEEEEE;
		background-color: #EEEEEE;
		color: #090A0D;
	}
	.my-u-tag{
		// border-radius: 0rpx;
		transform: skewX(-15deg);
		/deep/ .u-tag-text {
			display: inline-block;
			// transform: skewX(15deg);
		}
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
		.head_main3d{
			// transform: translateY(-60rpx);
			border-radius: 20rpx;
			// background-color: #fff;
			margin: 30rpx;
			padding: 40rpx 32rpx;
		}
		.head_cent{
			padding-top: 80rpx;
			margin: 30rpx;
			position: relative;
		}
		.head_upperpart{
			width: 100%;
			height: 150rpx;
			background: linear-gradient(90deg, #696969 0%, #090A0D 100%);
			border-radius: 24rpx;
			position: absolute;
			top: 0;
			left: 0;
			.price_number {
				font-size: 38rpx;
				margin-top: 18rpx;
				margin-left: 18rpx;
				color: #fff;
				.symbol {
					font-size: 24rpx;
				}
			}
		}
		.head_main {
			width: 100%;
			// transform: translateY(-60rpx);
			border-radius: 20rpx;
			// background-color: #fff;
			padding: 40rpx 32rpx 40rpx;
			position: relative;
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
				border: 1px solid #764E39;
				color: #764E39;
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
				border: 1px solid #A2A2A2;
				color: #999999;
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
			border-bottom: solid 2rpx;
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
		// 	// border-top: 1px solid #F2F2F2;
		// }
	}

	.buy {
		// background-color: #fff;
		margin-top: 52rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 0 24rpx 0 32rpx;
		width: 750rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		border-top: solid 1rpx;
		padding: 15rpx 30rpx;
		
		.buy-countdown{
			font-size: 30rpx;
			// color: #764e39;
		}
		
		.buy-content{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			margin-top: 15rpx;
		}

		.price {
			display: flex;
			align-items: center;

			.price_text {
				// color: #333333;
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
			min-width: 200rpx;
			padding: 0 30rpx;
			height: 78rpx;
			background-color: #764E39;
			color: #fff;
			line-height: 78rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
		}

		// 已售罄
		// .soldout {
		// 	background-color: #D2D2D2;
		// }
	}

	.popup_title {
		font-size: 30rpx;
		color: #999999;
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
				color: #333333;
				font-size: 24rpx;
				margin-top: 20rpx;
			}
		}
	}

	.cancel {
		margin: 90rpx 30rpx 0;
		background-color: #764E39;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		color: #fff;
		font-size: 32rpx;
		border-radius: 10rpx;
	}
</style>
