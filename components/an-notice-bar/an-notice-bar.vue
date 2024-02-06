<template>
	<view>
		<view class="an-notice-box" :style="'background-color: '+bgColor+';'">
			<view class="an-notice-icon">
				<uni-icons :color="color" type="sound" size="18" />
				<!-- <u-icon name="volume-up-fill" :color="color" size="32"></u-icon> -->
			</view>
			<scroll-view class="an-notice-content">
				<swiper v-if="show" class="swiper" :autoplay="true" :interval="switchTime*1000" :duration="1500"
					:circular="true" :vertical="true">
					<swiper-item v-for="(text, index) in list" :key="index" class="an-notice-content-item">
						<view class="swiper-item">
							<view class="an-notice-content-item-text" :style="'color: '+color+';'">
								<view class="">
									{{text.news_info}}
								</view>
								<view class="">
									{{getTime(text.created_at)}}
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// import uniIcons from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			// uniIcons
		},
		props: {
			text: {
				type: Array,
				default: []
			},
			color: {
				type: String,
				default: '#fff'
			},
			bgColor: {
				type: String,
				default: '#000'
			},
			switchTime: {
				type: Number,
				default: 3
			},

		},
		data() {
			return {
				number: 0,
				list: [],
				copyText: '',
				show: '',
			};
		},
		mounted() {
			this.list = [...this.text];

			this.show = true;
			/* this.number = 0;
			this.startMove(); */
		},
		watch: {
			text: function() {
				this.show = true;
				if (this.text != this.copyText) {
					this.copyText = this.text;
					this.list = [...this.text];
					if (this.list.length > 1) {
						this.showSerial = true;
					}
				}
				/* this.number = 0;
				this.startMove(); */
			}
		},
		methods: {
			/* startMove () {
			  // eslint-disable-next-line
			  let timer = setTimeout(() => {
				if (this.number === this.list.length-1) {
				  this.number = 0;
				} else {
				  this.number += 1;
				}
				this.startMove();
			  }, this.switchTime*1000);
			}, */
			more() {
				this.show = false;
				this.$emit('more')
			},
			getTime(datetime) {
				var dateTimeStamp = new Date(datetime.replace(/ /, 'T')).getTime(); //这里要减去中国的时区8小时
				var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
				var hour = minute * 60;
				var day = hour * 24;
				var week = day * 7;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime(); //获取当前时间毫秒
				var diffValue = now - dateTimeStamp; //时间差

				if (diffValue < 0) {
					console.log("diffValue<0", datetime, dateTimeStamp, now, diffValue);
					return '刚刚';
				}
				var minC = diffValue / minute; //计算时间差的分，时，天，周，月
				var hourC = diffValue / hour;
				var dayC = diffValue / day;
				var weekC = diffValue / week;
				var monthC = diffValue / month;
				var result = "2";
				if (monthC >= 1 && monthC <= 3) {
					result = " " + parseInt(monthC) + "月前"
				} else if (weekC >= 1 && weekC <= 3) {
					result = " " + parseInt(weekC) + "周前"
				} else if (dayC >= 1 && dayC <= 6) {
					result = " " + parseInt(dayC) + "天前"
				} else if (hourC >= 1 && hourC <= 23) {
					result = " " + parseInt(hourC) + "小时前"
				} else if (minC >= 1 && minC <= 59) {
					result = " " + parseInt(minC) + "分钟前"
				} else if (diffValue >= 0 && diffValue <= minute) {
					result = "刚刚"
				} else {
					var datetime = new Date();
					datetime.setTime(dateTimeStamp);
					var Nyear = datetime.getFullYear(); {}
					var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
					var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
					var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
					var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
					var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
					result = Nyear + "-" + Nmonth + "-" + Ndate
				}
				return result;
			}
		}
	}
</script>

<style>
	.swiper {
		height: 60upx !important;
	}

	.an-notice-box {
		width: 100%;
		height: 60upx;
		overflow: hidden;
		margin: 20upx 0;
		display: flex;
		justify-content: flex-start;
	}

	.an-notice-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-right: 10rpx;
	}

	.an-notice-content {
		/* width: calc(100% - 220upx); */
		flex: 1;
		position: relative;
		font-size: 14px;
	}

	.an-notice-content-item {
		width: 100%;
		height: 60upx;
		text-align: left;
		line-height: 60upx;
	}

	.an-notice-content-item-text {
		display: flex;
		justify-content: space-between;
		align-items: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 24rpx;
	}

	.an-notice-more {
		width: 130upx;
		height: 60upx;
		font-size: 12px;
		line-height: 60upx;
		text-align: right;
		color: #999;
	}

	@keyframes anotice {
		0% {
			transform: translateY(100%);
		}

		30% {
			transform: translateY(0);
		}

		70% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}
</style>