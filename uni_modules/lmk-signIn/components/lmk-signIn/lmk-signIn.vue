<template>
	<view>
		<view class="signIn font">
			<view class="day_count">
				<view class="back_ flex alignCenter">
					<text>已连续签到</text>
				</view>
				<view class="day_main flex justy_center  alignBaseline">
					<view class="flex">
						<view class="day_" v-for="item in signDays">{{item}}</view>
					</view>
					<text class="dat_text">天</text>
				</view>
				<view class="calder_sel">
					<view class="calendar-box">
							<view class="miss_box">
								<view class="month">
									<view @click="lastMonth">
										上个月
										<!-- <svg t="1687685481763" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5450" width="28" height="28"><path d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z" fill="#ffffff" p-id="5451"></path></svg> -->
									</view>
									<view class="date_text">{{year}}年{{month}}月</view>
									<view @click="nextMonth">
										下个月
										<!-- <svg t="1687685346212" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4040" width="28" height="28"><path d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z" fill="#ffffff" p-id="4041"></path></svg> -->
									</view>
								</view>
								<view class="week">
									<view :style="'color:'+(weeks==weeked?bgweek:'')+';'" v-for="weeks in weekArr">{{weeks}}</view>
								</view>
								<view class="day">
									<view  :class="[{'checkday':days.date==''},{'choose':days.flag },{'today':days.date==localDate}]"
										 v-for="(days,index) in dayArr" :key="index">
										{{days.day}}
										<!-- <view :class="[{'repair': days.date!='' && !days.flag && days.date!=localDate && currentMonth==month && days.day<day},{'sign':days.date==localDate}]"></view> -->
									</view>
								</view>
							</view>
							<view class="but">
								<button v-if="!isSign" :disabled='todayStr == changeDateStr? false : true'  :style="'background:'+(todayStr == changeDateStr ? signBtnBg : '#666')+';'" @click="daySign(dayArr[aheadDay + day - 1])">立即签到</button>
								<button v-else :disabled="true" style="background-color:#666;" >今日已签</button>
							</view>
						</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		name:'signIn',
		props: {
			// 语言
			lang: {
				type: String,
				default: 'zh'
			},
			//日历
			type: {
				type: String,
				default: 'calendar'
			},
			//周颜色
			bgweek: {
				type: String,
				default: '#4187F9'
			},
			//签到按钮
			signBtnBg: {
				type: String,
				default: '#4187F9'
			},
		},
		data() {
			return {
				weeked: '', // 今天周几
				dayArr: [], // 当前月每日
				localDate: '', // 今天日期
				day: new Date().getDate(), // 当前日
				year: new Date().getFullYear(), // 当前年
				month: new Date().getMonth() + 1, // 当前月
				currentMonth: new Date().getMonth() + 1, // 当前月
				weekArr: ['日', '一', '二', '三', '四', '五', '六'], // 每周
				aheadDay: 0,	// 前方空白天数数量
				todayStr:'',
				changeDateStr:'',
				isSign:false,//判断今天是否已经签到
				signDays:'000',
				currentTimer:(new Date().getTime())/1000,//当前时间戳
			}
		},
		mounted() {
			let that = this;
			// 初始日期
			that.initDate();
			// 今天日期
			that.localDate = that.year + '-' + that.formatNum(that.month) + '-' + that.formatNum(that.day);
			that.todayStr = that.year + '-' + that.formatNum(that.month);
			// 中英切换
			if (that.lang != 'zh') that.weekArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			// 今天周几
			that.weeked = that.weekArr[new Date().getDay()];
			// 签到功能
			if (that.type != 'calendar') {
				for (let i in that.dayArr) {
					that.$set(that.dayArr[i], 'flag', false);
				}
			}
			
			
		},
		methods: {
			//将日期格式转化为时间戳
			formatTimer(date){
				return (new Date(date).getTime())/1000
			},
			//设置累计签到天数
			getSignDay(res){
				let days = String(res)
				// this.signDays = res
				let strArra = []
				for(let p=0;p<3;p++){
					if(days[p] == undefined){
						strArra.unshift('0')
					}else{
						strArra.push(days[p])
					}
				}
				this.signDays = strArra.join('')
			},
			//获取签到记录
			getSignLog(){
				this.$u.api.signLog().then(res => {
					console.log(res)
					if(res.code === 200){
						let data = res.data.log;
						let data_s = data.map(item=>{
							//console.log(item)
							return item.created_at.substring(0,10)
						})
						let data_n = [...new Set(data_s)];
						// this.$emit('signLog',data_n.length)
						this.getSignDay(res.data.leiji)
						// this.getSignDay(data_n.length)
						//判断今天是否已经签到
						data.forEach((item,index)=>{
							if(item.created_at.substring(0,10) == this.localDate){
								this.isSign = true
							}
						})
						//标记签到的日期
						this.dayArr.forEach((item,index)=>{
							data.forEach((items,index)=>{
								if( item.date!=='' && item.date == items.created_at.substring(0,10)){
									item.flag = true
								}
							})
						})
						this.$forceUpdate()
					}
				})
				
			},
			// 选择年月
			changeDate(e) {
				let that = this;
				that.year = parseInt(e.detail.value.split('-')[0]);
				that.month = parseInt(e.detail.value.split('-')[1]);
				that.initDate();
			},
			formatNumber(num) {
				return num < 10 ? ('0' + num) : num;
			},
			formatTime(number, format) {
				var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
				var returnArr = [];
			 
				var date = new Date(number * 1000);
				returnArr.push(date.getFullYear());
				returnArr.push(this.formatNumber(date.getMonth() + 1));
				returnArr.push(this.formatNumber(date.getDate()));
			 
				returnArr.push(this.formatNumber(date.getHours()));
				returnArr.push(this.formatNumber(date.getMinutes()));
				returnArr.push(this.formatNumber(date.getSeconds()));
			 
				for (var i in returnArr) {
					format = format.replace(formateArr[i], returnArr[i]);
				}
			 
				return format;
			},
			// 今日签到
			daySign(obj) {
				// 今天日期加上前方空白日期数量
				let index = this.aheadDay + this.day - 1
				let nowTime = this.formatTime((new Date().getTime())/1000,'Y-M-D h:m:s');
				
				this.$u.api.signUp().then(res => {
					if(res.code == 200){
						if(res.data.id){
							uni.showToast({
								title: '实物奖励',
								icon: 'success'
							});
						}else{
							uni.showToast({
								title: '签到成功',
								icon: 'success'
							});
							this.$set(this.dayArr[index], 'flag', true);
							this.isSign = true;
							this.getSignLog()//刷新签到签到记录
							this.$emit('signSuccess', {
								msg:'签到成功',
								data:1
							});
						}
						
					}else{
						uni.showToast({
							title: '签到失败',
							icon: 'none'
						});
					}
				})
			},
			// 点击补签
			signToday(obj, index) {
				let that = this;
				// 限制本月可进行签到
				if ((new Date().getMonth() + 1) != parseInt(obj.date.split('-')[1])) return;
				// 禁用非本月点击签到且限制签到日期小于本日
				if (obj.date != '' && obj.day < that.day) {
					// 开启已签到提醒
					if (that.dayArr[index].flag) {
						uni.showToast({
							title: '已签到',
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: that.day > obj.day ? '补签成功' : '',
							icon: 'success'
						});	
						that.$set(that.dayArr[index], 'flag', true);
						that.$emit('signSuccess', {
							msg:'补签成功',
							data:2
						});
					}
				}
			},
			// 初始化日期
			initDate() {
				let that = this;
				that.dayArr = [];
				// 当前月总天数
				let totalDay = new Date(that.year, that.month, 0).getDate();
				// 遍历总天数将日期逐个添加至数组
				for (let i = 1; i <= totalDay; i++) {
					// 得到需补充天数
					let value = (new Date(that.year, that.month - 1, i)).getDay();
					// 补充前面空白日期
					if (i == 1 && value != 0) {
						that.addBefore(value);
						that.aheadDay = value;
					}
					// 添加本月日期
					let obj = {};
					obj.date = that.year + '-' + that.formatNum(that.month) + '-' + that.formatNum(i);
					obj.day = i;
					that.dayArr.push(obj);
					// 补充后面空白日期
					if (i == totalDay && value != 6) that.addAfter(value);
				}
				that.changeDateStr=that.year+'-'+that.formatNum(that.month)
				that.getSignLog();//获取当月签到记录
			},
			// 补充前面空白日期
			addBefore(value) {
				let that = this;
				let totalDay = new Date(that.year, that.month - 1, 0).getDate();
				for (let i = 0; i < value; i++) {
					let obj = {};
					obj.date = '';
					obj.day = totalDay - (value - i) + 1;
					that.dayArr.push(obj);
				}
			},
			// 补充后空白日期
			addAfter(value) {
				let that = this;
				for (let i = 0; i < (6 - value); i++) {
					let obj = {};
					obj.date = '';
					obj.day = i + 1;
					that.dayArr.push(obj);
				}
			},
			// 格式化日期位数
			formatNum(num) {
				return num < 10 ? ('0' + num) : num;
			},
			// 上一个月
			lastMonth() {
				let that = this;
				if (that.month == 1) {
					that.year -= 1;
					that.month = 12;
				} else {
					that.month -= 1;
				}
				that.initDate();
			},
			// 下一个月
			nextMonth() {
				let that = this;
				if (that.month == 12) {
					that.year += 1;
					that.month = 1;
				} else {
					that.month += 1;
				}
				that.initDate();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex{
		display: flex;
	}
	.day_count{
		width: 100%;
		height: 414rpx;
		background-image: url('../../static/images/signInbg.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		position: relative;
		.back_{
			height: 88rpx;
			line-height: 88rpx;
			justify-content: center;
			color: #fff;
			.back_icon{
				position: absolute;
				left: 0;
				top: 0;
				height: 88rpx;
				line-height: 88rpx;
				padding: 0 20rpx;
			}
		}
		.day_main{
			height:120rpx;
			width: 350rpx;
			position: relative;
			margin:60rpx  auto 40rpx auto;
			.day_{
				width: 80rpx;
				height:120rpx;
				line-height: 120rpx;
				text-align: center;
				margin-right: 20rpx;
				background-color: #fff;
				color: $uni-color-primary;
				font-size: 100rpx;
				border-radius: 10rpx;
			}
			.dat_text{
				position: absolute;
				right: 0;
				bottom: 0;
				color: #fff;
				font-size: 36rpx;
			}
		}
		
	}
	.calendar-box {
		width: 100%;
		flex-direction: column;
		justify-content: center;
		
	}
	.date_text{
		color: #fff;
		font-size: 36rpx;
	}
	.miss_box {
		// margin-top: -100rpx;
		width: 100%;
		background-image: url('../../static/images/calder.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		width: 704rpx;
		/* height: 704rpx; */
		margin:0 auto;
		padding: 20rpx 40rpx;
		box-sizing: border-box;
	}
	
	.calendar-box,
	.month,
	.week,
	.day {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.month,
	.week,
	.day {
		width: 100%;
	}
	
	.month {
		margin: 30rpx 0;
		color: #fff;
		position: relative;
	}
	
	.picker {
		width: 160rpx;
		height: 40rpx;
		position: absolute;
		top: 20rpx;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.day {
		flex-wrap: wrap;
	}
	
	.week>view,
	.day>view {
		width:11%;
		height: 60rpx;
		margin: 10rpx;
		text-align: center;
		position: relative;
		line-height: 60rpx;
	}
	
	.checkday {
		color: #999;
	}
	
	.day .choose {
		width:60rpx;
		height: 60rpx;
		color: #FFFFFF;
		border-radius: 50%;
		background-color: #4187F9;
		color: #fff;
	}
	
	.circle {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	//今
	.sign {
		background-color: #f5a34f;
		color: #fff;
		width: 32rpx;
		height: 32rpx;
		font-size: 20rpx;
		line-height: 32rpx;
		text-align: center;
		border-radius: 50%;
		position: absolute;
		top: -8rpx;
		right: -8rpx;
		&::after{
		  content:'今';
		  display: block;
		}
	}
	//补签
	.repair {
		background-color: #f00;
		color: #fff;
		width: 32rpx;
		height: 32rpx;
		font-size: 20rpx;
		line-height: 32rpx;
		text-align: center;
		border-radius: 50%;
		position: absolute;
		top: -8rpx;
		right: -8rpx;
		&::after{
			  content:'补';
			  display: block;
			} 
	}
	
	.but {
		display: flex;
		flex: 1;
		margin-top:40rpx;
		justify-content: center;
	}
	.but button {
		width: 650rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 15rpx;
		border: 1px solid transparent;
		outline: none;
		color: #FFFFFF;
		font-size: 32rpx;
		background-color: #4187F9;
	}
	uni-button:after {
		border: none;
	}
	
	.top {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 16rpx;
		align-items: center;
	}
	.top h4 {
		font-weight: 600;
		font-size: 36rpx;
		line-height: 50rpx;
	}
	.top h4 span {
		color: #4187F9;
		margin: 0 10rpx;
		font-size: 32rpx
	}
	.top p {
		font-style: normal;
		font-weight: normal;
		font-size: 28rpx;
		line-height: 40rpx;
		color: #4187F9;
	}
	
	.rig span {
		font-style: normal;
		font-weight: normal;
		font-size: 24rpx;
		line-height: 48rpx;
		color: #4187F9;
		border: 1px solid #4187F9;
		padding: 10rpx 20rpx;
		border-radius: 32rpx;
	}
</style>
