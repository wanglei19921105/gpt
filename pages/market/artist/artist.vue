<template>
	<view class="page" :class="getThemeClass">
		<!-- 艺术家 -->
		<unavbar :title="i18n.artist1" v-if="false">
			<template #barRight>
				<!-- NFT市场 -->
				<view @click="go_bazaar">流转市场</view>
			</template>
		</unavbar>
		<!-- 搜索框 -->
		<!-- 搜索艺术家名称 -->
		<!-- <usearch class="usearch" placeholder="搜索艺术家名称"></usearch> -->
		<!-- 人气艺术家 -->
		<artist :list="artistList" :go="1"></artist>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import artist from '../../../components/artist.vue'
	export default {
		components: {
			artist
		},
		data() {
			return {
				artistList: [],
				params: {
					page: 1,
					limit: 10
				}
			};
		},
		onReachBottom() {
			if (this.artistList.length >= this.params.limit) {
				this.params.limit += 10
				this.authorList()
			} else {
				this.$refs.uToast.show({
					title: this.i18n.artist3,
					type: 'warning'
				});
			}
		},
		onShow() {
			this.authorList()
		},
		methods: {
			authorList() {
				this.$u.api.author_list(this.params).then(res => {
					if (res.code == 200) {
						this.artistList = res.data.list.data
					}
				}).catch(err => {

				})
			},
			go_bazaar() {
				uni.switchTab({
					url: '../../tabbar/bazaar/bazaar-second'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.usearch {
		margin-top: 30rpx;
	}
</style>
