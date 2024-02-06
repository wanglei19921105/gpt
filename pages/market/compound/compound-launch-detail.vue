<template>
	<view class="page" :class="getThemeClass">
		<view class="compound_msg card-bg">
			<image class="goods-image" :src="msg.cover" mode="aspectFill"></image>
			<view class="u-m-b-20 flex align-center justify-between">
				<view class="size-32 text-bold">{{ msg.title }}</view>
				<view v-if="type == 0" class="size-26" :class="msg.status == 2?'col-FE1313':'col-04D6A4'">{{ msg.status == 2 ?'涅槃失败':'涅槃成功' }}</view>
			</view>
		</view>
		<view class="compound-top">
			<view class="size-32 text-bold">消耗碎片</view>
			<view class="compound-list flex flex-wrap card-bg">
				<view class="pos-re margin-right-25" v-for="(item,index) in list" :key="index">
					<image :src="item.cover" mode="aspectFill" class="compound-suipian"></image>
					<view class="lock-icon">{{item.count}}</view>
				</view>
			</view>
		</view>
		<view class="gap-30"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id:'',
			type:0,
			msg:{},
			list:[]
		};
	},
	onLoad(data) {
		this.id = data.id||''
		this.type = data.type||''
		this.loadData();
	},
	methods: {
		loadData() {
			this.$u.api.mix_join_log_detail({id: this.id}).then(res=>{
				this.msg = res.data.mix
				this.list = res.data.cast_list
			})
		},
	}
};
</script>

<style lang="scss">
	.col-04D6A4{
		color: #04D6A4;
	}
	.col-FE1313{
		color: #FE1313;
	}
.compound-top {
	width: 750rpx;
	padding: 36rpx 24rpx;
}
.goods-image{
	width: 646rpx;
	height: 646rpx;
	border-radius: 24rpx;
	margin-bottom: 30rpx;
}
.compound_msg{
	width: 694rpx;
	padding: 24rpx;
	margin: 28rpx;
	border-radius: 24rpx;
}
.compound-list{
	padding: 30rpx;
	margin-top: 30rpx;
	border-radius: 20rpx;
	.pos-re{
		position: relative;
		.lock-icon{
			position: absolute;
			top: 0;
			right: 0;
			z-index: 1;
			background-color: #D9C19D;
			color: #2B2E2E;
			font-size: 16rpx;
			padding: 5rpx 10rpx;
			border-radius: 0 10rpx 0 10rpx;
		}
	}
	.compound-suipian{
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
	}
}

</style>
