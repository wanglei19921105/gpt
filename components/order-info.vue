<template>
	<view>
		<view class="order_info card-bg" :class="getThemeClass">
			<view class="info_item border-color" v-if="one>1">
				<view>数量</view>
				<u-number-box :min="1" :max="one" v-model="num" @change="valChange"></u-number-box>
			</view>
			<view class="info_item border-color" v-else>
				<view class="text-call">数量</view>
				<view>x1</view>
			</view>
			<view v-if="zhuanqu">
				<view class="info_item border-color" v-if="plat_free || plat_free === 0">
					<view class="text-call">手续费</view>
					<view>{{ plat_free }}USDT</view>
				</view>
				<view class="info_item border-color" v-if="plat_free || plat_free === 0">
					<view class="text-call">版权费</view>
					<view>{{ copyright }}USDT</view>
				</view>
			</view>
			<view class="info_item border-color">
				<view class="text-call">订单状态</view>
				<view>待支付</view>
			</view>
			<view class="info_item border-color">
				<view class="text-call">创建时间</view>
				<view>{{ time }}</view>
			</view>
			<view class="info_item border-color">
				<view class="text-call">商品总金额</view>
				<view class="text_red color-red">{{ price }}USDT</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'order-info',
	props: {
		infoData: {
			type: Object,
			default: () => {
				return {};
			}
		},
		one: {
			type: Number,
			default: 1
		},
		zhuanqu:{
			type: Boolean,
			default: true
		},
	},
	watch: {
		infoData: {
			handler(newVal) {
				this.$nextTick(()=>{
					this.dataDef = newVal;
					console.log(this.dataDef);
					this.plat_free = Number(newVal.plat_free);
					this.copyright = Number(newVal.copyright);
					this.price = Number(newVal.price);
				})
			},
			deep: true,
			immediate: true
		}
	},
	data() {
		return {
			dataDef: {},
			num: 1,
			plat_free: 0,
			copyright: 0,
			price: 0,
			time:''
		};
	},
	created() {
		this.getTime()
	},
	methods: {
		valChange(e) {
			this.$emit('change',e.value)
			this.plat_free = Math.floor(Number(e.value) * this.dataDef.plat_free * 100) / 100;
			this.copyright = Math.floor(Number(e.value) * this.dataDef.copyright * 100) / 100;
			this.price = Math.floor(Number(e.value) * this.dataDef.price * 100) / 100;
			this.$forceUpdate()
		},
		getTime() {
			//获取创建时间
			let da = Date.now();
			da = new Date(da);
			var year = da.getFullYear();
			var month = da.getMonth() + 1;
			var date = da.getDate();
			var hours = da.getHours();
			var minutes = da.getMinutes();
			var seconds = da.getSeconds();
			this.time = [year, month, date].join('-') + ' ' + [hours, minutes, seconds].join(':');
		},
	}
};
</script>

<style lang="scss" scoped>
.page-black {
	// background-color: #292b2b !important;

	.info_item + .info_item {
		// border-top: 1px solid #363737 !important;
	}

	.info_item {
		view:nth-child(2) {
			// color: #ffffff;
		}
	}

	.text_red {
		// color: #f7924c !important;
	}
}

.order_info {
	margin: 20rpx 30rpx;
	// background-color: #fff;
	border-radius: 14rpx;

	.info_item {
		display: flex;
		height: 100rpx;
		justify-content: space-between;
		align-items: center;
		margin: 0 30rpx;
		font-size: 28rpx;
		border-top: 1rpx solid;
		
		&:first-child {
			border-top: none;
		}

		view:nth-child(1) {
			// color: #999999;
		}

		.text_red {
			// color: red;
			font-weight: bold;
		}
	}

	.info_item + .info_item {
		// border-top: 1px solid #f0f0f0;
	}
}
</style>
