<template>
	<view class="page" :class="getThemeClass">
		<!-- <unavbar title="版权品市场" ></unavbar> -->
		
		<view class="my-search-box card-bg">
			<u-search
				class="u_search"
				placeholder="搜索艺术家/艺术品"
				v-model="searchKeyword"
				height="80"
				:bg-color="getCardColor" 
				:placeholder-color="getTextPlaceholderColor" 
				:color="getTextColor" 
				:show-action="false"
				search-icon=""
				@search="searchChange"
				@clear="searchChange('')"
			></u-search>
		</view>
		
		<view class="my-filter">
			<view class="filter-options-box">
				<view class="my-filter-left">
					<view class="filter-item name" :class="sortingTime !== 0? 'active' : ''" @click="changeSortingTime">
						<view class="u-m-r-10">时间</view>
						<image
							:src="
								sortingTime === 0?'/static/images/filter.png' : 
								sortingTime === 1?'/static/images/filterTop.png' : 
								sortingTime === 2?'/static/images/filterBot.png' : ''"
							style="width: 14rpx; height: 25rpx;"
						></image>
					</view>
					<view class="filter-item name u-m-l-25" :class="sortingPrice !== 0? 'active' : ''" @click="changeSortingPrice">
						<view class="u-m-r-10">价格</view>
						<image
							:src="
								sortingPrice === 0?'/static/images/filter.png' : 
								sortingPrice === 1?'/static/images/filterTop.png' : 
								sortingPrice === 2?'/static/images/filterBot.png' : ''"
							style="width: 14rpx; height: 25rpx;"
						></image>
					</view>
				</view>
				<view class="my-filter-right">
					
					<view class="filter-item" @click="isDouble = !isDouble">
						<image 
							:src="isDouble? '/static/images/single.png' : '/static/images/double.png'" 
							style="width: 25rpx; height: 25rpx;"
						></image>
					</view>
					
					<view class="filter-item u-m-l-20" @click="changeScreenings" v-if="screening.length > 0">
						<image 
							src="/static/images/sx.png"
							style="width: 35rpx; height: 35rpx;"
						></image>
					</view>
				</view>
			</view>
			<view class="filter-selected-box">
				<template v-for="(item, index) in screeningActiveList" >
					<view class="filter-selected-item card-tag-bg text-main" :key="item.item.id">
						<view class="filter-selected-text">{{ item.item.name }}</view>
						<u-icon class="del" name="close" size="20" @click="delScreening(index)"></u-icon>
					</view>
				</template>
			</view>
		</view>
		
		<my-goods-list :listData="listData" listType="battle" :listStatus="listStatus" :doubleLine="isDouble" @click="clickGoods" />
		
		<!-- <empty v-if="!listData.length && listStatus !== 'loading'"></empty> -->
		<view class="featured card" :class="getThemeClass" v-if="false">
			<view class="featured_item card-bg" v-for="(item, index) in listData" :key="index" @click="goDetails(item.id)">
				<view class="plan">
					<image :src="item.cover || ''" mode="aspectFit"></image>
					<view class="soldout" v-if="item.sur_issue == 0">
						已售罄
					</view>
					<view class="presale color-red" v-if="item.diff > 0 && item.sur_issue > 0">
						<text class="color-main">预售倒计时：</text>
						<count :end="item.diff"></count>
					</view>
				</view>
				<view class="featured_content">
					<view class="cont_header">
						<view class="avatar_img"><image :src="item.avatar || '/static/logo.png'" mode="widthFix"></image></view>
						<view class="text-main">{{ item.nickname || '' }}</view>
					</view>
					<view class="cont_title u-m-t-30">{{ item.title || '' }}</view>
					<view class="cont_price color-red">
						<text>USDT</text>
						{{ item.price || '' }}
					</view>
					<view class="flex justify-between align-center margin-top-20">
						<view class="u-font-22 color-a">发行数量：{{ item.total_issue }}件</view>
						<view class="u-font-22 color-a">剩余：{{ item.sur_issue }}件</view>
					</view>
				</view>
			</view>
		</view>
		<view class="featured" :class="getThemeClass" v-if="false">
			<view class="featured_item flex" style="width: 690rpx;" v-for="(item, index) in listData" :key="index" @click="goDetails(item.id)">
				<view style="position: relative;">
					<image :src="item.cover || ''" mode="aspectFill" style="width: 260rpx;height: 260rpx;"></image>
					<view class="soldout" v-if="item.sur_issue == 0">
						已售罄
					</view>
					<view class="presale color-red" v-if="item.diff > 0 && item.sur_issue > 0">
						预售倒计时：<count :end="item.diff"></count>
					</view>
				</view>
				<view class="featured_content flex-1 flex flex-direction justify-around">
					<view class="flex justify-between align-center">
						<view class="cont_header">
							<view class="avatar_img"><image :src="item.avatar || '/static/logo.png'" mode="widthFix"></image></view>
							<view>{{ item.nickname || '' }}</view>
						</view>
						<view class="cont_price" style="margin: 0;">
							{{ item.price || '' }}
							<text>USDT</text>
						</view>
					</view>

					<view class="cont_title">{{ item.title || '' }}</view>

					<view class="flex justify-between align-center margin-top-20">
						<view class="u-font-22 color-a">发行数量：{{ item.total_issue }}件</view>
						<view class="u-font-22 color-a">剩余：{{ item.sur_issue }}件</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- <u-loadmore :status="listStatus" :margin-top="30" v-if="listData.length > 0 || listStatus === 'loading'" /> -->
		
		<u-popup v-model="showScreening" mode="right" :closeable="true" border-radius="20" class="my-popup" >
			<view class="my-screening-box">
				<view class="my-screening-header">
					<text class="screening-header-title text-main">全部筛选</text>
				</view>
				<scroll-view class="my-screening-content" scroll-y>
					<template v-for="item in screening">
						<view class="screening-item-box" :key="item.id">
							<view class="screening-title-box">
								<view class="screening-title-icon bg-main"></view>
								<text class="screening-title-text">{{ item.name }}</text>
							</view>
							<view class="screening-item-list">
								<template v-for="screeningItem in item.list">
									<view 
										:key="screeningItem.id"
										class="screening-item-list-item border-color text-content"
										:class="checkScreeningActive(item.id, screeningItem.id)? 'color-main border-color-main' : ''"
										@click="changeScreening(item.id, screeningItem)"
									>{{ screeningItem.name }}</view>
								</template>
							</view>
						</view>
					</template>
				</scroll-view>
				<view class="my-screening-buttom">
					<botBtn @click="screeningReset" padding="20rpx 50rpx" plain>重置</botBtn>
					<botBtn @click="screeningSubmit" padding="20rpx 50rpx">完成</botBtn>
				</view>
			</view>
		</u-popup>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import count from '@/components/count.vue';
