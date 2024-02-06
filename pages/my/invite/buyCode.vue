<template>
	<view class="page" :class="getThemeClass">
		<view class="main-padding u-p-t-30">
			<view class="buycode-card text-white flex flex-direction justify-center align-center">
				<view class="opc-7 u-font-26">剩余邀请码数量(个)</view>
				<view class="text-bold u-m-t-15 u-m-b-24" style="font-size: 56rpx;">{{sur_invitation_limit}} / {{invitation_limit}}</view>
				<view class="u-font-26">
					<text class="opc-7 u-m-r-12">可用积分</text>
					<text>{{balance}}</text>
				</view>
			</view>
			<view class="main-card card-bg u-m-t-30">
				<view class="u-m-b-28 u-font-28">购买数量</view>
				<input type="number" v-model="num" placeholder="请输入激活码数量" placeholder-class="u-font-38 text-placeholder" class="u-font-38 buycode-inp">
				<view class="line buycode-line"></view>
				<view class="u-font-26 u-m-t-35">
					<text class="text-tips">换算比例：</text>
					<text class="text-bold">1激活码 = {{pay_one_invitation}} 积分</text>
				</view>
			</view>
			<view class="main-card card-bg u-m-t-30">
				<view class="u-m-b-30 u-font-28">支付方式</view>
				<view class="flex justify-between align-center">
					<view class="flex align-center">
						<image src="../../../static/images/pointPay.png" class="buycode-icon"></image>
						<view class="u-font-28">积分支付</view>
					</view>
					<image src="../../../static/images/check.png" class="buycode-check"></image>
				</view>
			</view>
			<view class="bg-cayn text-default u-font-32 text-bold buycode-btn" @click="submit">立即购买</view>
		</view>
		<pwdPay :stauts="payStatus" @status="padpay"></pwdPay>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				balance:0,
				invitation_limit:0,
				sur_invitation_limit:0,
				pay_one_invitation:0,
				num:'',
				payStatus: {
					show: false
				},
				flag: false, //密码弹框 点击了立即支付后，变true
				status: false,
				security:''
			}
		},
		onLoad() {
			this.loadData()
		},
		computed: {
			setSecurity() {
				return this.$store.state.security
			}
		},
		watch: {
			setSecurity(val) {
				// console.log(val);
				this.security = val
			},
			// 密码弹框点击'立即支付'后
			status(val) {
				if (val) {
					this.pay()
				}
			},
		},
		methods:{
			loadData(){
				this.$u.api.buyInvitationInfo().then(res=>{
					this.balance = res.data.info.balance
					this.invitation_limit = res.data.info.invitation_limit
					this.sur_invitation_limit = res.data.info.sur_invitation_limit
					this.pay_one_invitation = res.data.info.pay_one_invitation
				})
			},
			submit(){
				if(!this.num)return this.$refs.uToast.show({title: '请输入激活码数量',type: 'error'});
				// const total = this.num*1 + this.sur_invitation_limit*1
				// if(total>Number(this.invitation_limit))return this.$refs.uToast.show({title: '超过最大可购买数量',type: 'error'});
				this.payStatus.show = true
			},
			// 密码弹窗点击立即支付后
			padpay(i) {
				this.flag = true
				if (i) {
					this.status = true
				} else {
					this.status = false
				}
			},
			pay(){
				this.$u.api.buyInvitation({
					num: this.num,
					security: this.security
				}).then(res=>{
					this.$refs.uToast.show({title: '购买成功',type: 'success'});
					setTimeout(()=>{
						uni.navigateBack()
					},1500)
				})
			}
		}
	}
</script>

<style lang="scss">
	.buycode-card{
		height: 248rpx;
		background-image: url('../../../static/images/invite-bg.png');
		background-size: 100% 100%;
	}
	.buycode-inp{
		height: 118rpx;
		line-height: 118rpx;
	}
	.buycode-line{
		height: 1rpx;
		width: 100%;
	}
	.buycode-btn{
		width: 646rpx;
		height: 100rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 100rpx;
		margin: 100rpx auto 0 auto;
	}
	.buycode-icon{
		width: 52rpx;
		height: 52rpx;
		margin-right: 20rpx;
	}
	.buycode-check{
		width: 36rpx;
		height: 36rpx;
	}
</style>