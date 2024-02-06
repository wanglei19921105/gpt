<template>
	<view class="page" :class="getThemeClass">
		<view class="statusbar"></view>
		<view class="tabbar">
			<u-icon @click="back" name="arrow-left" color="#fff" size="40"></u-icon>
		</view>
		<image :src="products_cover" mode="aspectFill" class="batch-topimg"></image>
		<view class="botfun_item" @click="cement" v-if="news_count>0">
			相关公告
			<u-icon class="u_icon" name="arrow-right"></u-icon>
		</view>
		<view class="botfun_item" style="top: 270rpx;" @click="goGoods" v-if="pre_count>0">
			我有吗？
			<u-icon class="u_icon" name="arrow-right"></u-icon>
		</view>
		<!-- <image :src="avatar" mode="aspectFill" class="batch-avatar"></image>
		<view class="u-font-36 text-bold batch-ttitle">{{nickname}}</view> -->
		<view class="u-font-36 text-bold batch-ttitle">{{products_title}}</view>
		<view class="flex justify-center align-center u-m-t-24">
			<view class="batch-tagbox flex u-font-22 u-m-r-40">
				<view class="batch-tag text-white">发行</view>
				<view class="text-default u-p-l-10 u-p-r-10">{{cast_num}}份</view>
			</view>
			<view class="batch-tagbox flex u-font-22">
				<view class="batch-tag text-white">流通量</view>
				<view class="text-default u-p-l-10 u-p-r-10">{{turnover}}份</view>
			</view>
		</view>

		<view class="flex align-center justify-center u-m-t-30">
			<view class="flex align-center u-m-r-30" :class="current==0?'Collectsort_active':'Collectsort'" @click="numChange">
				<view :class="current==0?'size-30 text-bold':'size-26 color-9'">按编号排序</view>
				<image :src="`/static/images/my/${getThemeName}/saixuan-${numNo?'up':'down'}.png`"
					class="batch-saixuan"></image>
			</view>
			<view class="flex align-center" :class="current==1?'Collectsort_active':'Collectsort'" @click="priceChange">
				<view :class="current==1?'size-30 text-bold':'size-26 color-9'">按价格排序</view>
				<image :src="`/static/images/my/${getThemeName}/saixuan-${price?'up':'down'}.png`"
					class="batch-saixuan"></image>
			</view>
		</view>

		<view class="main-padding u-m-t-30">
			<view class="flex align-center" @click="checkChange">
				<image :src="`/static/images/my/${getThemeName}/${check?'':'Un'}check.png`"
					class="" style="width: 28rpx;height: 28rpx;"></image>
				<text class="u-font-24 u-m-l-15">仅看寄售商品</text>
				<!-- <label @click="checkChange">
					<checkbox :checked="check" color="#00E2E2" style="transform: scale(0.7);" />
				</label> -->
			</view>
			<view class="main-card card-bg u-m-t-24 flex justify-between align-center" v-for="(item,index) in list" :key="index" @click="godetail(index,item)">
				<view class="u-m-r-30">
					<view class="size-34 text-bold u-m-b-20">{{item.title}}</view>
					<view class="flex align-center" v-if="item.products_type==0">
						<view class="u-font-28 text-bold u-m-r-22">#{{item.tab}}</view>
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
					<view class="u-font-22 text-content u-m-t-20 word-warp" v-if="item.products_type==0">哈希值：{{item.mint_tx}}</view>
				</view>
				<view class="u-font-28 flex-shink text-bold" v-if="item.products_status !== 6 && item.review_status === 0">--USDT</view>
				<view class="u-font-28 flex-shink text-bold" v-else>{{item.price}}USDT</view>
			</view>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
		<view class="gap-200"></view>
		<view class="batch-bot flex justify-between align-center u-font-28">
			<!-- <view class="batch-btn card-bg text-content move-btn" @click="openpop" v-if="user_open_batch == 1">批量下单</view> -->
			<view class="batch-btn bg-cayn text-default move-btn" @click="godetail(0)">立即购买</view>
			<!-- <view class="batch-btn bg-e5 text-default move-btn" @click="KJsubmit()">快捷下单</view> -->
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="batch-pop">
				<view class="flex justify-between align-center">
					<u-icon name="close" color="#FFFFFF"></u-icon>
					<view class="u-font-36 text-bold">批量下单</view>
					<u-icon name="close" @click="closepop"></u-icon>
				</view>
				<view class="flex justify-between align-center u-m-t-60">
					<view class="u-m-r-30 flex-shink">限价</view>
					<view class="flex align-center flex-1">
						<input type="text" v-model="total" @input="valChange" placeholder-class="u-font-30 text-placeholder" class="u-font-30 flex-1 text-right batch-inp" />
						<view class="u-font-30 text-bold u-m-l-10">USDT</view>
					</view>
				</view>
				<view class="flex justify-between align-center u-m-t-50">
					<view class="u-m-r-30 flex-shink">下单数量</view>
					<u-number-box :max="max_count" :min="0" v-model="num" :disabled="max_count==0"></u-number-box>
				</view>
				<view class="batch-popbtn bg-cayn text-default u-font-32 text-bold move-btn" @click="repeatClick(submit)">确认支付</view>
			</view>
		</uni-popup>
		
		<u-modal v-model="show" content="下单成功，请前往支付" width="70%" cancel-text="返回首页" @confirm="goorder" @cancel="gohome"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				
				check: true,
				numNo: true,
				price: true,
				current:0,
				
				list:[],
				
				avatar:'',
				nickname:'',
				products_cover:'',
				products_title:'',
				cast_num:0,
				turnover:0,
				
				page:1,
				loadStatus:'loading',
				
				num:1,
				total:0,
				max_count:0,
				max_price:0,
				
				show:false,
				news_count:0,
				pre_count:0,
				products_cast_id:'',
				user_open_batch:1
			}
		},
		onLoad(data) {
			this.id = data.id
			this.loadData()
			this.loadList(true)
		},
		onReachBottom(){
			if(this.loadStatus=='noMore')return
			this.page++
			this.loadList()
		},
		methods: {
			cement(){
				uni.navigateTo({
					url: '/pages/tabbar/blogs/interrelated?id='+this.id
				})
			},
			goGoods(){
				uni.navigateTo({
					url: '/pages/my/collections/collections?id='+this.id
				})
			},
			loadData(){
				this.$u.api.new_detail({
					id: this.id
				}).then(res=>{
					this.avatar = res.data.authors.avatar
					this.nickname = res.data.authors.nickname
					this.products_cover = res.data.product_cast.cover
					this.products_title = res.data.product_cast.title
					this.cast_num = res.data.product_cast.cast_num
					this.turnover = res.data.product_cast.turnover
					this.news_count = res.data.news_count
					this.pre_count = res.data.pre_count
					this.user_open_batch = res.data.product_cast.user_open_batch
					this.products_cast_id = res.data.product_cast.id
				})
			},
			loadList(flag){
				if(flag)this.page = 1
				this.loadStatus = 'loading'
				let param = {
					id: this.id,
					products_status: this.check? 1 : 0,
					page: this.page,
				}
				if(this.current==0){
					param['tab'] = this.numNo? 1 : 0
				}else{
					param['price'] = this.price? 1 : 0
				}
				this.$u.api.new_tong_list(param).then(res=>{
					this.list = flag?res.data.list.data:this.list.concat(res.data.list.data)
					this.loadStatus = res.data.list.next_page_url?'more':'noMore'
				})
			},
			KJsubmit(){
				this.$u.api.quick_info({
					id: this.id
				}).then(res=>{
					uni.navigateTo({
						url:"/pages/market/casting-buy/casting-buy?id="+res.data.product_id
					})
				})
			},
			numChange() {
				this.current = 0
				this.numNo = !this.numNo
				this.loadList(true)
			},
			priceChange() {
				this.current = 1
				this.price = !this.price
				this.loadList(true)
			},
			checkChange(){
				this.check = !this.check
				this.loadList(true)
			},
			godetail(index,item){
				const data = this.list[index]
				if(data.products_status!==6&& data.review_status === 0)return
				if(data.products_status === 2 && data.review_status === 1){
					uni.navigateTo({
						url:'../../market/goods-auctionDef/goods-auctionDef?id=' + data.id
					})
				}else{
					uni.navigateTo({
						url: '/pages/market/goods-def/goods-def?id=' + data.id
					})
				}
				
			},
			openpop(){
				this.$u.api.batch_limit_info({
					id: this.id
				}).then(res=>{
					this.max_count = res.data.max_count
					this.max_price = res.data.max_price
					this.total = res.data.max_price
					this.num = res.data.max_count
					this.$refs.popup.open()
				})
				
			},
			closepop(){
				this.$refs.popup.close()
			},
			back() {
				uni.navigateBack()
			},
			valChange(e) {
				console.log('当前值为: ' + e.value)
				this.$u.api.batch_limit_info({
					id: this.id,
					price: this.total
				}).then(res=>{
					this.max_count = res.data.max_count
					this.num = res.data.max_count
				})
			},
			submit(){
				this.$u.api.batch_order({
					id: this.id,
					price: this.total,
					num: this.num
				}).then(res=>{
					this.closepop()
					this.show = true
				})
			},
			goorder(){
				uni.navigateTo({
					url:"/pages/my/pending-payment/pending-payment?current=3"
				})
			},
			gohome(){
				uni.switchTab({
					url:"/pages/tabbar/home/home"
				})
			}
		}
	}
