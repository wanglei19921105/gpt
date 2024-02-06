<template>
	<view class="page" :class="getThemeClass">
		<view class="flex justify-between align-center margin-top-30" v-for="(item,index) in trade_list" :key="index">
			<image :src="item.avatar" mode="aspectFill" class="jl-avatar"></image>
			<view class="flex-1 margin-left-20">
				<view class="flex justify-between align-center size-26 margin-bottom-10">
					<view class="text-name">{{item.nickname}}</view>
					<view class="jl-price color-red">{{item.price}}USDT</view>
				</view>
				<view class="flex justify-between align-center size-22 text-content">
					<view >{{init(item.phone)}}</view>
					<view >{{item.created_at}}</view>
				</view>
			</view>
		</view>
		<empty v-if="trade_list.length === 0" />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			trade_list: [],
			params: {
				page: 1,
				limit: 10,
			},
			current: 0
		};
	},
	onShow() {
		this.tradeLog();
	},
	onLoad(data) {
		// console.log(data);
		this.id = data.id
	},
	methods: {
		tradeLog() {
			this.$u.api.pre_trade_log({id:this.id}).then(res => {
				if (res.code == 200) {
					this.trade_list = res.data.list.data;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	
</style>
