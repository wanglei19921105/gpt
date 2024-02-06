<template>
	<view class="number-roller-wrap">
		<view v-for="(n,i) in number.toString().split('')" :key="i" class="number-roller" :class="[isBold ? 'FontBold':'']" :style="style">
			<view v-if="!isNaN(n)" class="number-roller-column" :style="transforms[i]">
				<text v-for="num in numbers" :key="num">{{ num }}</text>
			</view>
			<view v-else-if="uppers.includes(n)" class="number-roller-column" :style="transforms[i]">
				<text v-for="num in uppers" :key="num" class="number-roller-item">{{ num }}</text>
			</view>
			<view v-else-if="lowers.includes(n)" class="number-roller-column" :style="transforms[i]">
				<text v-for="num in lowers" :key="num" class="number-roller-item">{{ num }}</text>
			</view>
			<view v-else class="number-roller-column">
				<text class="number-roller-column">{{ n }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zmxy-number-roller",
		props: {
			number: {
				type: [Number, String],
				default: '',
			},
			size: {
				type: [Number, String],
				default: 14,
			},
			unit: {
				type: String,
				default: 'px',
			},
			color: {
				type: String,
				default: '',
			},
      isBold:{
        type:Boolean,
        default:false
      },
		},
		data() {
			return {
				numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				uppers: [
					'A', 'B', 'C', 'D', 'E', 'F', 'G',
					'H', 'I', 'J', 'K', 'L', 'M', 'N',
					'O', 'P', 'Q', 'R', 'S', 'T', 'U',
					'V', 'W', 'X', 'Y', 'Z'
				],
				lowers: [
					'a', 'b', 'c', 'd', 'e', 'f', 'g',
					'h', 'i', 'j', 'k', 'l', 'm', 'n',
					'o', 'p', 'q', 'r', 's', 't', 'u',
					'v', 'w', 'x', 'y', 'z'
				],
				transforms: [],
			};
		},
		computed: {
			style() {
				let size = this.size + this.unit;
				let style = 'height:' + size + ';font-size:' + size + ';';
				if (this.color) {
					style += 'color:' + this.color + ';';
				}
				return style;
			},
		},
		methods: {
			initData() {
				this.transforms = [];
				this.number.toString().split('').forEach(n => {
					let y = 0;
					if (!isNaN(n)) {
						y = this.size * n;
					} else if (this.uppers.includes(n)) {
						y = this.size * this.uppers.indexOf(n);
					} else if (this.lowers.includes(n)) {
						y = this.size * this.lowers.indexOf(n);
					}
					this.transforms.push('transform:translate3d(0, -' + y + this.unit + ', 0);')
				});
			},
		},
		watch: {
			number() {
				// 重新初始化
				this.initData();
			}
		},
		mounted() {
			// 初始化（兼容 H5）
			setTimeout(() => this.initData(), 10)
		},
	}
</script>

<style lang="scss">
	.number-roller-wrap {
		display: inline-flex;
		align-items: center;
		overflow: hidden;
		/*font-family: Courier;*/

		.number-roller {
			line-height: 1;
			display: inline-flex;
		}

		.number-roller-column {
			line-height: 1;
			display: inline-flex;
			flex-direction: column;
			align-items: center;
			transform: translate3d(0, 0, 0);
			transition: transform 1.2s;
		}
	}
</style>