</script>

<style lang="scss">
	.page{
		position: relative;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.tabbar{
		height: 88rpx;
		border: none;
		padding: 0 20rpx;
		margin-bottom: 48rpx;
		display: flex;
		align-items: center;
	}
	.Collectsort_active{
		border-radius: 10rpx;
		padding: 20rpx;
		border: 1rpx solid #EBEBEB;
	}
	.Collectsort{
		border-radius: 10rpx;
		padding: 20rpx;
		border: 1rpx solid #2D323A;
	}
	.batch-topimg {
		display: block;
		width: 266rpx;
		height: 266rpx;
		margin: 0 auto 24rpx;
	}
	.botfun_item{
		position: absolute;
		top: 180rpx;
		right: 0;
		width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		color: #4B505A;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		border-radius: 30rpx 0rpx 0rpx 30rpx;
		opacity: 1;
		border: 1rpx solid #C39F77;
		border-right: 0;
	}
	.batch-avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		position: absolute;
		top: 340rpx;
		left: 315rpx;
		z-index: 5;
	}

	.batch-ttitle {
		// margin-top: 88rpx;
		text-align: center;
	}

	.batch-tagbox {
		height: 40rpx;
		border-radius: 6rpx;
		background-color: #e8e8e8;
		line-height: 40rpx;

		.batch-tag {
			height: 40rpx;
			line-height: 40rpx;
			border-radius: 6rpx;
			background-color: #211C33;
			padding: 0 10rpx;
		}
	}

	.batch-saixuan {
		width: 24rpx;
		height: 24rpx;
		margin-left: 10rpx;
	}
	.batch-bot{
		height: 150rpx;
		width: 750rpx;
		padding: 0 52rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		.batch-btn{
			width: 638rpx;
			height: 80rpx;
			border-radius: 50rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
	
	.batch-pop{
		width: 750rpx;
		padding: 46rpx 52rpx 66rpx 52rpx;
		background-color: #FFFFFF;
		border-radius: 60rpx 60rpx 0 0;
		.batch-inp{
			border-bottom: 1rpx solid #eeeeee;
		}
		.batch-popbtn{
			width: 592rpx;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			margin: 166rpx 27rpx 0 24rpx;
			border-radius: 50rpx;
		}
	}
</style>
