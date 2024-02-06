<template>
	<view class="my-goods-list">
		<empty v-if="!listData.length && listStatus !== 'loading'"></empty>
		<template v-for="(item, index) in listData">
			<my-goods-list-item 
				:listData="listData"
				:goods="item" 
				:key="item.id" 
				class="u-m-t-30"
				@likeCli="(id, status) => $emit('likeCli', id, status)"
				:showSubscribe="showSubscribe"
				:doubleLine = "doubleLine"
				:listType="listType"
				@click.self="clickItem"
			/>
		</template>
		<view class="u-flex align-center justify-center bottom-box" v-if="paging">
			<u-loadmore :status="listStatus" :margin-top="30" v-if="listData.length > 0 || listStatus === 'loading'" />
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods-list",
		props: {
			listData: {
				type: Array,
				require: true
			},
			listType: {
				type: String,
				default: 'normal', // blind
			},
			showSubscribe: {
				type: Boolean,
				default: true
			},
			doubleLine: {
				type: Boolean,
				default: true
			},
			paging: {
				type: Boolean,
				default: true
			},
			listStatus: {
				type: String,
				default: 'nomore',
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			clickItem(goods){
				if(this.listType === 'normal' || this.listType === 'blind') {
					this.$u.route(
						this.listType === 'normal'? 
						'/pages/market/goods-def/goods-def-one' : 
						this.listType === 'blind'?
						'/pages/frontPage/blindBox-def/blindBox-def' : '',
						{
							id: goods.id
						}
					)
				}
				this.$emit('click', goods)
			},
		}
	}
</script>

<style lang="scss" scoped>
.my-goods-list{
	padding: 0rpx 30rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.bottom-box {
	width: 100%;
	margin-top: 30rpx;
}
</style>