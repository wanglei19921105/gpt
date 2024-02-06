<template>
	<view class="page" :class="getThemeClass">
		<!-- <view class="wallet-card">
			<image src="../../../static/images/wallet/wallet_bg.png" mode="" class="wallet-bg"></image>
			<view class="wallet-content">
				<view class="text-right text-white size-22">QIANBAOGUANLI</view>
				<view class="flex align-center">
					<view class="">
						<image src="../../../static/images/wallet/wallet_logo.png" mode="" class="card-logo"></image>
					</view>
					<view class="u-p-l-24" style="color: #0F59A1;">我的钱包</view>
				</view>
				<view class="card-btn bg-white size-22" style="color: #0F59A1;" @click="$u.route('/pages/my/wallet/wallet')">进入钱包</view>
			</view>
		</view> -->
		<view class="wallet-card">
			<image src="../../../static/images/wallet/sande_bg.png" mode="" class="wallet-bg"></image>
			<view class="wallet-content">
				<view class="text-right text-white size-22">SHANDEQIANBAO</view>
				<view class="flex align-center">
					<view class="">
						<image src="../../../static/images/wallet/sande_log.png" mode="" class="card-logo"></image>
					</view>
					<view class="u-p-l-24" style="color: #1d87f8;">杉德云钱包</view>
				</view>
				<view class="card-btn bg-white size-22" style="color: #1d87f8;" @click="bindSD">{{sand_fee == 0?'开通钱包':'进入钱包'}}</view>
			</view>
		</view>
		<u-popup v-model="show" class="" mode="center" border-radius="20">
			<view class="my-popup text-center">
				<view class=""><image src="../../../static/images/wallet/sande_log.png" mode="" class="card-logo"></image></view>
				<view class="u-p-b-20 size-50">开通杉德云钱包</view>
				<view class="size-22 u-m-b-30">开通杉德云钱包需{{fee_num}}USDT开通费</view>
				<view class="flex align-center justify-around size-28">
					<view class="popupBtn" style="background-color: #EEE;" @click="show = false">取消</view>
					<view class="popupBtn text-white" style="background-color: #0F59A1;" @click="commission">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				sand_fee:0,
				fee_num:'',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			};
		},
		onShow() {
			this.loadData()
		},
		methods:{
			go(){
				uni.showToast({
					title: '该功能暂未开放！',
					icon: 'none'
				});
				return;
			},
			loadData(){//杉德开通状态
				this.$u.api.sandindex().then(res => {
					let user_cust_id = JSON.stringify(res.data.info.user_cust_id)
					this.sand_fee = res.data.info.sand_fee
					this.fee_num = res.data.info.fee_num
				})
			},
			//杉德开通钱包
			bindSD(){
				// if (this.sand_fee == 0) {
				// 	this.show = true
				// } else{
				// 	this.show = false
					this.openSD()
				// }
			},
			commission(){//杉德钱包手续费
				this.show = false
				this.$u.api.sand_fee().then(res => {
					// console.log(res);
					// console.log(res.data.result,'之前的');
					// if(res.data.result){
					// 	let urlfee = encodeURIComponent(res.data.result)
					// 	uni.navigateTo({
					// 		url:'/pages/my/manage/embedded?urlfee=' + urlfee
					// 	})
					// }
					// #ifdef APP-PLUS
					// plus.runtime.openURL(res.data.result)
					// #endif
					// #ifdef H5
					// location.href = res.data.result
					// #endif
				}).catch(err => {})
			},
			openSD(){//杉德云钱包（开户或我的钱包）
				let token = uni.getStorageSync('token')
				// console.log(token);
				this.$u.api.open_account({
					'token':token
				}).then(res => {
					// console.log(res);
					// console.log(res.data.result,'之前的');
					if(res.data.result){
						let urlshand = encodeURIComponent(res.data.result)
						uni.navigateTo({
							url:'/pages/my/manage/embedded?urlshand=' + urlshand
						})
					}
					// #ifdef APP-PLUS
					// plus.runtime.openURL(res.data.result)
					// #endif
					// #ifdef H5
					// location.href = res.data.result
					// #endif
				}).catch(err => {})
			},
		}
	}
</script>

<style lang="scss">
	.my-popup{
		width: 690rpx;
		color: #000;
		padding-bottom: 40rpx;
		.card-logo{
			width: 200rpx;
			height: 200rpx;
		}
		.popupBtn{
			width: 250rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
		}
	}
.wallet-card{
	margin: 24rpx 30rpx 0;
	width: 690rpx;
	height: 220rpx;
	position: relative;
	border-radius: 20rpx;
	overflow: hidden;
	&-box{
		padding: 30rpx 0rpx;
	}
	.wallet-bg{
		width: 690rpx;
		height: 220rpx;
		position: absolute;
		z-index: 0;
	}
	.wallet-content{
		position: relative;
		z-index: 1;
		padding: 30rpx 24rpx 0rpx 40rpx;
		.card-logo{
			width: 88rpx;
			height: 88rpx;
		}
		.card-btn{
			position: absolute;
			right: 24rpx;
			bottom: -30rpx;
			width: 128rpx;
			height: 54rpx;
			line-height: 54rpx;
			text-align: center;
			border-radius: 27rpx;
		}
	}
}
</style>
