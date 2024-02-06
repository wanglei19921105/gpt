<template>
	<view class="page" :class="getThemeClass">
		<view class="flex align-center justify-between u-m-b-32">
			<view class="flex align-center">
				<view class="size-26 exchangBtn u-m-r-32" v-for="(item,index) in tabs" :class="current == index?'':'card-bg text-content'" @click="change(index)">{{item}}</view>
			</view>
			<view class="flex align-center exchangBtn card-bg" @click="$u.route('/pages/exchange/exchangeOrder')">
				<image src="../../static/images/my/dark/orderLogo.png" mode="widthFix" style="width: 30rpx;"></image>
				<view class="size-26 u-m-l-10">我的订单</view>
			</view>
		</view>
		<view class="" v-if="current == 0">
			<view v-for="(item, index) in list" :key="index" class="exchangCard card-bg" @click="godetail(item.id)">
				<view class="flex align-center justify-between u-m-b-30">
					<view class="size-28">{{item.merchant_name}}</view>
					<!-- <view class="size-24 col2283EC">联系商户</view> -->
				</view>
				<view class="flex align-center justify-between u-m-b-30 u-p-b-28 border-bottom">
					<view class="">
						<view class="size-22 text-content u-m-b-25">单价</view>
						<view class="size-36">{{item.unit}}<text class="size-20">USDT</text> </view>
					</view>
					<view class="exchangBtn size-26" @click="$u.route(`/pages/exchange/exchangeBuy?id=${item.id}`)">去购买</view>
				</view>
				<view class="flex align-center justify-between">
					<view class="size-24 text-content">单笔限额5000</view>
					<view class="flex align-center">
						<image :src="item.merchant_avatar" mode="widthFix" class="touxiang"></image>
						<text class="size-24 u-m-l-12">{{item.merchant_name}}</text>
					</view>
				</view>
			</view>
			<empty v-if="!list.length"></empty>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
		<view class="" v-if="current == 1">
			<view class="flex align-center justify-between u-m-b-26">
				<view class="size-28">出售数量</view>
				<view class="size-24 col2283EC">可用余额:{{sell.usdt}}USDT</view>
			</view>
			<view class="exchangInput card-bg flex align-center u-m-b-32">
				<image src="../../static/images/my/dark/USDT.png" mode="widthFix" style="width: 40rpx;"></image>
				<input type="number" v-model="sellnumber" placeholder="每日限额 5000 USDT" class="size-24 u-m-l-20">
			</view>
			<view class="exchangCard card-bg u-m-b-32">
				<view class="flex align-center justify-between u-m-b-50">
					<view class="size-28">单价</view>
					<input type="number" :placeholder="`请输入单价￥${sell.quota_mix}-￥${sell.quota_max}`" v-model="sellprice" class="size-24 u-m-l-20" style="text-align:right">
				</view>
				<view class="flex align-center justify-between">
					<view class="size-28">预计获得</view>
					<view class="size-28">￥{{result}}</view>
				</view>
			</view>
			<view class="size-28 u-m-b-26">收款方式</view>
			<view class="exchangInput card-bg flex justify-between align-center u-m-b-32" @click="openWin('/pages/my/bind-weChat/bind-weChat')">
				<view class="size-24">微信</view>
				<view class="grey_text" :class="wechat? 'text-tips' : ''">{{wechat?i18n.setup11:i18n.setup12}}
					<u-icon name="arrow-right" size="22" color="#666666" class="uicon"></u-icon>
				</view>
			</view>
			<view class="exchangInput card-bg flex justify-between align-center u-m-b-32" @click="openWin('/pages/my/bind-alipay/bind-alipay')">
				<view class="size-24">支付宝</view>
				<view class="grey_text" :class="draw? 'text-tips' : ''">{{draw?i18n.setup11:i18n.setup12}}
					<u-icon name="arrow-right" size="22" color="#666666" class="uicon"></u-icon>
				</view>
			</view>
			<view class="exchangInput card-bg flex justify-between align-center" @click="openWin('/pages/my/bind-bank/bind-bank')">
				<view class="size-24">银行卡</view>
				<view class="grey_text" :class="bank? 'text-tips' : ''">{{bank?i18n.setup11:i18n.setup12}}
					<u-icon name="arrow-right" size="22" color="#666666" class="uicon"></u-icon>
				</view>
			</view>
			<view class="submitBtn" @click="sellSubmit">出售USDT</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				list:[],
				loadStatus:'noMore',
				current: 0,
				tabs:['去购买','去出售'],
				sellnumber:'',
				sellprice:'',
				sell:{},
				draw: '',
				wechat: '',
				bank:'',
			};
		},
		onLoad() {
			this.loadData(true)
			this.getDrawinfo()
			this.getWechat()
			this.getBank()
		},
		onReachBottom(){
			this.loadData()
			this.page++
		},
		onNavigationBarButtonTap() { 
			uni.navigateTo({
				url:"/pages/exchange/appliChant"
			})
		},
		methods:{
			loadData(flag){
				if(flag)this.page=1
				this.$u.api.Trading_index({
						page: this.page,
					}).then(res => {
					if (res.code == 200) {
						this.list = flag? res.data.list.data:this.list.concat(res.data.list.data);
						this.sell = res.data.sell
						this.loadStatus = res.data.list.next_page_url?'more':'noMore'
					}
				})
			},
			getDrawinfo() { //收款方式信息--接口（支付宝）
				this.$u.api.draw_info({
					'type': 2
				}).then(res => {
					if (res.code == 200) {
						this.draw = res.data.info
					}
				}).catch(err => {})
			},
			getBank() { //收款方式信息--接口（银行卡）
				this.$u.api.draw_info({
					'type': 3
				}).then(res => {
					if (res.code == 200) {
						this.bank = res.data.info
					}
				}).catch(err => {})
			},
			getWechat() { //收款方式信息--接口（银行卡）
				this.$u.api.draw_info({
					'type': 1
				}).then(res => {
					if (res.code == 200) {
						this.wechat = res.data.info
					}
				}).catch(err => {})
			},
			change(index) {
				if(this.current==index)return
				this.current = index;
				this.loadData(true)
			},
			sellSubmit(){
				if (!this.sellnumber) {
					uni.showToast({
						title: '请输入数量',
						icon: 'error'
					});
					return
				}
				if (!this.sellprice) {
					uni.showToast({
						title: '请输入单价',
						icon: 'error'
					});
					return
				}
				if (!this.draw && !this.wechat && !this.bank) {
					uni.showToast({
						title: '请完善所有收款信息',
						icon: 'error'
					});
					return
				}
				this.$u.api.Trading_sell({
					num: this.sellnumber,
					unit: this.sellprice,
				}).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: "出售成功",
							type: 'success',
							callback:()=>{
								this.current = 0;
								this.loadData(true);
							}
						});
					}
				}).catch(err => {})
			},
			godetail(){
				
			},
		},
		computed: {
			result() {
				return this.sellnumber * this.sellprice;
			}
		}
	}
</script>

<style lang="scss">
.page{
	padding: 28rpx;
	.col2283EC{color: #2283EC;}
	.border-bottom{border-bottom: 1rpx solid #464646;}
	.touxiang{width: 40rpx;height: 40rpx; border-radius: 50%;}
}
.grey_text {
	font-size: 20rpx;
	color: #666666;
	.uicon {
		margin-left: 20rpx;
	}
}
.submitBtn{
	width: 646rpx;
	height: 100rpx;
	border-radius: 50rpx;
	background: #2283EC;
	text-align: center;
	line-height: 100rpx;
	margin: 160rpx auto 0;
	font-size: 32rpx;
}
.exchangInput {
	padding: 24rpx 34rpx;
	border-radius:40rpx;
}
.exchangCard{
	padding: 36rpx 25rpx;
	border-radius: 24rpx;
	margin-bottom: 30rpx;
}
.exchangBtn{
	padding: 17rpx 35rpx;
	background-color: #2283EC;
	border-radius: 50rpx;
}
</style>
