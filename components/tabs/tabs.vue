<template>
	<view class="">
		<scroll-view class="scroll-view_H"  v-if="tabs.length > 0" scroll-x="true">
		<view class="scroll-view-item">
			<view class="order-tab flex align-center" :style="{'backgroundColor':bgColor,'justify-content':justifyCcontent}">
				<view class="flex flex-direction align-center u-m-r-50" v-for="(item, index) in tabs" :key="index">
					<view :class="cur == index ? textActiveClass : textClass" @click="tabClick(index)" style="z-index: 10;">{{ item.title }}</view>
					<view :class="cur == index ? 'order-tabline' : ''"></view>
				</view>
			</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	/**
	 * tabs 列表数据缺省占位
	 * @property {Array} list 列表
	 * @property {Number} current 下标
	 * @property {String} bgColor 背景色
	 * @property {String} rangKey key
	 * @property {Array} textClass 文字样式
	 * @property {Array} textActiveClass 文字选中样式
	 * @property {Number||String} moveLineWidth 滑动线宽度
	 * @event {Function} click 点击事件
	 */
	export default {
		name: 'nomore',
		props: {
			list: {
				type: Array,
				default(){
					return []
				}
			},
			bgColor: {
				type: String,
				default: "transparent"
			},
			justifyCcontent:{
				type: String,
				default: "space-around"
			},
			textClass: {
				type: Array,
				default(){
					return ['size-30','color-6']
				}
			},
			textActiveClass: {
				type: Array,
				default(){
					return ['size-36','text_green']
				}
			},
			moveLineWidth: {
				type: [Number,String],
				default: 72
			},
			rangKey: {
				type: String,
				default: ''
			},
			current: {
				type: [Number,String],
				default:0
			}
		},
		data(){
			return{
				cur:0,
				left:0,
				posleft:0,
				tabs:[]
			}
		},
		watch: {
			list: {
				handler(val, oldVal) {
					this.tabs = val
				},
				deep: true,
				immediate: true
			},
			current: {
				handler(val, oldVal) {
					if(val>=0){
						this.tabClick(val)
					}
				},
				deep: true,
				immediate: true
			}
		},
		mounted() {
			// const query = uni.createSelectorQuery().in(this);
			// query.select('.tabline').boundingClientRect(data => {
			//   let num = Math.floor(data.left*10)/10
			//   this.left = num
			//   this.posleft = num
			// }).exec();
		},
		methods:{
			tabClick(index){
				if(this.cur==index)return
				setTimeout(()=>{
					let num = this.tabs.length - 1
					let width = uni.upx2px(750-this.moveLineWidth) - this.left - this.left
					this.posleft += Math.floor(width/num) * (index-this.cur)
					this.cur = index
					this.$emit('click',index)
				},100)
				
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view_H{
			white-space: nowrap;
			overflow: hidden;
			box-sizing: border-box;
		.scroll-view-item{
			width: fit-content;
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			box-sizing: border-box;
			.text_green{
				color: #FFFFFF;
			}
			.order-tab {
				height: 100rpx;
				width: 88vw;
				padding: 0 50rpx;
				position: relative;
				.order-tabline {
					position: absolute;
					bottom: 10rpx;
					height: 5rpx !important;
					width: 36rpx !important;
					border-radius: 0;
					z-index: 1;
					background: #2283EC;
				}
				.tabline{
					height: 8rpx;
					position: absolute;
					bottom: -15rpx;
				}
			}
		}
	}
</style>
