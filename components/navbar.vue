<template>
	<view>
		<u-navbar
			:title="titleCon"
			back-icon-name="arrow-leftward"
			:border-bottom="false"
			:back-icon-color="getTextColor"
			back-icon-size="42rpx"
			:title-color="getTextColor"
			title-size="34"
			:is-back="isback"
			:title-bold="true"
			:background="{background: bg ? bg : getBgColor}"
			:customBack="customBack"
		>
				<template>
					<slot></slot>
				</template>
				<template slot="right">
					<slot name="right"></slot>
				</template>
				<template slot="right">
					<view class="u-m-r-30">
						<slot name="barRight"></slot>
					</view>
				</template>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
      bg:{
        type:String,
        default:''
      },
			isback: {
				type: Boolean,
				default: true
			}
		},
		name: "navbar",
		data() {
			return {
				titleCon: this.title,
			};
		},
		watch: {
			title(newVal) {
				this.titleCon = newVal
			}
		},
		methods: {
			customBack(){
				// #ifdef H5
				if(getCurrentPages().length === 1){
					history.back()
					return
				}
				// #endif
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss" scoped>

	/deep/ .u-slot-content {
		flex-direction: row-reverse;
		font-size: 30rpx;
		color: #999999;
		margin-right: 30rpx;
	}

	// /deep/ .u-navbar-fixed{
	// 	z-index: 10000;
	// }
</style>
