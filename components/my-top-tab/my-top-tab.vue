<template>
	<view class="top-tab">
		<view class="nav-box" id="nav-box">
			<scroll-view
				:scroll-x="scrollX" 
				:scroll-left="navScrollLeft" 
				:scroll-with-animation="animation" 
				:enable-flex="false" 
				class="nav-scroll"
				@scroll="scroll" 
				id="nav-scroll"
			>
			
			<view 
				class="nav-scroll-content" 
				id="nav-scroll-content"
				:style="[
					{
						paddingBottom: activeBorder? '10rpx' : '0rpx',
						position: activeBorder? 'relative' : 'static'
					},
					navContentStype
				]"
			>
			
			<view 
				class="nav-content"
				:style="[
					{
						display: flex?'inline-flex' : 'inline',
						
					},
					navContentStyle
				]"
			><!-- justifyContent: content?'center' : 'space-around', -->
				<template v-for="(nav, index) in navListData" :id="`nav${index}`">
					<slot name="nav" :item="nav">
						<view 
							:class="['nav-item', navActiveIndex === index? 'acitve' : '']"
							:key="index" 
							:style="[
								{
									color: navItemColor,
									margin: navItemMargin
								},
								navActiveIndex === index? {
									fontWeight: acitveTextBold?'bold' : 'normal'
								} : {},
								navItemStyle,
								navActiveIndex === index? acitveStyle : {},
							]"
							@click="changeNav(index, $event)"
							ref="nav-item"
						>
							<text :data-text="nav.title">
								{{ nav.title }}
							</text>
						</view>
					</slot>
				</template>
				
			</view>
			
			<slot name="active">
				<template v-if="activeBorder">
					<view 
						class="nav-active-border" 
						:style="[
							{
								left: `${navBorderLeft}px`,
								width: `${navBorderWidth}px`,
								height: acitveBorderHeight,
								background: navItemColor,
								borderRadius: acitveBorderRadius,
								transition: acitveBorderTransition? 'left 0.3s ease, width 0.3s ease' : ''
							},
							acitveBorderStylr
						]"
					></view>
				</template>
			</slot>
			
			</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-top-tab",
		props: {
			// 是否开启滑动
			scrollX: {
				type: [String, Boolean],
				default: true,
			},
			// 横向滚动位置
			scrollLeft: {
				type: Number,
				default: 0,
			},
			// 是否开启动画
			animation: {
				type: Boolean,
				default: true
			},
			// 开始 flex 布局
			flex: {
				type: Boolean,
				default: true
			},
			// 布局居中
			content: {
				type: Boolean,
				default: true
			},
			// 导航栏数组
			navList: {
				type: [Array, Object],
				required: true
			},
			// 导航栏数组对象的 key
			listKey: {
				type: String,
				default: 'title'
			},
			// 被激活的 index
			activeIndex: {
				type: Number,
				default: 0
			},
			// 导航栏最外层元素样式
			navContentStype: {
				type: Object,
			},
			// 导航栏父元素样式 - 可更改 felx 布局子元素的对齐方式
			navContentStyle: {
				type: Object
			},
			// 导航栏样式
			navItemStyle: {
				type: Object
			},
			// 导航栏字体颜色
			navItemColor: {
				type: String,
				default: '#000'
			},
			// 导航栏的 margin
			navItemMargin: {
				type: [String, Number],
				default: '0rpx 20rpx'
			},
			// 选择的导航栏样式
			acitveStyle: {
				type: Object
			},
			// 选择的导航栏的字体是否变宽
			acitveTextBold:{
				type: Boolean,
				default: true
			},
			// 是否开启底部横线
			activeBorder: {
				type: Boolean,
				default: true
			},
			// 底部横线的样式
			acitveBorderStyle: {
				type: Object
			},
			// 底部横线的最小宽度
			acitveBorderMinWidth: {
				type: Number,
				default: 32.5
			},
			// 底部横线自定义样式
			acitveBorderStylr: {
				type: Object
			},
			// 底部横线高度
			acitveBorderHeight: {
				type: String,
				default: '6rpx'
			},
			// 底部横线圆角
			acitveBorderRadius: {
				type: String,
				default: '12rpx'
			},
			// 底部横线动画过渡
			acitveBorderTransition: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				navActiveIndex: 0,
				// oldOavActiveIndex: 0,
				navScrollLeft: this.scrollLeft,
				oldNavScrollLeft: 0,
				navBorderLeft: 0,
				navBorderWidth: 0,
			};
		},
		created() {
			
		},
		mounted() {
			// this.initialize()
		},
		methods: {
			initialize(){
				// uni.createSelectorQuery().in(this).select('#nav-box').boundingClientRect(scrollData => {
					// this.scrollWidth = scrollData.width
					uni.createSelectorQuery().in(this).select('#nav-scroll-content').boundingClientRect(fatherData => {
						uni.createSelectorQuery().in(this).selectAll('.nav-item').boundingClientRect(data => {
							if(data.length > 0){
								this.navBorderWidth = Math.max(data[0].width / 2, this.acitveBorderMinWidth)
								this.navBorderLeft = (data[0].left - fatherData.left) + 
								((data[0].width / 2) > this.acitveBorderMinWidth? 
								(data[0].width / 4) : 
								(data[0].width / 4) - 
								((this.acitveBorderMinWidth / 2) - 
								(data[0].width / 4)))
							}
						}).exec();
					}).exec();
				// }).exec();
			},
			changeNav(index, e){
				if (this.navActiveIndex !== index) {
					this.navActiveIndex = index
					this.$emit('update:activeIndex', index)
					uni.createSelectorQuery().in(this).selectAll('.nav-item').boundingClientRect(data => {
						this.navBorderWidth = Math.max(data[index].width / 2, this.acitveBorderMinWidth)  
						if(e){
							this.navBorderLeft = e.currentTarget.offsetLeft + ((data[index].width / 2) > this.acitveBorderMinWidth? (data[index].width / 4) : (data[index].width - this.acitveBorderMinWidth) / 2 )
						} else {
							uni.createSelectorQuery().in(this).select('#nav-scroll-content').boundingClientRect(fatherData => {
								this.navBorderLeft = (data[index].left - fatherData.left) +
								((data[index].width / 2) > this.acitveBorderMinWidth? 
								(data[index].width / 4) : 
								(data[index].width / 4) - 
								((this.acitveBorderMinWidth / 2) - 
								(data[index].width / 4)))
							}).exec();
						}
						uni.createSelectorQuery().in(this).select('#nav-scroll').boundingClientRect(scrollData => {
							uni.createSelectorQuery().in(this).select('#nav-scroll-content').boundingClientRect(fatherData => {
								
								if(data[index].left > (scrollData.width / 2)){
									this.$emit('update:scrollLeft', this.oldNavScrollLeft)
									this.navScrollLeft = this.oldNavScrollLeft
									if(this.oldNavScrollLeft < (fatherData.width - scrollData.width).toFixed(0)){
										this.$nextTick(() => {
											this.navScrollLeft = Math.min(
												// this.navScrollLeft + (data[index].right - data[index - 1].right), 
												(data[index].right - scrollData.width / 2 - data[index].width / 2 - fatherData.left),
												(fatherData.width - scrollData.width).toFixed(0)
											)
											this.$emit('update:scrollLeft', this.navScrollLeft)
										})
									}
								}
								
								if(data[index].left < (scrollData.width / 2)){
									this.$emit('update:scrollLeft', this.oldNavScrollLeft)
									this.navScrollLeft = this.oldNavScrollLeft
									if(this.oldNavScrollLeft > 0){
										this.$nextTick(() => {
											this.navScrollLeft = Math.max(
												// this.navScrollLeft - (data[index + 1].left - data[index].left), 
												(data[index].right - scrollData.width / 2 - data[index].width / 2 - fatherData.left),
												0
											)
											this.$emit('update:scrollLeft', this.navScrollLeft)
										})
									}
								}
								
								this.$nextTick(() => {
									// this.oldOavActiveIndex = this.navActiveIndex
									this.$emit('change', {
										item: this.navList[index],
										activeIndex: this.navActiveIndex,
										navScrollLeft: this.navScrollLeft
									})
								})
								
							}).exec();
						}).exec();
					}).exec();
				}
			},
			scroll(e) {
			  this.oldNavScrollLeft = e.detail.scrollLeft
			},
		},
		computed: {
			navListData(){
				let list = []
				if(typeof this.navList[0] === 'string'){
					this.navList.forEach(nav => {
						list.push({
							'title': nav
						})
					})
				} else {
					this.navList.forEach(nav => {
						list.push({
							...nav,
							'title': nav[this.listKey]
						})
					})
				}
				return list
			}
		},
		watch: {
			activeIndex(n, o){
				if(this.navActiveIndex != n){
					this.changeNav(n)
				}
			},
			scrollLeft(n, o){
				if(this.navScrollLeft !== n){
					this.navScrollLeft = n
				}
			},
			navListData: {
				immediate: true,
				handler(n, o){
					// console.log(n, o)
					this.$nextTick(() => {
						this.initialize()
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.top-tab{
	width: 100%;
	.nav-box{
		width: 100%;
		.nav-scroll{
			width: 100%;
			white-space: nowrap;
			.nav-scroll-content{
				min-width: 100%;
				display: inline-flex;
				position: relative;
				align-items: center;
				.nav-content{
					min-width: 100%;
					align-items: center;
					.nav-item{
						flex-shrink: 0;
						overflow: scroll;
						flex-wrap: nowrap;
						text{
							&::before{
								display: block;
								content: attr(data-text);
								font-weight: bold;
								height: 0;
								overflow: hidden;
								visibility: hidden;
							}
						}
					}
				}
			}
			.nav-active-border{
				position: absolute;
				bottom: 0rpx;
			}
		}
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
}
</style>
