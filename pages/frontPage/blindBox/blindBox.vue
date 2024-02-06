<template>
	<view class="page" :class="getThemeClass">
		<!-- <unavbar :title="i18n.blindbox1"></unavbar> -->
		
		<view class="my-search-box card-bg">
			<u-search
				class="u_search"
				placeholder="搜索盲盒名称"
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
		
		<my-goods-list :listData="listData" listType="blind" :listStatus="listStatus" :doubleLine="isDouble" />
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [],
				type: 0,
				screening: [],
				screeningActiveList: [],
				showScreening: false,
				listStatus: 'loading',
				listPages: 0,
				listLimit: 8,
				isDouble: true,
				searchKeyword: '',
				sortingTime: 0,
				sortingPrice: 0,
			};
		},
		onLoad(option) {
			this.loadData(true)
		},
		onPullDownRefresh() {
			this.loadData(true)
		},
		onReachBottom() {
			if(this.listStatus === 'loadmore'){
				this.loadData()
			}
		},
		methods: {
			loadData(reset) {
				if(reset){
					this.listData = []
					this.listPages = 0
				}
				this.listStatus = 'loading'
				this.listPages += 1
			
				this.$u.api.blindbox_index({
					page: this.listPages,
					limit: this.listLimit,
					type: this.type,
					key_word: this.searchKeyword,
					dates: this.sortingTime,
					sort: this.sortingPrice,
				}).then(res => {
					this.listData = [...this.listData, ...res.data.list.data]
					this.listStatus = res.data.list.next_page_url ? 'loadmore' : 'nomore'
					uni.stopPullDownRefresh()
				}).catch(err => {
					uni.stopPullDownRefresh()
					this.listStatus = 'nomore'
				})
			},
			searchChange(){
				this.loadData(true)
			},
			changeSortingTime(){
				if(this.sortingTime < 2){
					this.sortingTime += 1
				} else {
					this.sortingTime = 0
				}
				this.sortingPrice = 0
				this.loadData(true)
			},
			changeSortingPrice(){
				if(this.sortingPrice < 2){
					this.sortingPrice += 1
				} else {
					this.sortingPrice = 0
				}
				this.sortingTime = 0
				this.loadData(true)
			},
			changeScreenings(){
				this.showScreening = true
			},
			delScreening(index){
				this.screeningActiveList.splice(index, 1)
				this.loadData(true, false)
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
