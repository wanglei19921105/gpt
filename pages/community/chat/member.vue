<template>
	<view class="page" :class="getThemeClass">
		
		<uni-nav-bar :fixed="true" :statusBar="true" left-icon="back" :border="false" :backgroundColor="getThemeName=='light'?'#f8f8f8':'#111926'"
			:color="getThemeName=='light'?'#111926':'#ffffff'" :right-text="righttext" title="全部成员"
			@clickRight="onnavtap" @clickLeft="back"></uni-nav-bar>
		<u-index-list :scrollTop="scrollTop">
			<view v-for="(item, index) in indexList" :key="index">
				<view class="" v-if="checkEmpty(item)">
					<u-index-anchor :custom-style="getThemeName=='light'?light:dark" :index="item" />
					<view v-for="(e,i) in list" :key="i">
						<view class="flex justify-between align-center list-cell card-bg" v-if="e.char==item">
							<view class="flex align-center">
								<image :src="e.avatar" mode="aspectFill" class="member-avatar"></image>
								<view class="u-m-l-20 u-m-r-20 u-font-28 text-bold">{{e.nickname}}</view>
								<u-tag text="群主" v-if="e.isLeader" mode="dark" type="success" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-index-list>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
					"T", "U",
					"V", "W", "X", "Y", "Z"
				],
				list: [],
				light: {
					backgroundColor: '#f8f8f8',
					color: '#111926'
				},
				dark: {
					backgroundColor: '#111926',
					color: '#ffffff'
				},

				id: '',
				righttext: ''
			}
		},
		onLoad(data) {
			this.id = data.id
			this.loadData()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			onnavtap() {
				if (!this.righttext) return
				uni.showActionSheet({
					itemList: ['群聊资料 ', '解除全部禁言', '全部禁言'],
					success: res => {
						let index = res.tapIndex
						if (index == 0) {
							uni.navigateTo({
								url: `/pages/community/chat/chat-info?id=${this.id}`
							})
						}else if(index ==1){
							this.jinyan(false)
						}else{
							this.jinyan(true)
						}
					}
				});
			},
			jinyan(type){
				this.$u.api.districtMuteGroup({
					id: this.id,
					isMute: type
				}).then(res=>{
					this.$refs.uToast.show({title:'操作成功',type: 'success'})
				})
			},
			back(){
				uni.navigateBack()
			},
			loadData() {
				this.$u.api.districtGroupUsers({
					id: this.id
				}).then(res => {
					this.list = res.data.districtUsers
					if (res.data.user_is_leader) this.righttext = '设置'
					else this.righttext = ''
				})
			},
			checkEmpty(key) {
				let flag = false
				for (var i = 0; i < this.list.length; i++) {
					if (this.list[i].char == key) {
						flag = true
						break
					}
				}
				return flag
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		font-size: 14px;
		line-height: 24px;
	}

	.member-avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
</style>
