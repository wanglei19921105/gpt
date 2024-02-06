<template>
	<view>
		<view class="pay_way card-bg" :class="getThemeClass">
			<u-radio-group 
				v-model="radioValue"
				:active-color="getMainColor"
			>
				<template v-for="(item, index) in payList">
					<!-- #ifdef APP -->
					<template v-if="item.isAppShow">
						<u-radio 
							class="border-color" 
							@change="changePayType(index)"
							:key="item.id" 
							:name="item.id"
							:disabled="item.disabled"
						>
							<image class="radio_img" :src="item.icon" mode="widthFix"></image>
							<text class="radio_name">{{ item.name }}</text>
						</u-radio>
					</template>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<template v-if="item.isH5Show">
						<u-radio
							class="border-color" 
							@change="changePayType(index)"
							:key="item.id" 
							:name="item.id"
							:disabled="item.disabled"
						>
							<image class="radio_img" :src="item.icon" mode="widthFix"></image>
							<text class="radio_name">{{ item.name }}</text>
						</u-radio>
					</template>
					<!-- #endif -->
				</template>
			</u-radio-group>
		</view>
	</view>
</template>

<script>
	export default {
		name: "pay-way",
		props:{
			value: {
				type: Number,
				default: 0
			},
			hasAward: {
				type: Boolean,
				default: true
			},
			onlyAward: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				radioValue: 0,
				payType: 0,
				paySwitch: {
					wechat_wap: '0',
					wechat_app: '0',
					ali_wap: '0',
					ali_app: '0',
					sand_fast: '0',
					dlb: '0',
					air: '0',
				}
			};
		},
		created() {
			this.loadData()
		},
		methods: {
			loadData(){
				this.$u.api.open_status().then(res=>{
					this.paySwitch = res.data.pay
					this.changePayType(-1);
				})
			},
			changePayType(index) {
				let payIndex = index;
				if (payIndex === -1) {
					for (var i = 0; i < this.payList.length; i++) {
						// #ifdef APP
						if (this.payList[i].isAppShow) {
							payIndex = i;
							break;
						}
						// #endif
						// #ifdef H5
						if (this.payList[i].isH5Show) {
							payIndex = i;
							break;
						}
						// #endif
					}
				}
				if(payIndex === -1){
					return 
				}
				this.radioValue = this.payList[payIndex].id
				// #ifdef APP
				this.payType = this.payList[payIndex].appPayType;
				// #endif
				// #ifdef H5
				this.payType = this.payList[payIndex].h5PayType;
				// #endif
				this.$emit('payway', {
					type: this.radioValue,
					paytype: this.payType,
				})
				this.$emit('input', this.payType)
			},
		},
		computed: {
			payList() {
				let payArr = [
					{
						id: 1,
						appPayType: 1,
						h5PayType: 2,
						icon: require('@/static/images/weChatRecharge.png'),
						name: '微信支付',
						isAppShow: this.paySwitch.wechat_app === '1' && !this.onlyAward,
						isH5Show: this.paySwitch.wechat_wap === '1' && !this.onlyAward,
						disabled: false
					},
					{
						id: 2,
						appPayType: 4,
						h5PayType: 5,
						icon: require('@/static/images/alipayTopUp.png'),
						name: '支付宝支付',
						isAppShow: this.paySwitch.ali_app === '1' && !this.onlyAward,
						isH5Show: this.paySwitch.ali_wap === '1' && !this.onlyAward,
						disabled: false
					},
					{
						id: 3,
						appPayType: 6,
						h5PayType: 6,
						icon: require('@/static/images/balancePay.png'),
						name: '余额支付',
						isAppShow: !this.onlyAward,
						isH5Show: !this.onlyAward,
						disabled: false
					},
					{
						id: 4,
						appPayType: 7,
						h5PayType: 7,
						icon: require('@/static/images/jlPay.png'),
						name: '积分支付',
						isAppShow: this.onlyAward? this.onlyAward : this.hasAward && this.paySwitch.air === '1',
						isH5Show: this.onlyAward? this.onlyAward : this.hasAward && this.paySwitch.air === '1',
						disabled: false
					},
					{
						id: 5,
						appPayType: 8,
						h5PayType: 8,
						icon: require('@/static/images/sd.png'),
						name: '杉德快捷支付',
						isAppShow: this.paySwitch.sand_fast === '1' && !this.onlyAward,
						isH5Show: this.paySwitch.sand_fast === '1' && !this.onlyAward,
						disabled: false
					},
					{
						id: 6,
						appPayType: 9,
						h5PayType: 9,
						icon: require('@/static/images/jd.png'),
						name: '京东快捷支付',
						isAppShow: this.paySwitch.dlb === '1' && !this.onlyAward,
						isH5Show: this.paySwitch.dlb === '1' && !this.onlyAward,
						disabled: false
					},
					{
						id: 7,
						appPayType: 11,
						h5PayType: 11,
						icon: require('@/static/images/sd.png'),
						name: '杉德云钱包',
						isAppShow: this.paySwitch.sand_yun === '1' && !this.onlyAward,
						isH5Show: this.paySwitch.sand_yun === '1' && !this.onlyAward,
						disabled: false
					}
				];
				return payArr;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-black {
		.radio_name{
			color: #FFFFFF!important;
		}
	}

	.pay_way {
		margin: 20rpx 30rpx;
		// background-color: #fff;
		border-radius: 14rpx;
	}

	.u-radio {
		flex-direction: row-reverse;
		margin: 0 30rpx;
		// padding-right: 60rpx;
		// width: 100% !important;
		width: -webkit-fill-available !important;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		border-top: 1rpx solid;
		&:first-child {
			border-top: none;
		}
	}

	/deep/.u-radio__label {
		display: flex;
		align-items: center;
	}

	.u-radio-group {
		width: 100%;
	}

	// .u-radio+.u-radio {
	// 	border-top: 1rpx solid;
	// }

	.radio_img {
		width: 38rpx;
		margin-right: 32rpx;
	}
</style>
