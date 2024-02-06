<template>
	<view class="page" :class="getThemeClass">
		<view class="recharge_card card-bg flex align-center">
			<image src="/static/images/my/dark/USDT.png" mode="widthFix" class="logo"></image>
			<text class="size-30">USDT支付</text>
		</view>
		<view class="flex justify-between">
			<view class="u-m-l-28 size-28">购买数量</view>
			<view class="u-m-r-28 size-24" style="color: #2283EC;">剩余购买数量：{{info.surplus_num}}</view>
		</view>
		<view class="card-bg recharge_card flex align-center">
			<image src="/static/images/my/dark/USDT.png" mode="widthFix" class="logo"></image>
			<input type="number" :placeholder="`单笔限额500`" class="size-24" v-model="params.num">
		</view>
		<view class="cardPrice card-bg">
			<view class="flex justify-between u-m-b-50">
				<view>单价</view>
				<view style="color: #2283EC;">￥{{info.unit}}/USDT</view>
			</view>
			<view class="flex justify-between">
				<view>预计支付</view>
				<view>￥{{result}}</view>
			</view>
		</view>
		<view class="u-m-l-28 size-28">付款方式</view>
		<view class="card-bg code_card">
			<view class="flex code-payway">
				<view class="paywayBtn" :class="item.id == selectPay ? 'paywayBtnActive' : ''" v-for="item in PaywayList" :key="item.id" @click="selectPayway(item.id)">
					<view>{{item.name}}</view>
				</view>
			</view>
			<view class="flex justify-between" style="width:100%" v-if="selectPay!=3">
				<view style="color: #A5A5A5;">付款信息：</view>
				<image :src="selectPay == 1 ? draw_info.alipay : selectPay == 2 ? draw_info.wechat : ''" mode="widthFix"></image>
			</view>
			<view class="flex justify-between" style="width:100%" v-else>
				<view style="width:100%">
					<view class="flex justify-between u-m-b-25">
						<view class="flex">
							<view style="color: #A5A5A5">姓名</view>
							<view class="u-m-l-30">{{bank_card.name}}</view>
						</view>
						<view style="color:#2283EC" @click="copy(bank_card.name)">复制</view>
					</view>
					<view class="flex justify-between u-m-b-25">
						<view class="flex">
							<view style="color: #A5A5A5">银行卡号</view>
							<view class="u-m-l-30">{{bank_card.account}}</view>
						</view>
						<view style="color:#2283EC" @click="copy(bank_card.account)">复制</view>
					</view>
					<view class="flex justify-between u-m-b-25">
						<view class="flex">
							<view style="color: #A5A5A5">开户行</view>
							<view class="u-m-l-30">{{bank_card.bank_name}}</view>
						</view>
						<view style="color:#2283EC" @click="copy(bank_card.bank_name)">复制</view>
					</view>
				</view>
			</view>
		</view>
		<view class="u-m-l-28 size-28">上传支付凭证</view>
		<view class="u-m-l-28 u-m-t-28 u-m-b-28">
			<view class="flex flex-wrap">
				<image :src="path" mode="aspectFill" class="issue-img u-m-r-20 u-m-b-20" v-if="path != null"></image>
				<image src="/static/images/my/dark/zfpz.png" class="issue-img" @click="upload" v-else></image>
			</view>
		</view>
		<view class="submitBtn" style="margin-top: 100rpx;" @click="submit">确定提交</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action : `${uni.$myAppConfig.baseUrl}/api/upload_file`,
				header:{
					token: uni.getStorageSync('token'),
					lang: uni.getStorageSync('lang'),
				},
				info:'',
				draw_info:'',
				bank_card:'',
				params:{
					id:'',
					num:'',
					pic:null,
				},
				path:null,
				PaywayList:[
					{id:1,name:'微信'},
					{id:2,name:'支付宝'},
					{id:3,name:'银行卡'},
				],
				selectPay:1,
				id:''
			};
		},
		computed: {
			
		},
		onNavigationBarButtonTap() { 
			
		},
		onLoad(options) {
			this.params.id = options.id
			this.walletShow(options.id)
		},
		methods: {
			walletShow(id) {
				this.$u.api.Trading_show({id}).then(res => {
					if (res.code == 200) {
						this.info = res.data.info
						this.draw_info = res.data.draw_info
						this.bank_card = res.data.draw_info.bank_card
					}
				}).catch(err => {
			
				})
			},
			submit() {
				if (!this.params.num) {
					this.$refs.uToast.show({
						title: "请输入数量！",
						type: 'error'
					});
					return
				}
				if (!this.params.num || this.params.num > Number(this.info.surplus_num)) {
					this.$refs.uToast.show({
						// 充值不能小于  USDT
						title: "充值数量不能大于" + Number(this.info.surplus_num),
						type: 'error'
					});
					return
				}
				if (!this.params.pic) {
					this.$refs.uToast.show({
						title: "请上传支付凭证！",
						type: 'error'
					});
					return
				}
				this.$u.api.Trading_purchase(this.params).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title:'购买成功',
							icon:"none"
						})
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					}
				}).catch(err => {
							
				})
			},
			// 选择付款方式
			selectPayway(type){
				this.selectPay = type
			},
			upload(){
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: this.action,
							filePath: tempFilePaths[0],
							name: 'pic',
							header:this.header,
							formData:{
								sence: 'district'
							},
							success: (uploadFileRes) => {
								let res = JSON.parse(uploadFileRes.data)
								console.log(res);
								if(res.code==200){
									this.params.pic = res.data.path
									this.path = res.data.real_path
								}
							}
						});
					}
				});
			}
		},
		computed: {
			result() {
				return this.params.num * this.info.unit;
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-list-item[data-v-49deb6f2]{
		background-color: #1E1E1E;
	}
	/deep/.u-add-wrap[data-v-49deb6f2]{color: #D7D9DE;}
	.submitBtn{
		width: 646rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background: #2283EC;
		color: #FFFFFF;
		margin: 0 auto;
		text-align: center;
		line-height: 100rpx;
	}
	.issue-img{
		width: 211rpx;
		height: 211rpx;
		border-radius: 24rpx;
	}
	.cardPrice{
		width: 694rpx;
		height: 180rpx;
		margin: 28rpx;
		padding: 34rpx 30rpx;
		border-radius: 20rpx;
		display: flex;
    flex-direction: column;
    justify-content: space-around;
	}
	.code_card{
		width: 694rpx;
		height: 340rpx;
		margin: 28rpx;
		padding: 32rpx;
		border-radius: 20rpx;
		display: flex;
    flex-direction: column;
		align-items: flex-end;
		.code-payway{
			width: 100%;
			margin-bottom: 28rpx;
			justify-content: space-between;
			.paywayBtnActive{
				color: #2283EC !important;
				border-color: #2283EC !important;
			}
			.paywayBtn{
				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				color: #A5A5A5;
				text-align: center;
				border-radius: 20rpx;
				border: 1rpx solid #4A4A4A;
			}
		}
		image{width: 167rpx;height: 167rpx; border-radius: 10rpx;background-color: #fff;}
	}
	.recharge_card{
		margin: 28rpx;
		padding: 26rpx 36rpx;
		border-radius: 50rpx;
		.logo{width: 40rpx;border-radius: 10rpx;margin-right: 18rpx;}
	}
	.copy_card{
		margin: 28rpx;
		border-radius: 50rpx;
		.copy_icon{
			width: 180rpx;
			height: 88rpx;
			border-radius: 44rpx;
			background: #2283EC;
			color: #FFFFFF;
			text-align: center;
			line-height: 88rpx;
		}
	}
</style>
