<template>
	<view class="page" :class="getThemeClass">
		<!-- NFT盲盒详情 -->
		<!-- <unavbar :title="i18n.blindboxdef1"></unavbar> -->
		<view class="head">
			<view class="gap-30"></view>
			<view class="flex justify-center align-center">
				<view class="detail-coverimg flex justify-center align-center card-bg" v-if="boxData.display_mode == 1">
					<ay-cubic :img="boxData.cover" />
				</view>
				<view class="detail-coverimg flex justify-center align-center card-bg" v-else>
					<image class="detail-coverimg-image" :src="boxData.cover" mode="aspectFit"></image>
				</view>
			</view>
			<view class="head_main card-bg">
				<view class="main_flex">
					<view class="main_name">{{boxData.title}}</view>
				</view>
				<view class="">
					<my-rarity margin="30rpx 0rpx 0rpx 0rpx" :type="boxData.rarity_type" />
				</view>
				<view class="main_flex margin-top-35 text-content">
					<view class="instock text-content u-flex-col align-center">
						<text>发行总量</text>
						<text class="u-m-t-5">{{boxData.cast_num}}件</text>
					</view>
					<view class="instock text-content u-flex-col align-center">
						<text>剩余库存</text>
						<text class="u-m-t-10">{{num}}件</text>
					</view>
					<!-- <view class="instock text-content u-flex-col align-center">
						<text>流通量</text>
						<text class="u-m-t-10">{{product_cast.turnover}}件</text>
					</view> -->
					<view class="instock text-content u-flex-col align-center">
						<text>冻结时间</text>
						<text class="u-m-t-10">{{boxData.sale_expire? `${boxData.sale_expire}分钟` : '无'}}</text>
					</view>
					
					<!-- <view class="instock">发行总量：{{boxData.cast_num}}件</view> -->
					<!-- <view class="instock">剩余库存：{{product_cast.sur_issue}}件</view> -->
					<!-- <view class="instock">剩余库存：{{num}}件</view> -->
					<!-- <view class="instock">流通量：{{product_cast.turnover}}</view> -->
				</view>
			</view>
		</view>
		
		<view class="certification card-bg">
			<mytitle :text="i18n.goods2" class="my_title"></mytitle>
			<view class="info_item border-color">
				<view class="item_name text-content">{{i18n.goods4}}</view>
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
		
		<view class="main card-bg u-m-t-20 u-p-b-45" v-if="conData">
			<mytitle text="盲盒内容" class="my_title"></mytitle>
			<scroll-view scroll-x="true">
				<view class="blindBox_flex" style="flex-wrap: nowrap;">
					<view class="blindBox_con" style="margin-right: 20rpx;" v-for="(item,index) in conData" :key="index">
						<view class="blind_img" style="position: relative;">
							<image :src="item.cover" mode="aspectFill"></image>
							<view class="probability" >
								<view class="probability-text-box">
									<text class="probability-text">中奖率：{{ item.rate }}</text>
								</view>
							</view>
						</view>
						<view class="blindBox_text u-m-t-30 u-font-32">
							{{item.title}}
						</view>
						<my-rarity :type="item.rarity_type" margin="0rpx 0rpx 0rpx 0rpx" size="mini" />
					</view>
				</view>
			</scroll-view>
			<!-- <view class="blindBox_flex" >
				<u-parse :html="conData" @imgtap="e => e.ignore()"></u-parse>
			</view> -->
		</view>
		
		<view class="main-card u-m-l-30 u-m-r-30 u-m-t-30">
			<mytitle text="盲盒详情" class="my_title"></mytitle>
			<u-parse :html="boxData.desc" @imgtap="e => e.ignore()" class="u-m-t-20"></u-parse>
		</view>
		
		<view class="certification card-bg">
			<mytitle text="抽取记录" class="my_title"></mytitle>
			<view class="flex justify-between align-center margin-top-30" v-for="(item,index) in trade_list" :key="index">
				<image :src="item.avatar" mode="aspectFill" class="jl-avatar"></image>
				<view class="flex-1 margin-left-20">
					<view class="flex justify-between align-center size-26 margin-bottom-10">
						<view class="text-name">{{item.nickname}}</view>
						<view class="jl-price text-bold">{{item.title}}</view>
					</view>
					<view class="flex justify-between align-center size-22 text-content">
						<view >{{init(item.phone)}}</view>
						<view >{{item.extraction_at}}</view>
					</view>
				</view>
			</view>
			<empty v-if="trade_list.length === 0" />
			<view class="gap-30"></view>
		</view>
		
		<!-- 权益说明 -->
		<explain :text="i18n.blindboxdef4" :cont="note.power_note"></explain>
		<!-- 购买须知 -->
		<explain :text="i18n.blindboxdef5" :cont="note.buy_note"></explain>
		<!-- 立即购买 -->
		<view class="gap-200"></view>
		<view class="buy pure-bg border-color">
			
			<template v-if="new_type === 0">
				<view class="buy-countdown" v-if="first_diff > 0">
					<template v-if="first_diff > 0 && user_is_first === 0">
						<text class="">开售倒计时：</text>
						<u-count-down 
							:separator-color="getMainColor"
							:color="getMainColor" 
							:bg-color="getCardColor"
							@end="boxDef()"
							:timestamp="first_diff + 3"
							font-size="24"
							separator="zh"
						></u-count-down>
					</template>
					<template v-if="first_diff > 0 && user_is_first === 2">
						<text class="">发售结束倒计时：</text>
						<u-count-down 
							:separator-color="getMainColor"
							:color="getMainColor" 
							:bg-color="getCardColor"
							@end="boxDef()"
							:timestamp="first_diff + 3"
							font-size="24"
							separator="zh"
						></u-count-down>
					</template>
				</view>
			</template>
			
			<template v-if="new_type === 3">
				<view class="buy-countdown" v-if="first_diff > 0">
					<template v-if="first_diff > 0 && user_is_first === 0">
						<text class="">开售倒计时：</text>
						<u-count-down 
							:separator-color="getMainColor"
							:color="getMainColor" 
							:bg-color="getCardColor"
							@end="boxDef()"
							:timestamp="first_diff + 3"
							font-size="24"
							separator="zh"
						></u-count-down>
					</template>
					<template v-if="first_diff > 0 && user_is_first === 1">
						<text class="">优先购结束倒计时：</text>
						<u-count-down 
							:separator-color="getMainColor"
							:color="getMainColor" 
							:bg-color="getCardColor"
							@end="boxDef()"
							:timestamp="first_diff + 3"
							font-size="24"
							separator="zh"
						></u-count-down>
					</template>
					<template v-if="first_diff > 0 && user_is_first === 2">
						<text class="">发售结束倒计时：</text>
						<u-count-down 
							:separator-color="getMainColor"
							:color="getMainColor" 
							:bg-color="getCardColor"
							@end="boxDef()"
							:timestamp="first_diff + 3"
							font-size="24"
							separator="zh"
						></u-count-down>
					</template>
				</view>
			</template>
			
			<view class="buy-content">
				<view class="price color-red">
					<view class="price_text text-main">
						<!-- 价格 -->
						{{i18n.goods13}}:
					</view>
					<view class="price_number">
						{{boxData.price}}
						<text class="symbol">USDT</text>
						<text class="size-22">≈￥{{(boxData.price*exchange_rate).toFixed(2)}}</text>
					</view>
				</view>
				
				<view class="" v-if="new_type === 0">
					<botBtn
						v-if="num === 0" 
						padding="20rpx 60rpx"
						radius="50rpx"
						disabled
					>已售罄</botBtn>
					<view class="" v-else>
						
						<botBtn
							v-if="first_diff > 0 && user_is_first === 0"
							padding="20rpx 60rpx"
							radius="50rpx"
							disabled
						>
							<text>等待开售</text>
						</botBtn>
						
						<botBtn
							v-if="first_diff > 0 && user_is_first === 2"
							@click="buy(boxData.id)"
							padding="20rpx 60rpx"
							radius="50rpx"
						>
							<text>立即购买</text>
						</botBtn>
						<botBtn
							v-if="user_is_first === 3"
							@click="buy(boxData.id)"
							padding="20rpx 60rpx"
							radius="50rpx"
						>
							<text>立即购买</text>
						</botBtn>
						<botBtn
							v-if="first_diff === 0 && user_is_first === 2" 
							padding="20rpx 60rpx"
							radius="50rpx"
							disabled
						>
							<text>发售结束</text>
						</botBtn>
					</view>
				</view>
				
				<view class="" v-if="new_type === 3">
					<botBtn
						v-if="num === 0" 
						padding="20rpx 60rpx"
						radius="50rpx"
						disabled
					>已售罄</botBtn>
					<template v-else>
						<!-- <view class="buy_btn" @click="buy(boxData.id)" v-if="first_diff == 0">购买</view> -->
						<botBtn 
							@click="buy(boxData.id)" 
							v-if="first_diff > 0 && user_is_first === 1"
							padding="20rpx 60rpx"
							radius="50rpx"
						>优先购</botBtn>
						<botBtn
							v-if="first_diff > 0 && user_is_first === 0"
							padding="20rpx 60rpx"
							radius="50rpx"
							disabled
						>
							<text>等待开售</text>
						</botBtn>
						<botBtn 
							v-if="first_diff > 0 && user_is_first === 2" 
							@click="buy(boxData.id)"
							padding="20rpx 60rpx"
							radius="50rpx"
						>
							<text>立即购买</text>
						</botBtn>
						<botBtn
							v-if="user_is_first == 3"
							@click="buy(boxData.id)"
							padding="20rpx 60rpx"
							radius="50rpx"
						>
							<text>立即购买</text>
						</botBtn>
						<botBtn
							v-if="first_diff === 0 && user_is_first === 2" 
							padding="20rpx 60rpx"
							radius="50rpx"
							disabled
						>
							<text>发售结束</text>
						</botBtn>
					</template>
				</view>
			</view>
			
		</view>
		<pwdPay :stauts="payStatus" @closeMain="closeMain"></pwdPay>
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
				// 盲盒内容数据
				conData: null,
				payStatus: {
					show: false,
					url: 1
				},
				id: null, //盲盒id
				boxData: {}, //盲盒信息
				note: {}, //购买权益相关
				num: null, //盲盒剩余数量
				new_type: 0,
				user_is_first: 0,
				first_diff: 0,
				
				trade_list: [],
				exchange_rate:''
			};
		},
		onLoad(option) {
			this.exchange_rate = uni.getStorageSync('exchange_rate');
			if (option.id) {
				this.id = option.id
				this.boxDef()
			}
		},
		methods: {
			boxDef() { //获取盲盒信息
				this.$u.api.blind_box_detail({
					'id': this.id
				}).then(res => {
					if (res.code == 200) {
						this.boxData = res.data.blind_box
						this.num = res.data.num
						this.conData = res.data.conData
						this.note = res.data.note
						this.new_type = res.data.blind_box.start_at? 3 : 0
						this.user_is_first = res.data.user_is_first
						this.first_diff = res.data.first_diff
						this.trade_list = res.data.log_list
					}
				}).catch(err => {

				})
			},
			// 购买按钮
			buy(id) {
				// if (this.payStatus.show) {
				// 	this.payStatus.show = false
				// 	return
				// }
				// this.payStatus.show = true
				uni.navigateTo({
					url: '../order-def/order-def?id=' + id
				})
			},
			// 监听弹窗打开状态
			closeMain(val) {
				this.payStatus.show = val
			},
			init(num){
				if(!num) return '无'
				return num.substr(0,3) + "****" + num.substr(7)
			},
		}
	}
