<template>
	<span class="text color-main">{{d}}天{{h}}时{{m}}分{{s}}秒</span>
</template>

<script>
	export default {
		props: {
			end: {
				style: [String, Number],
				default: 0,
			}
		},
		data() {
			return {
				timer: null,
				time: 0,
				d: '00',
				h: '00',
				m: '00',
				s: '00'
			}
		},

		watch: {
			end: {
				handler(newVal) {
					if (this.end) {
						this.time = this.end;
						this.daojishi(); //开始倒计时
					}
				},
				deep: true,
				immediate: true
			},
		},
		created() {
			//判断时间是不是已经过了
			// let end_time = this.end.replace(/-/g, "/")
			// let end_times = Date.parse(new Date(end_time)) / 1000;
			// let now_times = Date.parse(new Date()) / 1000;
			// if (now_times > end_times) {
			// 	//倒计时已结束
			// } else {

			// }

			//开始倒计时
			if (this.end) {
				this.time = this.end;
				this.daojishi(); //开始倒计时
			}

		},
		methods: {
			// 开始倒计时
			daojishi() {
				this.timeStart()
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					if (this.time > 0) {
						this.time--
						this.timeStart()
					} else {
						clearInterval(timer)
						this.time = 0
					}
				}, 1000)
			},
			timeStart() {

				if (this.time < 0) {
					this.h = "00";
					this.m = "00";
					this.s = "00";
					return false
				}
				this.d = parseInt(this.time / 86400)
				this.h = parseInt((this.time % 86400) / 3600)
				if (this.h < 10) {
					this.h = '0' + this.h
				}
				this.m = parseInt((this.time % 3600) / 60)
				if (this.m < 10) {
					this.m = '0' + this.m
				}
				this.s = parseInt(this.time % 60)
				if (this.s < 10) {
					this.s = '0' + this.s
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text {
		font-size: 26rpx;
	}
</style>
