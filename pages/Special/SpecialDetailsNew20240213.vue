<template>
	<view class="page" :class="getThemeClass">
		<view class="specia-detail-cover" v-if="Object.keys(info).length">
			<image class="cover-img" :src="info.cover_image" mode="aspectFill"></image>
		</view>
		<view class="specia-detail-other">
			<view class="specia-detail-card">
				<view class="specia-detail-card-title">
					<text class="card-title-text">{{ info.name }}</text>
					<view class="card-price">
						<text class="card-price-unit">￥</text>
						<text class="card-price-num">{{ info.maxmum_investment }}</text>
					</view>
				</view>
				<view class="specia-detail-card-tips">
					<image class="tips-vip-icon" src="../../static/images/tab/light/VIP1.png"></image>
					<view class="tips-limit">
						<view class="tips-limit-tips">起购份数</view>
						<view class="tips-limit-total">{{ info.min_buy }}</view>
					</view>
					<view class="tips-limit">
						<view class="tips-limit-tips">限购份数</view>
						<view class="tips-limit-total">{{ info.limit }}</view>
					</view>
				</view>
				<view class="specia-detail-card-content">
					<view class="specia-detail-card-content-item">
						<text class="specia-detail-card-content-item-text"> {{ info.stock + info.sales }}</text>
						<text class="specia-detail-card-content-item-title">项目数量</text>
					</view>
					<view class="specia-detail-card-content-item">
						<text class="specia-detail-card-content-item-text">{{ info.profit_rate + '%' }}</text>
						<text class="specia-detail-card-content-item-title">日化利率</text>
					</view>
					<view class="specia-detail-card-content-item">
						<text class="specia-detail-card-content-item-text">{{info.stock || 0 }}</text>
						<text class="specia-detail-card-content-item-title">每日收益</text>
					</view>
					<view class="specia-detail-card-content-item">
						<text class="specia-detail-card-content-item-text">{{ info.keep_days }}天</text>
						<text class="specia-detail-card-content-item-title">投资周期</text>
					</view>
				</view>	
			</view>
			<view class="specia-detail-purchase-list">
				<view class="purchase-list-title">购买动态</view>
				<view class="purchase-list-content">
					<view class="purchase-list-item" v-for="(item, index) in purchaseList" :key="index">
						<view class="purchase-list-item-cover">
              <image class="purchase-list-item-cover" :src="item.avatar" mode="aspectFill"></image>
            </view>
						<view class="purchase-list-item-info">
							<view class="purchase-list-item-text">
								<text class="">{{ item.nickname }}</text>
              	<text class="">投资 {{item.quantity}} 份 {{item.amount}} 元</text>
							</view>
							<view class="purchase-list-item-text">
								<text class="">{{ item.mobile }}</text>
              	<text class="">{{ item.created_at }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="specia-detail-content">
				<view class="" v-html="info.details"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id:'',
			num:1,
			info: {},
			purchaseList:[],
			isShowPsw:false,
			show: false,
			collect: false,
			likeNum: 1235,
			// 安全密码支付-弹出框
			payStatus: {
				show: false,
				url: 2
			},
			goodsData: {}, //商品详情信息总和
			security_password: '',
			orderId: '',
			isDisabled:false,
		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id
			this.getGoodsInfo()
		}
	},
	computed:{
		returnPrice(){
			return (Number(this.info.maxmum_investment) * Number(this.num)).toFixed(2)
		},
	},
	methods: {
		addS(type = 1){
			if(type == 1){
				if(this.num > 1){
					this.num --
				}
			}else {
				if(this.info.stock == this.num){
					return
				}
				this.num ++
			}
		},
	closeBox(){
		this.isShowPsw = false
		this.isDisabled = false
	},
		returnDayRate(item){
			return Number(Number(item.maxmum_investment) * Number(item.profit_rate/100) / item.keep_days).toFixed(2)
		},
		returnRate(item){
			const rate =  Number(Number(item.sales / (item.stock + item.sales)).toFixed(2));
	if(rate > item.virtual_progress)
	{
		return rate;
	}
	return item.virtual_progress;
		},
		confirmBuy(){
			// uni.navigateTo({
			//   url:`/pages/Special/SpecialDetailsNeworder?id=${this.id}&num=${this.num}&price=${this.returnPrice}`
			// })
	console.log(2222)
	this.isShowPsw = true;
	this.showBox()
		},
	buyConfirm(){
		if(this.isDisabled){
			return
		}
		this.isDisabled = true
		this.$u.api.getProjectGoodsInfoOrderBuy({
			id:this.orderId,
			security_password:this.security_password
		}).then(ress => {
			if (ress.code == 200) {
				this.security_password = ''
				this.$.toast(ress.message)
				this.closeBox()
				setTimeout(() => {
					this.$.open('/pages/Special/SpecialDetailsNewOrderlog')
					this.isDisabled = false
					// this.$.back()
				},1500)
			}else{
				this.$.toast(ress.message)
				this.isDisabled = false
			}
		}).catch(err => {
			this.isDisabled = false
		})
	},
		getGoodsInfo(id) {
			this.$u.api.getProjectGoodsInfo({
				'id': this.id
			}).then(res => {
				if (res.code == 200) {
					const data = res.data || {}
					const userList = data && data.users || []
					const projectObj = data.project || {}
					this.info = projectObj
					this.purchaseList = userList
				}
			}).catch(err => {
				this.info = {}
				this.purchaseList = []
			})
		},
		// 监听弹窗打开状态
		closeMain(val) {
			this.payStatus.show = val
		},

		showBox(){
			if(this.orderId){
				this.isShowPsw = true
				return;
			}
			if(this.isDisabled){
				return
			}
			this.$u.api.getProjectGoodsInfoOrder({
				project_id:this.id,
				total:this.num
			}).then(res => {
				if (res.code == 200) {
					this.orderId = res.data.id
					this.isDisabled = false
					this.isShowPsw = true
				}else{
					this.isDisabled = false
					this.$.toast(res.message)
				}
			}).catch(err => {
		
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	.specia-detail-cover {
		width: 100%;
		height: 750rpx;
		position: relative;
		z-index: 1;
		.cover-img {
			width: 100%;
			height: 100%;
		}
	}
	.specia-detail-other {
		position: relative;
		z-index: 10;
		top: -30rpx;
		width: 690rpx;
		margin: 0 auto;
		.specia-detail-card {
			width: 100%;
			height: 329rpx;
			border-top-right-radius: 2px;
			border-top-left-radius: 2px;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
		}
	}
}
</style>
