<template>
	<view class="page" :class="getThemeClass">
		<view class="recharge_card card-bg flex align-center">
			<image src="../../../static/images/my/dark/USDT.png" mode="widthFix" class="logo"></image>
			<text class="size-30">USDT支付</text>
		</view>
		<view class="u-m-l-28 size-28">链名称</view>
		<view class="card-bg code_card text-content" style="width: 240rpx;">{{recharge.usdt_network}}</view>
		<view class="u-m-l-28 size-28">充值地址</view>
		<view class="card-bg copy_card text-content flex align-center justify-between">
			<view class="u-m-l-28 line-1" style="width: 440rpx;">{{recharge.usdt_address}}</view>
			<view class="copy_icon">复制链接</view>
		</view>
		<view class="u-m-l-28 size-28">充值二维码</view>
		<view class="card-bg code_card">
			<image :src="recharge.usdt_pic" mode="widthFix"></image>
		</view>
		<view class="u-m-l-28 size-28">充值金额<text class="size-22">（最小充值金额：{{recharge.recharge_min}},最大充值金额{{recharge.recharge_max}}）</text> </view>
		<view class="card-bg recharge_card flex align-center">
			<image src="../../../static/images/my/dark/USDT.png" mode="widthFix" class="logo"></image>
			<input type="number" placeholder="请输入充值USDT金额" class="size-24" v-model="params.recharge_num">
		</view>
		<view class="u-m-l-28 size-28">上传支付凭证</view>
		<view class="u-m-l-28 u-m-t-28 u-m-b-28">
			<view class="flex flex-wrap">
				<image :src="path" mode="aspectFill" class="issue-img u-m-r-20 u-m-b-20" v-if="path != null"></image>
				<image src="../../../static/images/my/dark/zfpz.png" class="issue-img" @click="upload" v-else></image>
			</view>
		</view>
		<view class="u-m-l-28 size-28">钱包地址</view>
		<view class="card-bg recharge_card">
			<input type="text" placeholder="请输入转账方钱包地址" class="size-24" v-model="params.usdt_address">
		</view>
		<view class="u-m-l-28 size-28">备注</view>
		<view class="card-bg recharge_card">
			<input type="text" placeholder="请输入备注" class="size-24" v-model="params.remark">
		</view>
		<view class="u-m-l-28 size-24 text-content">提示：请正确填写付款的钱包地址，填写错误可能导致充值不到账！</view>
		<view class="submitBtn" style="margin-top: 100rpx;" @click="submit">立即提交</view>
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
				recharge:'',
				params:{
					recharge_num:'',
					usdt_address:'',
					pic:null,
					remark:''
				},
				path:null
			};
		},
		computed: {
			
		},
		onLoad() {
			this.walletShow()
		},
		methods: {
			submit() {
				if (!this.params.usdt_address) {
					this.$refs.uToast.show({
						title: "请输入钱包地址！",
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
				if (!this.params.recharge_num || this.params.recharge_num < Number(this.recharge.recharge_min)) {
					this.$refs.uToast.show({
						// 充值不能小于  USDT
						title: this.i18n.recharge10 + Number(this.recharge.recharge_min) + this.i18n.recharge11,
						type: 'error'
					});
					return
				}
				this.$u.api.recharge_usdt(this.params).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title:'提交成功，等待到账',
							icon:"none"
						})
						setTimeout(()=>{
							uni.navigateBack()
						},1500)
					}
				}).catch(err => {
							
				})
			},
			walletShow() {
				this.$u.api.wallet_show().then(res => {
					if (res.code == 200) {
						this.recharge = res.data.recharge
					}
				}).catch(err => {
			
				})
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
	.code_card{
		margin: 28rpx;
		padding: 26rpx 36rpx;
		border-radius: 20rpx;
		width: 280rpx;
		image{width: 210rpx;border-radius: 10rpx;}
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
