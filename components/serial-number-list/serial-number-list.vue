<template>
	<view 
		:class="[darkTheme? 'dark' : 'light' , 'serial-number-list']"
	>
		<u-popup 
			v-model="show"
			border-radius="20"
			:mask-close-able="false"
			safe-area-inset-bottom
			mode="bottom"
			class="serial-number-list-popup"
		>
			<view class="list-box bg-color">
				<view class="list-header-box">
					<view class="list-header-title-box">
						<text class="list-header-title-text text-color">商品列表</text>
					</view>
					<view class="list-header-close-box">
						<u-icon 
							name="close" 
							size="28" 
							:color="mainTextColor"
							@click="close"
						></u-icon>
					</view>
				</view>
				
				<view class="list-screening-box">
					<view class="list-screening-left">
						<!-- <u-subsection 
							font-size="24"
							:list="sortingList" 
							:current="sortingCurrent"
							:active-color="mainColor"
							:inactive-color="mainTextColor"
							:bg-color="mainBgHoverColor"
							:button-color="mainBgColor"
						></u-subsection> -->
						<template v-for="(item, index) in sortingList">
							<view 
								:key="item.name"
								class="screening-item-box"
							>
								<text 
									class="text-tip-tcolor u-font-28" 
									:class="sortingCurrent === index? 'main-color' : ''"
									@click="changeSorting(index)"
								>{{ item.name }}</text>
							</view>
						</template>
					</view>
					<view class="list-screening-right">
						<u-checkbox 
							@change="checkboxChange" 
							v-model="checked"
							:active-color="mainColor"
							:disabled="this.status === 'loading'"
							size="30"
							shape="circle"
						>
							<text class="u-font-24 text-tip-tcolor">仅看寄售商品</text>
						</u-checkbox>
					</view>
				</view>
				
				<view class="list-content-box">
					 <scroll-view 
						style="height: 1000rpx;"
						refresher-default-style="white"
						:refresher-background="mainBgHoverColor"
						:refresher-triggered="dropDownLoading"
						:show-scrollbar="false"
						:refresher-enabled="false"
						@refresherrefresh="loadData(true, true)"
						@scrolltolower="pageNext"
						scroll-anchoring
						enable-flex
						scroll-with-animation 
						scroll-y
					>
						<view class="list-content-scroll-box">
							<template v-for="item in list">
								<view
									class="list-item-box bg-hover-color"
									hover-start-time="30"
									hover-stay-time="30"
									:hover-class="
										item.products_status === 0 && item.review_status === 1? 
										'my-hover-class' : 'none'
									"
									:class="
										item.products_status === 0 && item.review_status === 1? 
										'' : ' bg-disabled-color'
									"
									:key="item.id"
									@click="clickItem(item)"
								>
									<view class="list-item-left">
										<view class="list-item-left-top">
											<text class="list-item-number text-color">#{{ item.tab }}</text>
											<view class="list-item-tag-box">
												<u-tag 
													v-if="item.products_status === 6" 
													text="已销毁" type="info" 
													size="mini" shape="circle" 
												/>
												<u-tag 
													v-if="item.products_status === 0 && item.review_status === 1" 
													text="寄售" type="success" 
													size="mini" shape="circle" 
												/>
												<u-tag
													v-if="item.products_status === 2 && item.review_status === 1" 
													text="拍卖" type="success" 
													size="mini" shape="circle" 
												/>
												<u-tag 
													v-if="item.products_status === 5 && item.review_status === 1" 
													text="锁单中" type="error" 
													size="mini" shape="circle" 
												/>
												<u-tag 
													v-if="item.products_status !== 6 && item.review_status === 0" 
													text="未寄售" type="warning" 
													size="mini" shape="circle" 
												/>
											</view>
										</view>
										<view class="list-item-left-bottom">
											<text 
												class="list-item-hash text-tip-tcolor u-line-1"
											>哈希值：{{ item. mint_tx}}</text>
										</view>
									</view>
									<view class="list-item-right">
										<view class="list-item-price-box">
											<text class="list-item-price-text main-color">{{ item.price }}</text>
											<text class="list-item-price-unit main-color">USDT</text>
										</view>
									</view>
								</view>
							</template>
							
							<template v-if="list.length === 0 && status === 'nomore'">
								<u-empty margin-top="200" />
							</template>
							
							<template v-if="list.length > 5 || status === 'loading'">
								<u-loadmore :status="status" />
							</template>
						</view>
					 </scroll-view>
				</view>
				
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"serial-number-list",
		props: {
			value: {
				type: Boolean,
				required: true
			},
			goodsId: {
				type: [Number,String],
				default:'0'
			},
			darkTheme: {
				type: Boolean,
				required: true,
			}
		},
		data() {
			return {
				list: [],
				page: 0,
				limit: 20,
				status: 'loadmore',
				pageLoading: true,
				dropDownLoading: false,
				sortingList: [
					{
						name: '按编号排序'
					},
					{
						name: '按价格排序'
					}
				], 
				sortingCurrent: 1,
				checked: true,
			};
		},
		created() {
			// this.loadData(true)
		},
		methods: {
			loadData(reset, dropDown){
				if(reset){
					this.page = 0
					this.list = []
				}
				if(dropDown){
					this.dropDownLoading = true
				}
				this.page += 1
				this.status = 'loading'
				
				this.$u.api.new_tong_list({
					id: this.goodsId,
					products_status: this.checked? 1 : 0,
					price: this.sortingCurrent === 1? 1 : 0,
					tab: this.sortingCurrent === 0? 1 : 0,
					page: this.page,
					limit: this.limit
				}).then(({data}) => {
					if(reset){}
					this.list = reset? data.list.data : [...this.list, ...data.list.data]
					this.status = data.list.next_page_url? 'loadmore' : 'nomore'
					this.pageLoading = false
					if(reset){
						if(this.dropDownLoading) this.dropDownLoading = false
					}
				}, err => {
					this.pageLoading = false
					if(this.dropDownLoading) this.dropDownLoading = false
					if(this.page !== 0) this.page -= 1
					this.status = 'loadmore'
				})
				
			},
			changeSorting(index){
				if(this.sortingCurrent !== index){
					if(this.status === 'loading'){
						uni.showLoading({
							mask: true,
							title: '加载中...'
						})
					} else {
						this.sortingCurrent = index
						this.loadData(true)
					}
				}
			},
			pageNext(){
				if(this.status !== 'nomore' && this.status !== 'loading'){
					this.loadData()
				}
			},
			checkboxChange(e){
				this.checked = e.value
				this.loadData(true)
			},
			close(){
				// uni.showLoading({
				// 	title: '加载中..'
				// })
				this.show = false
			},
			clickItem(item){
				if(this.id !== item.id && item.products_status === 0 && item.review_status === 1){
					this.$emit('clickItem', item)
				}
				if(this.id !== item.id && item.products_status === 2 && item.review_status === 1){
					this.$emit('clickItem', item)
				}
			}
		},
		computed: {
			show: {
				get(){
					return this.value
				},
				set(value){
					this.$emit('input', value)
				}
			},
			mainColor(){
				return this.darkTheme? '#007BFF' : '#007BFF'
			},
			mainTextColor(){
				return this.darkTheme? '#FFFFFF' : '#303133'
			},
			mainBgColor(){
				return this.darkTheme? '#1E1E1E' : '#FFFFFF'
			},
			mainBgHoverColor(){
				return this.darkTheme? '#111926' : '#f8f8f8'
			}
		},
		watch: {
			value(n){
				if(n) {
					this.loadData(true)
				} else {
					this.list = []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
.serial-number-list{
	.list-box{
		
		.list-header-box{
			padding: 30rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.list-header-title-box{
				.list-header-title-text{
					font-size: 32rpx;
					font-weight: 500;
				}
			}
		}
		
		.list-screening-box{
			padding: 0rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.list-screening-left{
				min-width: 400rpx;
				display: flex;
				.screening-item-box{
					margin-right: 50rpx;
				}
			}
		}
		
		.list-content-box{
			padding: 20rpx 30rpx;
			.list-content-scroll-box{
				padding: 15rpx 0rpx;
				
				.list-item-box{
					width: 100%;
					padding: 30rpx 20rpx;
					border-radius: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 20rpx;
					
					.list-item-left{
						display: flex;
						flex-direction: column;
						.list-item-left-top{
							display: flex;
							align-items: center;
							.list-item-number{
								font-size: 32rpx;
								font-weight: 800;
							}
							.list-item-tag-box{
								margin-left: 20rpx;
							}
						}
						.list-item-left-bottom{
							max-width: 400rpx;
							margin-top: 20rpx;
							.list-item-hash{
								display: block;
								max-width: 400rpx;
								font-size: 24rpx;
							}
						}
					}
					
					.list-item-right{
						flex-shrink: 0;
						.list-item-price-box{
							display: flex;
							align-items: flex-end;
							.list-item-price-unit{
								font-size: 24rpx;
								font-weight: 500;
							}
							.list-item-price-text{
								font-size: 34rpx;
								font-weight: 500;
							}
						}
					}
				}
			}
			
		}
		
	}
	
	.my-hover-class{
		opacity: .8;
	}
	
}

$theme_list: 
	(
		name: 'dark', 
		main-color: (
			color: #007BFF !important,
		),
		text-color: (
			color: #FFFFFF,
		),
		text-tip-tcolor: (
			color: #ACACAC,
		),
		hove-text_color: (
			color: #FFFFFF,
		),
		bg-color: (
			background-color: #1E1E1E,
		),
		bg-hover-color: (
			background-color: #111926,
		),
		bg-disabled-color: (
			background-color: #111926,
		),
	), 
	(
		name: 'light',
		main-color: (
			color: #007BFF !important,
		),
		text-color: (
			color: #303133,
		),
		text-tip-tcolor: (
			color: #ACACAC,
		),
		hove-text-color: (
			color: #303133,
		),
		bg-color: (
			background-color: #FFFFFF,
		),
		bg-hover-color: (
			background-color: #f8f8f8,
		),
		bg-disabled-color: (
			background-color: #f8f8f8,
		),
	);
		
@each $teme_item in $theme_list {
	@each $teme_item_key, $teme_item_value in $teme_item {
	  @if($teme_item_key != name) {
	    .#{map-get($teme_item, name)} .#{$teme_item_key} {
	      @each $teme_item_value_key, $teme_item_value_value in $teme_item_value {
					#{$teme_item_value_key}: $teme_item_value_value;
				}
	    }   
	  } 
	}
}
</style>