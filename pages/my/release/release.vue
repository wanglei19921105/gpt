<template>
	<view class="page" :class="getThemeClass">
		<!-- 我上架的 -->
		<!-- <unavbar :title="i18n.release1"></unavbar> -->
		<u-tabs
			:list="list" 
			:is-scroll="false" 
			:current="current" 
			@change="change" 
			:active-color="getMainColor" 
			:inactive-color="getNavInactiveColor" 
			:bg-color="getBgColor"
		></u-tabs>
		<!-- 全部 -->
		<view v-if="current == 0">
			<empty v-if="!allData.length"></empty>
			<view v-for="(item,index) in allData" :key="index" class="itemBox card-bg">
				<view class="head_img">
					<image :src="item.cover" mode="widthFix" class="casting_img"></image>
					<view class="casting_info">
						<view class="casting_flex">
							<view class="">
								<!-- NFT铸品名称 -->
								<view class="name">{{item.title}}</view>

							</view>
							<view class="head_right color-yellow"
								:class="item.review_status == 1 && item.products_status == 3?'color-red':''">
								<!-- 2已售罄3上架中4未上架5审核中6审核失败 -->
								{{item.review_status == 1 && item.products_status == 3?i18n.release2:''||
								item.review_status == 1 && item.products_status == 0?i18n.release3:''||
								item.review_status == 1 && item.products_status == 2?i18n.release3:''||
								item.review_status == 0?i18n.release4:''||
								item.review_status == 2?i18n.release5:''||
								item.review_status == 3?i18n.release6:''}}
							</view>
						</view>
						<view class="casting_flex">
							<view class="head_left ">
								<!-- NFT铸品名称 -->
								<view class="name " v-if="item.tab_no">
									<text class="u-font-24 text-content" style="font-weight: 500">编号：{{item.tab_no}}</text>
								</view>
							</view>
						</view>
						<view class="casting_flex">
							<!-- 作者 -->
							<view class="casting_right">
								<view class="avatar">
									<image :src="item.avatar" mode="widthFix"></image>
								</view>
								<view>{{item.nickname}}</view>
							</view>
							<view class="price color-red">
								{{item.price}}<text>USDT</text>
							</view>
						</view>
					</view>

					<!-- 7查看作品8下架9等待平台审核上架10重新上架 -->
					<!-- <view class="my_btn" @click="myBtn(item.id,item.products_status,item.review_status)" :class="
					item.review_status == 1 && item.products_status == 3?'':''||
					item.review_status == 1 && item.products_status == 2?'':''||
					item.review_status == 1?'btnred':''||
					item.review_status == 2?'grey':''">
						
						{{
						  item.review_status == 1 && item.products_status == 3?i18n.release7:''||
						  item.review_status == 1 && item.products_status == 0?i18n.release8:''||
						  item.review_status == 1 && item.products_status == 2?i18n.release7:''||
						  item.review_status == 2?i18n.release9:''||
						  item.review_status == 3?i18n.release10:''
						  }}
					</view> -->
				</view>
				<!-- 下架 -->
				<view class="btns">
					<botBtn padding="10rpx 50rpx" v-if="item.review_status == 1 && item.products_status == 0" @click="down(item.id)">	
						<text>下架</text>
					</botBtn>
				</view>
			</view>
		</view>
		<!-- 审核中 -->
		<view v-if="current == 1">
			<empty v-if="!auditData.length"></empty>
			<view v-for="(item,index) in auditData" :key="index">
				<view class="head_img card-bg">
					<image :src="item.cover" mode="widthFix"></image>
					<view class="casting_info">
						<view class="casting_head">
							<view class="head_left">
								<view class="name">{{item.title}}</view>
								<view class="name u-m-t-10" v-if="item.tab_no">
									<text class="u-font-24 text-content" style="font-weight: 500">编号：{{item.tab_no}}</text>
								</view>
								<view class="price color-red"><text>USDT</text>
									{{item.price}}
								</view>
							</view>
							<view class="head_right color-main">
								{{i18n.release5}}
							</view>
						</view>
						<view class="casting_flex">
							<view class="casting_left text-content">{{i18n.buy3}}</view>
							<view class="casting_right">
								<view class="avatar">
									<image :src="item.avatar" mode="widthFix"></image>
								</view>
								<view>{{item.nickname}}</view>
							</view>
						</view>
					</view>
					<botBtnp :btnText="i18n.release9" style="margin-top: 20rpx; margin-bottom: 30rpx;" :disabled="4"></botBtnp>
				</view>
			</view>
		</view>
		<!-- 寄售中 -->
		<view v-if="current == 2">
			<empty v-if="!releaseData.length"></empty>
			<view v-for="(item,index) in releaseData" :key="index" class="itemBox card-bg">
				<view class="head_img">
					<image :src="item.cover" mode="widthFix" class="casting_img"></image>
					<view class="casting_info">
						<view class="casting_flex">
							<view class="">
								<!-- NFT铸品名称 -->
								<view class="name">{{item.title}}</view>
							</view>
							<view class="color-yellow">
								<!-- 上架中 -->
								{{i18n.release16}}
							</view>
						</view>
						<view class="casting_flex">
							<view class="head_left ">
								<!-- NFT铸品名称 -->
								<view class="name " v-if="item.tab_no">
									<text class="u-font-24 text-content" style="font-weight: 500">编号：{{item.tab_no}}</text>
								</view>
							</view>
						</view>
						<view class="casting_flex">
							<!-- 作者 -->
							<view class="casting_right">
								<view class="avatar">
									<image :src="item.avatar" mode="widthFix"></image>
								</view>
								<view>{{item.nickname}}</view>
							</view>
							<view class="price color-red"><text>USDT</text>
								{{item.price}}
							</view>
						</view>
					</view>
				</view>
				<!-- 下架 -->
				<botBtnp 
					:btnText="i18n.release8" 
					style="margin-top: 20rpx; margin-bottom: 30rpx;" 
					v-if="item.review_status == 1 && item.products_status == 0" 
					@click="down(item.id)"
				></botBtnp>
			</view>
		</view>
		<!-- 已售罄 -->
		<view v-if="current == 3">
			<empty v-if="!soldoutData.length"></empty>
			<view v-for="(item,index) in soldoutData" :key="index">
				<view class="head_img card-bg" @click="soldOut">
					<image :src="item.cover" mode="widthFix"></image>
					<view class="casting_info">
						<view class="casting_head">
							<view class="head_left">
								<view class="name">{{item.title}}</view>
								<view class="name u-m-t-10" v-if="item.tab_no">
									<text class="u-font-24 text-content" style="font-weight: 500">编号：{{item.tab_no}}</text>
								</view>
								<view class="price color-red"><text>USDT</text>
									{{item.price}}
								</view>
							</view>
							<view class="head_right" style="color: #D1514B;">
								<!-- 已售罄 -->
								{{i18n.release2}}
							</view>
						</view>
						<view class="casting_flex">
							<!-- 作者 -->
							<view class="casting_left text-content">{{i18n.sellDet3}}</view>
							<view class="casting_right">
								<view class="avatar">
									<image :src="item.avatar" mode="widthFix"></image>
								</view>
								<view>{{item.nickname}}</view>
							</view>
						</view>
					</view>
					<botBtnp
						:btnText="i18n.release7" 
						style="margin-top: 20rpx; margin-bottom: 30rpx;"
					></botBtnp>
				</view>
			</view>
		</view>
		<!-- 被拒绝 -->
		<view v-if="current == 4">
			<empty v-if="!rejectData.length"></empty>
			<view v-for="(item,index) in rejectData" :key="index">
				<view class="head_img card-bg">
					<image :src="item.cover" mode="widthFix"></image>
					<view class="casting_info">
						<view class="casting_head">
							<view class="head_left">
								<view class="name">{{item.title}}</view>
								<view class="name u-m-t-10" v-if="item.tab_no">
									<text class="u-font-24 text-content" style="font-weight: 500">编号：{{item.tab_no}}</text>
								</view>
								<view class="price color-red"><text>USDT</text>
									{{item.price}}
								</view>
							</view>
							<view class="head_right" style="color: #D1514B;">
								{{i18n.release12}}
							</view>
						</view>
						<view class="casting_flex border-color">
							<view class="casting_left text-content">{{i18n.sellDet3}}</view>
							<view class="casting_right">
								<view class="avatar">
									<image :src="item.avatar || '/static/logo.png'" mode="widthFix"></image>
								</view>
								<view>{{item.nickname}}</view>
							</view>
						</view>
						<view class="casting_flex border-color">
							<view class="casting_left color-red">*拒绝原因：<text class="">{{item.refuse}}</text></view>
						</view>
					</view>
					<botBtnp
						:btnText="i18n.release10" 
						style="margin-top: 20rpx; margin-bottom: 30rpx;"
						@click="shelves(item)"
					></botBtnp>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<!-- 是否下架该商品？ -->
		<u-modal v-model="show" class="my-modal" :content="i18n.release13" :show-cancel-button="true" :show-title="false"
			:content-style="curScreenStyle?darkContentStyle:contentStyle" :confirm-text="i18n.release14" :cancel-text="i18n.release15"
			cancel-color="#999999" confirm-color="#333333" :confirm-style="curScreenStyle?darkConfirmStyle:confirmStyle"
			:cancel-style="cancelStyle" @confirm="confirmDown">
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: ''
				}, {
					name: ''
				}, {
					name: ''
				}
				, {
					name: ''
				}, {
					name: ''
				}, 
				],
				current: 0,
				allData: [], //全部
				auditData: [], //审核中
				releaseData: [], //上架中
				soldoutData: [], //已售罄
				rejectData: [], //被拒绝
				page: 1,
				limit: 10,
				show: false,
				id: null, //下架id
				contentStyle: {
					color: '#111111',
					fontSize: '30rpx',
					fontWeight: 'bold',
					margin: '20rpx 0'
				},
				darkContentStyle: {
					color: '#FFFFFF',
				},
				confirmStyle: {
					backgroundColor: '#EEEEEE',
					fontWeight: 'bold',
					margin: '14rpx 30rpx 30rpx',
					borderRadius: '10rpx',
					height: '80rpx',
					lineHeight: '80rpx',
					fontSize: '30rpx',
				},
				darkConfirmStyle: {
					backgroundColor: '#111926',
					fontWeight: 'bold',
					margin: '14rpx 30rpx 30rpx',
					borderRadius: '10rpx',
					height: '80rpx',
					lineHeight: '80rpx',
					fontSize: '30rpx',
					color: '#FFF'
				},
				cancelStyle: {
					border: '1px solid #EEEEEE',
					margin: '14rpx 30rpx 30rpx',
					borderRadius: '10rpx',
					height: '80rpx',
					lineHeight: '80rpx',
					fontSize: '30rpx',
				},
				plat_free:0
			};
		},
		onShow() {
			this.release()
		},
		created() {
			this.list[0].name = this.i18n.release19
			this.list[1].name = this.i18n.release5
			this.list[2].name = this.i18n.release16
			this.list[3].name = this.i18n.release11
			this.list[4].name = this.i18n.release17
		},
		onLoad(option) {
			let that = this
			if (option.current) {
				that.current = option.current
				// if (option.current == 1) {
				// 	that.auditCli()
				// }
				if(option.current !== undefined){
					this.change(option.current)
				}
				
			}
		},
		onReachBottom() {
			let that = this
			if (that.current == 0) {
				if (that.allData.length >= that.limit) {
					that.limit += 10
					that.release()
				} else {
					this.$refs.uToast.show({
						// 翻到底了~
						title: this.i18n.sell5,
						type: 'warning',
					})
				}
			}
			if (that.current == 1) {
				if (that.auditData.length >= that.limit) {
					that.limit += 10
					that.auditCli()
				} else {
					this.$refs.uToast.show({
						// 翻到底了~
						title: this.i18n.sell5,
						type: 'warning',
					})
				}
			}
			if (that.current == 2) {
				if (that.releaseData.length >= that.limit) {
					that.limit += 10
					that.releaseCli()
				} else {
					this.$refs.uToast.show({
						// 翻到底了~
						title: this.i18n.sell5,
						type: 'warning',
					})
				}
			}
			if (that.current == 3) {
				if (that.soldoutData.length >= that.limit) {
					that.limit += 10
					that.soldoutCli()
				} else {
					this.$refs.uToast.show({
						// 翻到底了~
						title: this.i18n.sell5,
						type: 'warning',
					})
				}
			}
			if (that.current == 4) {
				if (that.rejectData.length >= that.limit) {
					that.limit += 10
					that.rejectCli()
				} else {
					this.$refs.uToast.show({
						// 翻到底了~
						title: this.i18n.sell5,
						type: 'warning',
					})
				}
			}
		},
		methods: {
			release() { //全部
				this.$u.api.my_publish({
					'type': this.current,
					'page': this.page,
					'limit': this.limit
				}).then(res => {
					this.allData = res.data.list.data
				}).catch(err => {

				})
			},
			change(index) {
				this.allData = []
				this.auditData = []
				this.releaseData = []
				this.soldoutData = []
				this.rejectData = []
				this.current = index;
				if (index == 0) {
					this.page = 0,
						this.limit = 10,
						this.release()
				}
				if (index == 1) {
					this.page = 1,
						this.limit = 10,
						this.auditCli()
				}
				if (index == 2) {
					this.page = 1,
						this.limit = 10,
						this.releaseCli()
				}
				if (index == 3) {
					this.page = 1,
						this.limit = 10,
						this.soldoutCli()
				}
				if (index == 4) {
					this.page = 1,
						this.limit = 10,
						this.rejectCli()
				}
			},
			auditCli() { //审核中
				this.$u.api.my_publish({
					'type': this.current,
					'page': this.page,
					'limit': this.limit
				}).then(res => {
					let listData = []
					res.data.list.data.forEach(item => {
						if (item.review_status == 2) {
							listData.push(item)
						}
					})
					this.auditData = listData
				}).catch(err => {

				})
			},
			releaseCli() { //寄售中 
				this.$u.api.my_publish({
					'type': this.current,
					'page': this.page,
					'limit': this.limit
				}).then(res => {
					let listData = []
					this.releaseData = res.data.list.data
				}).catch(err => {

				})
			},
			soldoutCli() { //已售罄
				this.$u.api.my_publish({
					'type': this.current,
					'page': this.page,
					'limit': this.limit
				}).then(res => {
					let listData = []
					res.data.list.data.forEach(item => {
						if (item.review_status == 1 && item.products_status == 3) {
							listData.push(item)
						}
					})
					this.soldoutData = listData
				}).catch(err => {

				})
			},
			rejectCli() { //被拒绝
				this.$u.api.my_publish({
					'type': this.current,
					'page': this.page,
					'limit': this.limit
				}).then(res => {
					this.plat_free = res.data.plat_free
					let listData = []
					res.data.list.data.forEach(item => {
						if (item.review_status == 3) {
							listData.push(item)
						}
					})
					this.rejectData = listData
				}).catch(err => {

				})
			},
			// 已售罄详情跳转
			soldOut() {
				// uni.navigateTo({
				// 	url: '../../market/goods-soldOut/goods-soldOut'
				// })
			},
			//被拒绝 重新上架
			shelves(item) {
				// uni.navigateTo({
				// 	url: '../go-up/go-up?item=' + JSON.stringify(item)+'&fee='+this.plat_free
				// })
				uni.navigateTo({
					url: '../go-up/go-up?id=' + item.id +'&fee='+this.plat_free
				})
			},
			// 全部-按钮
			myBtn(id, status, restatus) {
				// status商品状态0在售1预售2拍卖3售罄
				//restatus状态0未上架1上架成功(审核成功)2待审核3审核失败
				if (status == 3 && restatus == 1) {
					if (status == 0) { //在售
						uni.navigateTo({
							url: '../../market/goods-def/goods-def?id=' + id
						})
					}
					if (status == 1) { //预售
						// uni.navigateTo({
						// 	url: '../../market/goods-presale/goods-presale?id=' + id
						// })
					}
					if (status == 2) { //拍卖
						uni.navigateTo({
							url: '../../market/goods-auctionDef/goods-auctionDef?id=' + id
						})
					}
					if (status == 3) { //售罄
						// uni.navigateTo({
						// 	url: '../../market/goods-soldOut/goods-soldOut?id=' + id
						// })
					}
				}
			},
			// 下架按钮
			down(id) {
				this.show = true
				this.id = id
			},
			// 下架按钮-确认下架
			confirmDown() {
				this.$u.api.down({
					'order_id': this.id
				}).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							// 下架成功
							title: this.i18n.release18,
							type: 'success',
						})
						setTimeout(() => {
							this.current = 0;
							this.release()
						}, 1000)
					}
				}).catch(err => {

				})
			},
		}
	}