export default {
	components: {
		count
	},
	data() {
		return {
			type: 0,
			listData: [],
			listStatus: 'loading',
			listPages: 0,
			listLimit: 8,
			screening: [],
			screeningActiveList: [],
			showScreening: false,
			isDouble: true,
			searchKeyword: '',
			sortingTime: 0,
			sortingPrice: 0,
		};
	},
	onLoad() {
		this.loadData(true, true)
	},
	onPullDownRefresh() {
		this.loadData(true, true)
	},
	onReachBottom() {
		if(this.listStatus === 'loadmore'){
			this.loadData(false, false)
		}
	},
	computed: {
		screeningId(){
			let _IDS = 0
			for (let screeningItem of this.screeningActiveList) {
				_IDS = screeningItem.item.id
			}
			return _IDS
		}
	},
	methods: {
		loadData(reset, initialize){
			if(reset){
				this.listData = []
				this.listPages = 0
			}
			this.listStatus = 'loading'
			this.listPages += 1
			
			this.$u.api.mortgage_index({
				page: this.listPages,
				limit: this.listLimit,
				type:this.type,
				class_id: this.screeningId,
				key_word: this.searchKeyword,
				dates: this.sortingTime,
				sort: this.sortingPrice,
			})
			.then(res => {
				
				if(initialize && res.data.goods_class && res.data.goods_class.length > 0){
					this.$set(this.screening, 0, {
						name: '热门分类',
						id: 1,
						list: res.data.goods_class
					})
				}
				this.listData = [...this.listData, ...res.data.list.data]
				this.listStatus = res.data.list.next_page_url ? 'loadmore' : 'nomore'
				uni.stopPullDownRefresh()
			})
			.catch(err => {
				uni.stopPullDownRefresh()
				this.listStatus = 'nomore'
			});
			
		},
		searchChange(){
			this.loadData(true, false)
		},
		changeSortingTime(){
			if(this.sortingTime < 2){
				this.sortingTime += 1
			} else {
				this.sortingTime = 0
			}
			this.sortingPrice = 0
			this.loadData(true, false)
		},
		changeSortingPrice(){
			if(this.sortingPrice < 2){
				this.sortingPrice += 1
			} else {
				this.sortingPrice = 0
			}
			this.sortingTime = 0
			this.loadData(true, false)
		},
		changeScreenings(){
			this.showScreening = true
		},
		changeScreening(pid, item){
			if(!this.checkScreeningActive(pid, item.id)){
				this.screeningActiveList = []
				this.screeningActiveList.push({
					pid,
					item
				})
				this.loadData(true, false)
				this.showScreening = false
			}
		},
		delScreening(index){
			this.screeningActiveList.splice(index, 1)
			this.loadData(true, false)
		},
		screeningReset(){
			this.screeningActiveList = []
			this.loadData(true, false)
			this.showScreening = false
		},
		screeningSubmit(){
			this.loadData(true, false)
			this.showScreening = false
		},
		checkScreeningActive(pid, id){
			for (let screeningItem of this.screeningActiveList) {
				if(screeningItem.pid === pid && screeningItem.item.id === id){
					return true
				}
			}
			return false
		},
		clickGoods(goods){
			uni.navigateTo({
				url: '/pages/market/goods-def/goods-def-one?id=' + goods.id
			});
		},
		goDetails(id, status) {
			uni.navigateTo({
				url: '/pages/battle/goods-def-one?id=' + id
			});
			// if (status == 0) {
			// 	uni.navigateTo({
			// 		url: '../../market/goods-def/goods-def?id=' + id
			// 	})
			// }
			// if (status == 1) {
			// 	uni.navigateTo({
			// 		url: '../../market/goods-presale/goods-presale?id=' + id
			// 	})
			// }
			// if (status == 2) {
			// 	uni.navigateTo({
			// 		url: '../../market/goods-auctionDef/goods-auctionDef?id=' + id
			// 	})
			// }
			// if (status == 3) {
			// 	uni.navigateTo({
			// 		url: '../../market/goods-soldOut/goods-soldOut?id=' + id
			// 	})
			// }
		}
	}
};
</script>

