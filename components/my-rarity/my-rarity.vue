<template>
	<view class="my-rarity" :style="{margin}" v-if="typeIndex !== -1">
		<my-u-tag 
			:text="typeList[typeIndex].name" 
			:bg-color="typeList[typeIndex].bgColor"
			:color="typeList[typeIndex].color"
			:border-color="typeList[typeIndex].borderColor"
			:size="size"
			class="my-u-tag"
		/>
	</view>
</template>

<script>
	export default {
		name:"my-rarity",
		props: {
			type: {
				type: [Number, String],
				default: 0
			},
			margin: {
				type: String,
				default: '0'
			},
			size: {
				type: String,
				default: 'default'
			}
		},
		data() {
			return {
				typeList: [
					{
						name: '普通',
						color: '#909399',
						bgColor: '#f4f4f5',
						borderColor: '#c8c9cc',
					},
					{
						name: '精良',
						color: '#43d189',
						bgColor: '#d3efda',
						borderColor: '#98e7be',
					},
					{
						name: '稀有',
						color: '#4585f1',
						bgColor: '#dfeeff',
						borderColor: '#89bcf1',
					},
					{
						name: '史诗',
						color: '#8e0eef',
						bgColor: '#ebdfff',
						borderColor: '#aa6cf3',
					},
					{
						name: '传奇',
						color: '#ffb100',
						bgColor: '#fff4dc',
						borderColor: '#efae19',
					}
				]
			};
		},
		computed: {
			typeIndex(){
				if(this.type) return Number(this.type) - 1
				return -1
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-rarity{
	.my-u-tag{
		// border-radius: 0rpx;
		transform: skewX(-15deg);
		/deep/ .u-tag-text {
			display: inline-block;
			// transform: skewX(15deg);
		}
	}
}
</style>