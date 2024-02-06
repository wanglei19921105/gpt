<template>
	<view class="page" :class="getThemeClass">
		<image src="../../static/images/battle/orderbg.png" class="vs-ordertop"></image>
		<view class="vsorder-cont">
			<view class="main-card card-bg">
				<view class="flex justify-between align-center">
					<image :src="info.pic" mode="aspectFill" class="vsorder-img flex-shink"></image>
					<view class="flex-1 u-m-l-20">
						<view class="size-30 text-bold">{{info.title}}</view>
						<view class="flex justify-between align-center u-m-t-40 size-24">
							<view style="color: #FE1313;" class="text-bold">{{info.price}}USDT</view>
							<view class="" style="color: #999999;">库存：{{info.sur_stock}}/{{info.stock}}</view>
						</view>
					</view>
				</view>
				<view class="flex justify-between align-center size-26 u-m-t-30">
					<view style="color: #999999;">购买数量</view>
					<u-number-box v-model="num"></u-number-box>
				</view>
			</view>
			
		</view>
		<payWay @payway="payType"></payWay>
		<pwdPay :stauts="payStatus" @status="padpay"></pwdPay>
		
		<view class="gap-100"></view>
		<view class="battle-goods-btn" @click="submit">立即购买</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				info:{},
				wallet:{},
				num:1,
				payStatus: {
					show: false
				},
				pay_type:'',
				type:'',
				security: '',
				status: false,
				flag: false
			}
		},
		onLoad() {
			this.loadData()
		},
		computed: {
			setSecurity() {
				return this.$store.state.security;
			}
		},
		watch: {
			setSecurity(val) {
				this.security = val;
			},
			// 密码弹框点击'立即支付'后
			status(val) {
				if (val) {
					if(this.type==3){
						this.pay()
					}
					if(this.type==4){
						this.pay()
					}
				}
			}
		},
		methods:{
			loadData(){
				this.$u.api.ticket_info().then(res=>{
					this.info = res.data.info
					this.wallet = res.data.wallet
				})
			},
			payType(e){
				this.pay_type = e.paytype
				this.type = e.type
			},
			padpay(e){
				console.log(e);
			},
			submit(){
				if(this.type==3||this.type==4){
					this.payStatus.show = true
				}
			},
			padpay(i) {
				this.flag = true;
				if (i) {
					this.status = true;
				} else {
					this.status = false;
				}
			},
			pay() {
				//余额支付
				this.$u.api
					.ticket_buy({
						pay_type: this.pay_type,
						security: this.security,
						num:this.num
					})
					.then(res => {
						if (res.code == 200) {
							uni.showToast({
								title:"购买成功",
								icon:"none"
							})
							setTimeout(()=>{
								uni.navigateBack()
							},1200)
						}
					})
			},
		}
	}
</script>

<style lang="scss">
	.vs-ordertop{
		width: 750rpx;
		height: 320rpx;
		position: fixed;
		top: 0;
		left: 0;
	}
	.vsorder-cont{
		position: relative;
		z-index: 10;
		padding: 278rpx 30rpx 0 30rpx;
		.vsorder-img{
			width: 160rpx;
			height: 160rpx;
			border-radius: 20rpx;
		}
	}
	.battle-goods-btn{
		width: 750rpx;
		height: 100rpx;
		background-color: #00E2E2;
		color: #111926;
		font-size: 32rpx;
		text-align: center;
		line-height: 100rpx;
		font-weight: bold;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>