</script>

<style lang="scss" scoped>

	/deep/.u-border-top:after {
		border: none;
	}

	/deep/.u-drawer-bottom {
		background-color: transparent;
	}
	.itemBox {
		overflow: hidden;
		margin: 32rpx 30rpx;
		padding-bottom: 40rpx;
		border-radius: 30rpx;
		// background-color: #fff;
	}
	.head_img {
		// background-color: #fff;
		overflow: hidden;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.casting_img{
			width: 200rpx;
			height: 200rpx;
		}
		
		.casting_info {
			width: 400rpx;
			.casting_head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 190rpx;

				.name {
					// color: #111111;
					font-size: 32rpx;
					margin-bottom: 36rpx;
					font-weight: bold;
				}

				.price {
					// color: #A11716;
					font-size: 38rpx;

					text {
						font-size: 26rpx;
					}
				}

				.head_right {
					// color: #EEB32E;
					font-weight: bold;
					font-size: 30rpx;
				}

			}

			.casting_flex {
				height: 70rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name {
					// color: #111111;
					font-size: 32rpx;
					font-weight: bold;
				}
				.casting_left {
					// color: #999999;
					font-size: 26rpx;
				}

				.casting_right {
					// color: #111111;
					font-size: 28rpx;
					display: flex;
					align-items: center;

					.avatar {
						width: 44rpx;
						height: 44rpx;
						border-radius: 50%;
						margin-right: 24rpx;
						overflow: hidden;

						image {
							width: 100%;
						}
					}

					.uicon {
						margin-left: 20rpx;
						width: 22rpx;
						border-radius: 0;
					}
				}
				.price{
					font-size: 38rpx;
					font-weight: bold;
				}
			}

		}
		
	}
	.btns {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	// .my_btn {
	// 	margin: 40rpx 30rpx;
	// 	background-color: #764E39;
	// 	height: 86rpx;
	// 	border-radius: 10rpx;
	// 	text-align: center;
	// 	line-height: 86rpx;
	// 	font-size: 30rpx;
	// 	color: #FFFFFF;
	// }

	// .btnred {
	// 	background-color: #D1514B;
	// }

	// .grey {
	// 	background-color: #D2D2D2;
	// }

	// .text_red {
	// 	color: #D1514B !important;
	// }
</style>