</script>

<style lang="scss" scoped>

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

	.main {
		// background-color: red;
		// margin: 184rpx 30rpx 24rpx;
		padding: 32rpx 40rpx 0;
		margin: 0 30rpx;
		// background-color: #fff;
		border-radius: 20rpx;

		.my_title {
			margin-bottom: 46rpx;
		}

		.blindBox_flex {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		
			.blindBox_con {
				width: 286rpx;
				text-align: center;
				margin-bottom: 30rpx;
		
				.blind_img {
					width: 286rpx;
					height: 286rpx;
					border-radius: 30rpx;
					overflow: hidden;
					display: flex;
					align-items: center;
				}
		
				image {
					width: 100%;
				}
			}
		}
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
			border-top: solid 1rpx ;
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
			min-width: 200rpx;
			padding: 0 30rpx;
			height: 78rpx;
			// background-color: #764E39;
			// color: #fff;
			line-height: 78rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
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
	
	.jl-avatar{
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
	
	.certification {
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
	}
	
	.probability{
		width: 286rpx;
		height: 286rpx;
		position: absolute;
		top: 0;
		left: 0;
		padding: 25rpx 30rpx;
		// background-color: rgba(0, 0, 0, 0.5);
		.probability-text-box{
			background-color: rgba(0, 0, 0, 0.5);
			width: max-content;
			border-radius: 25rpx;
			padding: 5rpx 15rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.probability-text{
				font-size: 16rpx;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
</style>
