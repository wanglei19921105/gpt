<template>
	<view 
		class="my-goods-list-item"
		:class="doubleLine?'my-goods-list-item-s':''"
	>
		<view 
			class="goods-box card-bg"
			:class="doubleLine?'goods-box-s' :''" 
			:style="[{marginBottom: listType === 'calendar'? '30rpx' : '0rpx'}]"
			@click="$emit('click', goods)"
		>
		<!-- ,{backgroundImage: `url(/static/images/my/${getThemeName}/Homecard.png)`} /static/images/index/${defaultThemeName}/goods_item_bg.png-->
		
			<image :src="`/static/images/my/${getThemeName}/Homecard.png`" class="goods-box-bg" mode="widthFix"></image>
			<template >
				<view class="goods-image-box">
					<image
						:src="goods.cover" 
						mode="aspectFit" 
						class="goods-image pure-bg"
					></image>
					<!-- 喜欢/取消喜欢 -->
					<view class="like" @click.stop="likeShow(goods.id,goods.status)" v-if="listType === 'circulation'">
						<image v-if="curScreenStyle"
							:src="goods.status == 1?'/static/images/darkLike1.png':'/static/images/heart1.png'"
							mode="widthFix">
							<image v-if="!curScreenStyle"
								:src="goods.status == 1?'/static/images/heart2.png':'/static/images/heart1.png'"
								mode="widthFix">
							</image>
					</view>
					<!-- <template v-if="listType === 'normal'">
						<view class="sold-out-box card-tag-bg" v-if="!goods.sur_issue">
							<image src="/static/images/ysq.png" class="sold-out-image" mode=""></image>
						</view>
					</template>
					<template v-if="listType === 'blind'">
						<view class="sold-out-box card-tag-bg" v-if="!goods.num">
							<image src="/static/images/ysq.png" class="sold-out-image" mode=""></image>
						</view>
					</template> -->
					
					<!-- 常规藏品倒计时 -->
					<template v-if="listType === 'normal'">
							
						<template v-if="goods.inventory === 0 || goods.show_type === 3">
							<view class="plan-count-down-box">
								<view class="plan-count-down-text-box count-gray">
									<text class="u-font-28">已售罄</text>
								</view>
							</view>
						</template>
						<template v-else>
							<template v-if="goods.new_type === 0">
								
								<template v-if="goods.shou_type === 0 && goods.diff > 0">
									<view class="plan-count-down-box">
										<view class="plan-count-down-text-box count-green">
											<text class="u-font-28">发售开始：</text>
											<u-count-down 
												:timestamp="goods.diff"
												separator-size="30"
												bg-color="none"
												font-size="30"
											></u-count-down>
										</view>
									</view>
								</template>
								
								<template v-if="goods.shou_type === 1 && goods.diff > 0">
									<view class="plan-count-down-box">
										<view class="plan-count-down-text-box count-yellow">
											<text class="u-font-28">发售结束：</text>
											<u-count-down 
												:timestamp="goods.diff"
												separator-size="30"
												bg-color="none"
												font-size="30"
											></u-count-down>
										</view>
									</view>
								</template>
								
								<template v-if="goods.shou_type === 1 && goods.diff === 0">
									<view class="plan-count-down-box">
										<view class="plan-count-down-text-box count-gray">
											<text class="u-font-28">已结束</text>
										</view>
									</view>
								</template>
								
							</template>
							
							<template v-if="goods.new_type === 3">
								
								<template v-if="goods.user_is_first === 0 && goods.first_diff > 0">
									<view class="plan-count-down-box">
										<view class="plan-count-down-text-box count-green">
											<text class="u-font-28">发售开始：</text>
											<u-count-down 
												:timestamp="goods.first_diff"
												separator-size="30"
												bg-color="none"
												font-size="30"
											></u-count-down>
										</view>
									</view>
								</template>
								
								<template v-if="goods.user_is_first === 1 && goods.first_diff > 0">
									<view class="plan-count-down-box">
										<view class="plan-count-down-text-box count-green">
											<text class="u-font-28">优先购结束：</text>
											<u-count-down 
												:timestamp="goods.first_diff"
												separator-size="30"
												bg-color="none"
												font-size="30"
											></u-count-down>
										</view>
									</view>
								</template>
								
								<template v-if="goods.user_is_first === 2 && goods.first_diff > 0">
									<view class="plan-count-down-box">
										<view class="plan-count-down-text-box count-yellow">
											<text class="u-font-28">发售结束：</text>
											<u-count-down 
												:timestamp="goods.first_diff"
												separator-size="30"
												bg-color="none"
												font-size="30"
											></u-count-down>
										</view>
									</view>
								</template>
								
								<template v-if="goods.user_is_first === 2 && goods.first_diff === 0">
									<view class="plan-count-down-box">
										<view class="plan-count-down-text-box count-gray">
											<text class="u-font-28">已结束</text>
										</view>
									</view>
								</template>
								
							</template>
						</template>
					</template>
					
					<!-- 盲盒倒计时 -->
					<template v-if="listType === 'blind'">
						<template v-if="goods.num === 0">
							<view class="plan-count-down-box">
								<view class="plan-count-down-text-box count-gray">
									<text class="u-font-28">已售罄</text>
								</view>
							</view>
						</template>
						<template v-else>
							<template v-if="goods.user_is_first === 0 && goods.first_diff > 0">
								<view class="plan-count-down-box">
									<view class="plan-count-down-text-box count-green">
										<text class="u-font-28">发售开始：</text>
										<u-count-down 
											:timestamp="goods.first_diff"
											separator-size="30"
											bg-color="none"
											font-size="30"
										></u-count-down>
									</view>
								</view>
							</template>
							
							<template v-if="goods.user_is_first === 1 && goods.first_diff > 0">
								<view class="plan-count-down-box">
									<view class="plan-count-down-text-box count-green">
										<text class="u-font-28">优先购结束：</text>
										<u-count-down 
											:timestamp="goods.first_diff"
											separator-size="30"
											bg-color="none"
											font-size="30"
										></u-count-down>
									</view>
								</view>
							</template>
							
							<template v-if="goods.user_is_first === 2 && goods.first_diff > 0">
								<view class="plan-count-down-box">
									<view class="plan-count-down-text-box count-yellow">
										<text class="u-font-28">发售结束：</text>
										<u-count-down 
											:timestamp="goods.first_diff"
											separator-size="30"
											bg-color="none"
											font-size="30"
										></u-count-down>
									</view>
								</view>
							</template>
							
							<template v-if="goods.user_is_first === 2 && goods.first_diff === 0">
								<view class="plan-count-down-box">
									<view class="plan-count-down-text-box count-gray">
										<text class="u-font-28">已结束</text>
									</view>
								</view>
							</template>
						</template>
					</template>
					
					<template v-if="listType === 'draw'">
						<view class="plan-count-down-box">
							
							<template v-if="goods.lucky_status === 2">
								<view class="plan-count-down-text-box count-gray">
									<text class="u-font-28">已开奖</text>
								</view>
							</template>
							<template v-else>
								<template v-if="goods.lucky_status === 0 && goods.first_diff > 0">
									<view class="plan-count-down-text-box count-green">
										<text class="u-font-28">抽签开始：</text>
										<u-count-down 
											:timestamp="goods.first_diff"
											separator-size="30"
											bg-color="none"
											font-size="30"
										></u-count-down>
									</view>
								</template>
								
								<template v-if="goods.lucky_status === 1 && goods.first_diff > 0">
									<view class="plan-count-down-text-box count-yellow">
										<text class="u-font-28">抽签结束：</text>
										<u-count-down 
											:timestamp="goods.first_diff"
											separator-size="30"
											bg-color="none"
											font-size="30"
										></u-count-down>
									</view>
								</template>
							</template>
						</view>
					</template>
					
					<!-- <template v-if="listType === 'circulation'">
						<view class="plan-count-down-box">
							
							<template v-if="goods.products_status === 5">
								<view class="plan-count-down-text-box count-gray">
									<text class="u-font-28">已锁单</text>
								</view>
							</template>
							
							<template v-if="goods.products_status === 2 && goods.diff > 0">
								<view class="plan-count-down-text-box count-yellow">
									<text class="u-font-28">拍卖结束：</text>
									<u-count-down 
										:timestamp="goods.diff"
										separator-size="30"
										bg-color="none"
										font-size="30"
									></u-count-down>
								</view>
							</template>
							
							<template v-if="goods.products_cast_type === 4">
								<view class="plan-count-down-text-box count-purple" :class="doubleLine?'' :'u-m-t-20'">
									<text class="u-font-28">盲盒开出</text>
								</view>
							</template>
							
						</view>
					</template> -->
					
				</view>
				<view class="goods-content"  :style="doubleLine?'margin-top: -15rpx;':''">
					<view class="" style="height: 50rpx;">
						<text class="goods-name line-1" :style="[{fontSize:doubleLine?'30rpx':''}]">{{ goods.title }}</text>
					</view>
					
					<view class="goods-info-box u-m-t-20 justify-start" v-if="listType !== 'circulation'">
						<!-- 常规藏品内容 -->
						<template v-if="listType === 'normal'">
							<view :class="doubleLine? 'u-flex-col' : 'u-flex align-center'">
								<view class="u-flex align-center justify-center">
									<view class="goods-num-box card-tag-bg">
										<text class="goods-num-unit">发行</text>
										<text class="goods-num">{{ goods.total_issue }}份</text>
									</view>
									<view class="goods-num-box card-tag-bg u-m-l-20" v-if="goods.inventory !== 0">
										<text class="goods-num-unit">剩余</text>
										<text class="goods-num">{{ goods.inventory }}份</text>
									</view>
									<view class="goods-num-box card-tag-bg u-m-l-20" v-else>
										<text class="goods-num">已售罄</text>
									</view>
								</view>
								<view :class="doubleLine? 'u-m-t-20' : 'u-m-l-20'">
									<my-rarity :type="goods.rarity_type" margin="0rpx 0rpx 0rpx 0rpx" size="mini" />
								</view>
							</view>
						</template>
						
						<!-- 盲盒内容 -->
						<template v-if="listType === 'blind'">
							<view class="goods-num-box card-tag-bg" v-if="goods.num !== 0">
								<text class="goods-num-unit">限量</text>
								<text class="goods-num">{{ goods.num }}份</text>
							</view>
							<view class="goods-num-box card-tag-bg" v-else>
								<text class="goods-num">已售罄</text>
							</view>
						</template>
						
						<template v-if="listType === 'draw'">
							<view class="u-flex-col">
								<view class="">
									<my-rarity :type="goods.rarity_type" margin="0rpx 0rpx 0rpx 0rpx" size="mini" />
								</view>
								
								<view class="u-flex u-m-t-20">
									<view class="text-content u-font-26">
										<text>发行：</text>
										<text>{{ goods.total_issue }}份</text>
									</view>
									<view class="text-content u-font-26 u-m-l-15">
										<text>剩余：</text>
										<text>{{ goods.inventory }}份</text>
									</view>
								</view>
							</view>
							
						</template>
						
						<template v-if="listType === 'circulation'">
							<!-- <view class="text-content u-font-26">
								<text>编号：</text>
								<text>#{{ goods.tab_no }}</text>
							</view> -->
							<!-- <my-rarity :type="goods.rarity_type" margin="0rpx 0rpx 0rpx 20rpx" size="mini" /> -->
						</template>
						
					</view>
					
					<view class="goods-bottom-box" :class="doubleLine? 'goods-bottom-box-s' :'' " style="margin-top: 10rpx;">
						<view
							class="goods-author-info-box" :class="doubleLine?'goods-author-info-box-s':'' " 
							v-if="goods.nickname"
						>
							<view class="goods-author-info">
								<template v-if="goods.nickname && listType !== 'draw'">
									<u-avatar
										:src="goods.avatar || '/static/logo.png'"
										:size="50"
										class="goods-author-info-avatar"
									></u-avatar>
									<text class="goods-author-info-name">{{goods.nickname}}</text>
								</template>
							</view>
							<view class="goods-collection-box" @click="likeCli(goods.id, goods.status)" v-if="listType === 'market'">
								<image
									:src="goods.status == 1 ? '/static/images/heart2.png' : '/static/images/heart1.png'" 
									mode="widthFix"
									class="goods-collection-image"
								></image>
							</view>
						</view>
						<view class="" v-else></view>
						
						<view class="goods-price-box">
							<text class="goods-price" :style="[{fontSize:doubleLine?'40rpx':''}]">{{ goods.price }}</text>
							<text class="goods-price-unit">USDT</text>
						</view>
					</view>
				</view>
			</template>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods-list-item",
		props: {
			goods: {
				type: Object,
				require: true
			},
			listData: {
				type: Array,
				require: true
			},
			listType: {
				type: String,
				default: 'normal', // blind circulation
			},
			showSubscribe: {
				type: Boolean,
				default: true
			},
			doubleLine: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		created() {
			// console.log(this.listData);
		},
		methods: {
			likeShow(id, status) { //喜欢/取消喜欢
			console.log(id, status);
			console.log(this.listData);
				this.listData.some((item) => {
					// console.log(item);
					if (item.id == id) {
						// status为0 = 没关注
						if (!item.status) {
							this.$u.api.like_add({
								'id': id
							}).then(res => {
								item.status = 1
							}).catch(err => {})
						} else {
							this.$u.api.like_del({
								'id': id
							}).then(res => {
								item.status = 0
							}).catch(err => {})
						}
					}
				})
			},
			likeCli(id, status){
				this.$emit('likeCli', id, status)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	view {
		margin: 0rpx;
		padding: 0rpx;
		box-sizing: border-box;
	}
	
.my-goods-list-item-s{
	width: 335rpx !important;
}
.my-goods-list-item{
	display: flex;
	flex-wrap: wrap;
	width: 690rpx;
	transition: all 0.1s;
	.goods-box{
		width: 100%;
		border-radius: 30rpx;
		position: relative;
		overflow: hidden;
		background-color: #f3f0e6 !important;
		// static/images/my/${getThemeName}/Homecard.png
		// background-image: url('../../static/images/my/light/Homecard.png');
		
		// background-image: url('../../static/images/Homecard.png');
		background-size: 100% 100%;
		&-s {
			.goods-image-box{
				.goods-image{
					height: 335rpx !important;
				}
				.plan-count-down-box{
					height: 335rpx !important;
					padding: 10rpx 20rpx !important;
					padding: 5rpx 15rpx;
					.plan-count-down-text-box{
						transition: transform 0.1s;
						transform: scale(0.75) translateX(-20%);
					}
				}
			}
			
			.goods-content{
				
				.goods-info-box{
					
					.goods-num-box{
						.goods-num-unit{
							font-size: 22rpx !important;
						}
						
						.goods-num{
							font-size: 22rpx !important;
						}
					}
				}
			}
		}
		.goods-box-bg{
			width: 100%;
			position: absolute;
			bottom: 0;
			right: 0;
			z-index: 0;
		}
		
		.goods-image-box{
			width: 100%;
			position: relative;
			z-index: 1;
			.goods-image{
				width: 100%;
				// height: 336rpx;
				height: 690rpx;
				border-radius: 30rpx;
			}
			.sold-out-box {
				position: absolute;
				width: 100%;
				height: 100%;
				border-radius: 30rpx;
				top: 0;
				left: 0;
				padding: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.sold-out-image{
					width: 250rpx;
					height: 250rpx;
				}
			}
			
			.plan-count-down-box{
				position: absolute;
				width: 100%;
				height: 690rpx;
				border-radius: 30rpx;
				top: 0;
				left: 0;
				padding: 20rpx;
				.plan-count-down-text-box{
					width: max-content;
					padding: 10rpx 30rpx;
					color: #333;
					// border-radius: 30rpx;
					// background: rgba(0, 0, 0, .5);
					display: flex;
					align-items: center;
					transition: transform 0.1s;
					border-radius: 20rpx 8rpx 20rpx 8rpx;
					
					&.count-gray {
						background: linear-gradient(90deg, #CED0D4 0%, #EBEBEE 100%);
					}
					&.count-yellow {
						background: linear-gradient(90deg, #F3D582 0%, #F9F2CC 100%);
					}
					&.count-purple {
						background: linear-gradient(90deg, #A5B2F8 0%, #C5D5FB 100%);
					}
					&.count-green {
						background: linear-gradient(90deg, #04D5A3 0%, #00E2E2 100%);
					}
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
			background-color: rgba(255, 255, 255, 0);
			text-align: center;
			line-height: 46rpx;
		
			image {
				width: 35rpx;
			}
		}
		.goods-content{
			position: relative;
			z-index: 1;
			box-sizing: border-box;
			padding: 30rpx;
			
			.goods-name{
				font-size: 35rpx;
				display: block;
			}
			
			.goods-info-box{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 30rpx;
				
				.goods-num-box{
					border-radius: 10rpx;
					overflow: hidden;
					display: flex;
					.goods-num-unit{
						padding: 5rpx 10rpx;
						font-size: 28rpx;
					}
					
					.goods-num{
						background: #C4B476;
						padding: 5rpx 10rpx;
						display: flex;
						font-size: 28rpx;
						color: #ffffff;
					}
				}
			}
			
			.goods-price-box{
				display: flex;
				align-items: flex-end;
				.goods-price-unit{
					font-size: 30rpx;
					margin-bottom: 4rpx;
				}
				.goods-price{
					font-size: 50rpx;
					font-weight: 500;
				}
			}
			.goods-author-info-box-s{
				padding: 20rpx 0;
			}
			.goods-author-info-box{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.goods-author-info{
					display: flex;
					align-items: center;
					.goods-author-info-avatar{
						width: 50rpx;
						height: 50rpx;
						margin-right: 20rpx;
					}
					.goods-author-info-name{
						font-size: 28rpx;
					}
				}
				.goods-collection-box{
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					background-color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					.goods-collection-image{
						width: 30rpx;
					}
				}
			}
			
		}
		
	}
	.calendar-item-box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
		position: relative;
		z-index: 1;
		.calendar-item-image{
			width: 240rpx;
			height: 240rpx;
			border-radius: 20rpx;
			flex-shrink: 0;
		}
		.calendar-item-info{
			width: 100%;
			padding: 0rpx 30rpx;
			.calendar-item-title{
				font-size: 40rpx;
				color: #fff;
			}
			
			.calendar-item-num-box{
				background: #24242E;
				width: max-content;
				border-radius: 6rpx;
				overflow: hidden;
				display: flex;
				margin-top: 25rpx;
				.calendar-item-num-unit{
					background: #DBC8AC;
					color: #1E1E27;
					padding: 0rpx 10rpx;
					font-size: 28rpx;
				}
				
				.calendar-item-num{
					padding: 0rpx 10rpx;
					display: flex;
					font-size: 28rpx;
					color: #DBC8AC;
				}
			}
			
			.calendar-item-price-box{
				display: flex;
				align-items: flex-end;
				margin-top: 25rpx;
				.calendar-item-price-unit{
					color: #fff;
					font-size: 26rpx;
				}
				.calendar-item-price{
					color: #fff;
					font-size: 40rpx;
					font-weight: 500;
				}
			}
		}
	}
	
	.new-item-box{
		border-radius: 20rpx;
		.new-item-image{
			width: 100%;
			height: 350rpx;
			border-radius: 20rpx;
		}
		.new-item-info{
			padding: 30rpx;
			display: flex;
			flex-direction: column;
			.new-item-title{
				font-size: 30rpx;
				color: #fff;
			}
			.new-item-content{
				font-size: 28rpx;
				color: #8F8F92;
				margin-top: 30rpx;
			}
			.new-item-time{
				font-size: 28rpx;
				color: #8F8F92;
				margin-top: 30rpx;
			}
		}
	}
	
	.clock-icon{
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
	
	.goods-bottom-box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		
	}
	.goods-bottom-box-s{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
}
</style>