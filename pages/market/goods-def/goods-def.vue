<template>
	<view class="page" :class="getThemeClass">
		<!-- <unavbar title="详情">
			<template>

			</template>
		</unavbar> -->
		<!-- 顶部照片/铸品名称/铸品简介 -->
		<view class="head">
			<!-- <view class="gap-30"></view> -->
			<view class="title_right">
				<image v-if="!curScreenStyle && userId != authors.user_id"
					:src="goodsData.like_status?'../../../static/images/heart2.png':'../../../static/images/heart1.png'"
					mode="widthFix" @click="likeCli(product_pre.id)"></image>
				<image v-if="curScreenStyle && userId != authors.user_id"
					:src="goodsData.like_status?'../../../static/images/darkLike1.png':'../../../static/images/darkLike0.png'"
					mode="widthFix" @click="likeCli(product_pre.id)">
				</image>
				<view class="like_num" v-if="userId != authors.user_id">{{product_pre.collect}}</view>
				<!-- <image @click="share"
					:src="curScreenStyle?'../../../static/images/darkShare.png':'../../../static/images/share.png'"
					mode="widthFix"></image> -->
			</view>
			<view class="flex justify-center align-center">
				<view class="detail-coverimg flex justify-center align-center card-bg" v-if="product_cast.display_mode == 1">
					<ay-cubic :img="product_pre.products_cover" />
				</view>
			  <!-- <view 
					class="detail-coverimg" 
					:style="{'background-image':'url('+product_pre.products_cover+')'}" 
					v-else
				></view> -->
				<view class="detail-coverimg flex justify-center align-center card-bg" v-else>
					<image class="detail-coverimg-image" :src="product_pre.products_cover" mode="aspectFit"></image>
				</view>		
			</view>
			<view class="head_cent">
				<view class="head_upperpart">
					<view class="price_number">
						<text class="symbol">￥</text>
						{{product_pre.price}}
					</view>
				</view>
				<view class="head_main card-bg">
					<view class="main_flex align-center">
						<view class="main_name">{{product_pre.products_title}}</view>
						<view class="instock text-tips u-flex align-center" v-if="product_pre.products_type == 0">
							<text class="u-m-r-10" style="flex-shrink: 0;">编号：#{{product_pre.tab_no}}</text>
							<!-- <u-icon class="u-m-l-10" size="25" name="arrow-right"></u-icon> -->
							
							<botBtn
								v-if="product_pre.products_status == 0"
								padding="5rpx 10rpx"
								radius="10rpx"
								fontSize="22rpx"
								@click="showSerialNumberList = true"
							>查看全部编号</botBtn>
						</view>
					</view>
					<view class="">
						<my-rarity margin="30rpx 0rpx 0rpx 0rpx" :type="product_pre.rarity_type" />
					</view>
					<!-- <view class="content">
						<u-parse :html="product_cast.desc"></u-parse>
					</view> -->
					<view class="main_flex margin-top-30">
						<view class="instock text-content u-flex-col align-center">
							<text>发行总量</text>
							<text class="u-m-t-5">{{product_pre.total_issue}}件</text>
						</view>
						<view class="instock text-content u-flex-col align-center">
							<text>流通量</text>
							<text class="u-m-t-10">{{product_cast.turnover}}件</text>
						</view>
						<view class="instock text-content u-flex-col align-center">
							<text>分类</text>
							<text class="u-m-t-10">{{product_pre.class_name}}</text>
						</view>
						<view class="instock text-content u-flex-col align-center">
							<text>冻结时间</text>
							<text class="u-m-t-10">{{product_pre.sale_expire? `${product_pre.sale_expire}分钟` : '无'}}</text>
						</view>
						
						<!-- <view class="instock text-content">发行总量：{{product_pre.total_issue}}件</view>
						<view class="instock text-content">流通量：{{product_cast.turnover}}</view>
						<view class="instock text-content">分类：{{product_pre.class_name}}</view> -->
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
				<view class="item_name text-call">{{i18n.goods4}}</view>
				<view class="item_value">
					<view class="item_valuetext">
						<!-- {{product_cast.contract_address}} -->
						{{$myAppConfig.NFTAddress}}
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
		
		<view class="u-p-l-30 u-p-r-30 u-m-t-30">
			<view class="u-font-36 text-bold u-m-b-40">价格行情</view>
			<view class="flex justify-between flex-wrap">
				<view class="card-bg goods-priceinfo">
					<view class="text-tips u-font-22">今日最高价</view>
					<view class="u-m-t-20 u-font-30 text-bold">{{price_info.today_max_price}}</view>
				</view>
				<view class="card-bg goods-priceinfo">
					<view class="text-tips u-font-22">今日最低价</view>
					<view class="u-m-t-20 u-font-30 text-bold">{{price_info.today_min_price}}</view>
				</view>
				<view class="card-bg goods-priceinfo">
					<view class="text-tips u-font-22">昨日收盘价</view>
					<view class="u-m-t-20 u-font-30 text-bold">{{price_info.yesterday_last_price}}</view>
				</view>
				<view class="card-bg goods-priceinfo">
					<view class="text-tips u-font-22">本周最低价</view>
					<view class="u-m-t-20 u-font-30 text-bold">{{price_info.week_min_price}}</view>
				</view>
				<view class="card-bg goods-priceinfo">
					<view class="text-tips u-font-22">本周最高价</view>
					<view class="u-m-t-20 u-font-30 text-bold">{{price_info.week_max_price}}</view>
				</view>
			</view>
		</view>
		<view class="u-p-l-30 u-p-r-30 u-m-t-30">
			<view class="u-font-36 text-bold u-m-b-40">价格趋势</view>
			<view class="goods-pricemap card-bg u-m-b-40">
				<view class="u-font-20 text-tips u-p-l-10">单位：元</view>
				<qiun-data-charts 
				      type="area"
				      :opts="opts"
				      :chartData="chartData"
				    />
			</view>
		</view>
		
		
		<mytitle text="藏品详情" class="my_title"></mytitle>
		<view class="main-card u-m-l-30 u-m-r-30 u-m-t-30">
			<u-parse :html="product_cast.desc" @imgtap="e => e.ignore()" class="u-m-t-20"></u-parse>
		</view>
		
		<view class="certification card-bg" @click="record()">
			<view class="flex align-center justify-between">
				<view class="size-30 text-bold">交易记录</view>
				<u-icon class="u_icon" name="arrow-right"></u-icon>
			</view>
			<!-- <mytitle text="交易记录" class="my_title"></mytitle>
			<view class="flex justify-between align-center margin-top-30" v-for="(item,index) in trade_list" :key="index">
				<image :src="item.avatar" mode="aspectFill" class="jl-avatar"></image>
				<view class="flex-1 margin-left-20">
					<view class="flex justify-between align-center size-26 margin-bottom-10">
						<view class="text-name">{{item.nickname}}</view>
						<view class="jl-price color-red">￥{{item.price}}</view>
					</view>
					<view class="flex justify-between align-center size-22 text-content">
						<view >{{init(item.phone)}}</view>
						<view >{{item.created_at}}</view>
					</view>
				</view>
			</view>
			<empty v-if="trade_list.length === 0" />
			<view class="gap-30"></view> -->
		</view>
		
		<!-- 权益说明 -->
		<explain :text="i18n.blindboxdef4" :cont="note.power_note"></explain>
		<!-- 购买须知 -->
		<explain :text="i18n.blindboxdef5" :cont="note.buy_note"></explain>
		<view class="gap-200"></view>
		<!-- 立即购买 -->
		<view class="buy card-bg border-color justify-between">
			<view class="">
				<view class="price">
					<!-- 价格 -->
					<!-- <view class="price_text text-main">
						{{i18n.goods13}}:
					</view> -->
					<view class="price_number">
						<text class="symbol">￥</text>
						{{product_pre.price}}
					</view>
				</view>
			</view>
			
			<view class="">
				<botBtn
					v-if="product_pre.products_status === 0"
					padding="20rpx 60rpx"
					radius="50rpx"
					@click="buy()"
				>立即购买</botBtn>
				
				<botBtn
					v-if="product_pre.products_status === 5"
					padding="20rpx 60rpx"
					radius="50rpx"
					disabled
				>锁单中</botBtn>
			</view>
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
		
		<serial-number-list
			v-model="showSerialNumberList"
			:goodsId="product_cast.id"
			:darkTheme="curScreenStyle"
			@clickItem="clickItem"
		/>
		
		<create-poster ref="poster" :avatar="avatar" :qrVal="QRcode" :inviteBg="backImg" @finish="finish"></create-poster>
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
				
				trade_list:[],
				
				avatar: '',
				QRcode: '',
				backImg: '',
				posturl: '',
				
				showSerialNumberList: false,
				goodsId: 0,
				
				price_info:{},
				chartData: {},
				opts: {
					color: ["#00E2E2"],
					padding: [15,15,0,0],
					enableScroll: false,
					legend: {},
					xAxis: {
					  disableGrid: true
					},
					yAxis: {
					  gridType: "dash",
					  dashLength: 2
					},
					extra: {
					  area: {
						type: "curve",
						opacity: 0.2,
						addLine: true,
						width: 2,
						gradient: true,
						activeType: "hollow"
					  }
					}
				}
			};
		},
		onLoad(option) {
			this.recommend();
			if (option.id) {
				this.getUserid()
				this.produictDet(option.id)
				this.history(option.id)
				this.goodsId = Number(option.id) || 0
			}
		},
		methods: {
			record(){
				uni.navigateTo({
					url:'/pages/market/goods-def/goods-record?id='+this.goodsId
				})
			},
			share(){
				if (this.posturl) {
					uni.previewImage({
						urls: [this.posturl]
					});
				} else {
					this.$refs.poster.create();
				}
			},
			finish(data) {
				this.posturl = data.url;
			},
			recommend() {
				this.$u.api
					.recommend()
					.then(res => {
						this.avatar = res.data.avatar;
						this.QRcode = res.data.url;
						this.backImg = res.data.share.pic;
					})
			},
			history(id) { //增加历史记录
				this.$u.api.history({
					'id': id
				}).then(res => {

				}).catch(err => {

				})
			},
			clickItem(item){
				// console.log(item);
				this.showSerialNumberList = false
				this.goodsId = item.id
				if(item.products_status === 0 && item.review_status === 1){
					this.produictDet(item.id)
					this.history(item.id)
				}else if(item.products_status === 2 && item.review_status === 1){
					uni.navigateTo({
						url:'../../market/goods-auctionDef/goods-auctionDef?id=' + item.id
					})
				}
				
			},
			init(num){
				return num.substr(0,3) + "****" + num.substr(7)
			},
			getUserid() {
				this.userId = uni.getStorageSync("id");
			},
			produictDet(id) {
				this.$u.api.product_detail({
					'id': id
				}).then(res => {
					if (res.code == 200) {
						this.goodsData = res.data
						this.product_pre = res.data.product_pre
						this.product_cast = res.data.product_cast
						this.authors = res.data.authors
						this.note = res.data.note
						this.trade_list = res.data.trade_list
						this.price_info = res.data.price_info[0]
						
						let categories = []
						let data = []
						res.data.price_info[1].forEach(e=>{
							categories.push(e.day)
							data.push(e.price)
						})
						setTimeout(() => {
						        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
						        let res = {
						            categories,
						            series: [
						              {
						                name: "价格趋势",
						                data
						              }
						            ]
						          };
						        this.chartData = JSON.parse(JSON.stringify(res));
						      }, 500);
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
				// 不能购买自己的作品
				if (this.userId == this.product_pre.user_id) {
					this.$refs.uToast.show({
						
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
	.goods-priceinfo{
		width: 330rpx;
		height: 132rpx;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
		padding: 27rpx 0 0 40rpx;
	}
	.goods-pricemap{
		border-radius: 20rpx;
		padding: 20rpx 0;
	}
	.charts-box {
	    width: 100%;
	    height: 300px;
	  }
	.jl-avatar{
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}

	.head {
		position: relative;
		.title_right {
			position: absolute;
			top: 30rpx;
			right: 30rpx;
			display: flex;
			align-items: center;
			z-index: 2;
			.like_num {
				// color: #333333;
				font-size: 26rpx;
				margin: 0 36rpx 0 12rpx;
			}
		
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}
		image {
			width: 100%;
			height: 750rpx;
			box-sizing: border-box;
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
			// margin: 30rpx;
			position: relative;
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
				border: 1px solid ;
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
		padding: 32rpx 30rpx;

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
		// 	border-top: 1px solid #F2F2F2;
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
		border-top: solid 1rpx;

		.price {
			display: flex;
			align-items: center;
			// color: red;

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
			width: 200rpx;
			height: 78rpx;
			// background-color: #764E39;
			// color: #fff;
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
				color: #333333;
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
		// color: #fff;
		font-size: 32rpx;
		border-radius: 10rpx;
	}
</style>
