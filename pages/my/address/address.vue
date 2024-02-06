<template>
	<view class="page" :class="getThemeClass">
		<empty v-if="!list.length"></empty>
		<view class="address">
			<view class="main-card u-m-b-30" v-for="(item,index) in list" :key="index" @click="choose(item)">
				<view class="flex justify-between align-center">
					<view class="flex align-center">
						<u-tag class="u-m-r-20" text="默认" mode="dark" type="primary" size="mini"
							v-if="item.isDefault" />
						<text class="u-font-30">{{item.name}}</text>
						<text class="u-m-l-20 u-font-30">{{item.mobile}}</text>
					</view>
					<view class="" @click.stop="goedit(item.id)">
						<u-icon name="edit-pen"></u-icon>
					</view>

				</view>
				<view class="u-font-28 text-content u-m-t-30">{{item.region}}{{item.regionCode}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
        $:this.$,
        type:'',
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: "./address-add"
			})
		},
		onShow() {
			this.loadData()
		},
    onLoad(e){
      if(typeof(e.type) != 'undefined'){
        this.type = 1
      }
    },
		methods: {
			loadData() {
				this.$u.api.address().then(res => {
					this.list = res.data.list
				})
			},
			goedit(id) {
				uni.navigateTo({
					url: `./address-detail?id=${id}`
				})
			},
			choose(data) {
        if(this.type == 1){
          this.$.setData('addressInfo',data)
          this.$.back()
          return
        }
				let routes = getCurrentPages();
				console.log("Ddddd",routes)
				if (routes.length > 1) {
					let lastRoute = routes[routes.length - 2].route
					if (lastRoute != 'pages/my/settings/settings') {
						getApp().globalData.address = data
						uni.navigateBack()
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.address {
		padding: 30rpx;

	}
</style>