<style lang="scss" scoped>
	.author-avatar{
		width: 50rpx;
		height: 50rpx;
		border-radius: 25rpx;
	}
.soldout{
	position: absolute;
	top: 0;
	right: 0;
	background: rgba(0,0,0,0.5);
	border-radius: 0 0 0 20rpx;
	padding: 8rpx 15rpx;
	font-size: 26rpx;
	color: #eee;
	z-index: 1;
}

	.search_box {
		display: flex;
		align-items: center;
		margin: 30rpx 30rpx 0;
		background-color: #fff;
		border-radius: 34rpx;

		.cla {
			// width: 60rpx;
			display: flex;
			text-align: center;
			margin-left: 24rpx;
			color: #818488;

			.cla_text {
				font-size: 30rpx;
				padding-bottom: 6rpx;
				margin-right: 6rpx;
			}
		}
	}


	.filter {
		display: flex;
		margin: 34rpx 38rpx 20rpx 42rpx;
		justify-content: space-between;

		.filter_left {
			display: flex;
		}

		.filter_item {
			display: flex;
			align-items: center;
			color: #919191;
			font-size: 24rpx;
			padding: 10rpx 15rpx;
			background-color: rgba(#999999, .3);
			border-radius: 50rpx;

			image {
				width: 14rpx;
				margin-left: 8rpx;
			}
		}

		.filter_item:nth-child(2) {
			margin-left: 40rpx;
		}

		.filter_right {
			display: flex;
			align-items: center;
			color: #666666;
			font-size: 24rpx;
		}
	}

	.filter_selected {
		display: flex;
		margin: 0 30rpx;

		.category {
			display: flex;
			padding: 12rpx 22rpx;
			align-items: center;
			border-radius: 24rpx;
			font-size: 24rpx;
			margin-left: 16rpx;

			.del {
				margin-top: 4rpx;
				margin-left: 8rpx;
			}
		}
	}

	.popup_title {
		margin: 52rpx auto 60rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
	}

	/deep/.u-close--top-right {
		top: 54rpx;
		right: 44rpx;
	}

	.filter_title {
		font-size: 30rpx;
		color: #999999;
		margin-bottom: 58rpx;
	}

	.popular {
		margin-bottom: 42rpx;
		display: flex;
		flex-wrap: wrap;

		.popular_item {
			padding: 22rpx 52rpx;
			border: 1px solid #D4D4D4;
			border-radius: 10rpx;
			margin: 0 16rpx 20rpx 0;
			color: #999999;
			font-size: 26rpx;
		}
	}

	.bot_btn {
		display: flex;
		margin: 96rpx 32rpx 62rpx;

		button {
			flex: 1;
			border-radius: 10rpx;
			font-size: 28rpx;
			height: 80rpx;
			line-height: 80rpx;
		}

		button+button {
			margin-left: 18rpx;
		}

		.reset {
			border: 1px solid #C7CFD4;
			background-color: #fff;
			color: #333333;
		}

		.finish {
			background-color: #764E39;
			color: #fff;
		}
	}

	.checked_style {
		border: 1px solid !important;
	}

	.featured {
		margin: 30rpx 30rpx 0 30rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-bottom: 60rpx;

		.featured_item {
			border-radius: 20rpx;
			width: 334rpx;
			margin-bottom: 20rpx;
			overflow: hidden;

			.plan {
				border-radius: 20rpx;
				width: 100%;
				height: 336rpx;
				overflow: hidden;
				display: flex;
				align-items: center;
				position: relative;
			}

			.featured_content {
				padding: 30rpx 24rpx;

				.cont_header {
					display: flex;
					color: #111111;
					font-size: 24rpx;
					align-items: center;

					.avatar_img {
						width: 44rpx;
						height: 44rpx;
						border-radius: 50rpx;
						margin-right: 25rpx;
						overflow: hidden;

						image {
							width: 100%;
						}
					}
				}

				.cont_title {
					font-size: 28rpx;
					font-weight: bold;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.cont_price {
					font-size: 34rpx;
					font-weight: bold;
					margin-top: 40rpx;

					text {
						font-size: 22rpx;
					}
				}
			}

			.like {
				width: 46rpx;
				height: 46rpx;
				border-radius: 50%;
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 24rpx;
				}
			}

			.presale {
				position: absolute;
				font-size: 22rpx;
				bottom: 0rpx;
				left: 0;
				width: 100%;
				background: rgba(0, 0, 0, 0.6);
				padding-left: 16rpx;
			}

			.type {
				position: absolute;
				color: #fff;
				font-size: 20rpx;
				bottom: 18rpx;
				right: 18rpx;
			}
		}
	}

	.loading {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 50rpx;
		height: 50rpx;
		margin-left: -25rpx;
		margin-top: -25rpx;
	}
</style>