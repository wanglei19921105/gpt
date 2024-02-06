<template>
	<view class="page" :class="getThemeClass">


		<view class="introduce">
				<p>为更好服务平台的各位用户，特此公告数字藏品的二次交易细则。鉴于不同属性的数字艺术的二次交易细则各有不同，请各位用户务必审慎阅读并同意相关规则后进行相应操作，以免造成不必要损失。</p>
				<p>1、依据我国法律要求，特定条件下的数字藏品的二次交易不支持任何形式的变相炒作，我们坚决反对数字藏品炒作、场外交易、欺诈，或以任何其他非法、侵权方式使用的违法违规行为，请大家注意甄别上述涉嫌网络欺诈的行为及其相关风险。
				</p>
				<p>2、数字藏品为虚拟数字商品，购买前请完成实名认证，未满18周岁人群禁止购买。</p>
				<p>3、本商品一经出售不支持七天无理由退换货。</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemData: [],
				wallet: null,
				loadStatus: 'noMore',
				page: 1,
				limit: 10,
				list: []
			};
		},
	}
</script>

<style lang="scss" scoped>
	.page{
		height: 100vh;
		background-size: 100% 100%;
		padding: 20rpx;
	}
	.introduce{
		p{
			margin-bottom: 10rpx;
		}
	}
</style>