<template>
	<view class="account page" :class="getThemeClass">
		<!-- <m-empty
			:show="ACCOUNT.length === 0"
			marginTop="100rpx"
			mode="history"
			text="暂无账号"
		/> -->

		<template v-if="user.id">
			<view class="account-item-box card-bg">
				<image :src="user.avatar" mode="" class="account-item-avatar"></image>
				<view class="account-item-info">
					<text class="account-item-name">{{ user.name }}</text>
					<text class="account-item-phone text-content">{{ desensitization(user.mobile) }}</text>
				</view>
				<view class="account-item-state-box">
					<template v-if="change">
						<view class="account-item-state-loading u-flex align-center">
							<view class="account-item-state-loading-icon"></view>
							<text class="account-item-state-loading-text">正在切换...</text>
						</view>
					</template>
					<template v-else>
						<view class="account-item-state-login u-flex align-center">
							<view class="account-item-state-login-icon"></view>
							<text class="account-item-state-login-text">当前使用</text>
						</view>
					</template>
				</view>
			</view>
		</template>

		<template v-if="ACCOUNT.length > 1 || !user.id">
			<u-divider bg-color="rgba( 0, 0, 0, 0)" class="u-m-t-20">点击切换 左滑删除</u-divider>

			<view class="u-p-t-20">
				<template v-for="(item, index) in ACCOUNT">
					<template v-if="item.id !== user.id">
						<u-swipe-action
							:options="options"
							:key="item.id"
							:name="index"
							class="account-swipe-action-item"
							:bg-color="getCardColor"
							@click="delAccount(item)"
							:show="swipeActionShow === index"
						>
							<view
								class="account-item-box card-bg"
								hover-class="account-item-box-hover"
								hover-start-time="0"
								hover-stay-time="200"
								@click="changeAccountLogin(item)"
							>
								<image :src="item.avatar" mode="" class="account-item-avatar"></image>
								<view class="account-item-info">
									<text class="account-item-name">{{ item.name }}</text>
									<text class="account-item-phone text-content">{{ desensitization(item.mobile) }}</text>
								</view>
								<view class="account-item-state-box" v-if="false">
									<template v-if="change">
										<view class="account-item-state-loading u-flex align-center">
											<view class="account-item-state-loading-icon"></view>
											<text class="account-item-state-loading-text">正在切换...</text>
										</view>
									</template>
									<template v-else>
										<view class="account-item-state-login u-flex align-center">
											<view class="account-item-state-login-icon"></view>
											<text class="account-item-state-login-text">当前使用</text>
										</view>
									</template>
								</view>
							</view>
						</u-swipe-action>
					</template>
				</template>
			</view>
		</template>

		<view
			class="account-item-box card-bg u-m-t-30"
			hover-class="account-item-box-hover"
			hover-start-time="0"
			hover-stay-time="200"
			@click="addAccount"
			v-if="ACCOUNT.length < 10"
		>
			<!-- <image src="/static/store/dz_add.png" mode="" class="account-item-avatar"></image> -->
			<u-icon name="plus-circle-fill" size="40"></u-icon>
			<view class="account-item-info justify-center u-m-l-20">
				<text class="account-item-name u-p-b-10 z-font-35">添加账号</text>
			</view>
		</view>

	</view>
</template>

<script>
export default {
	data() {
		return {
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				}
			],
			change: false,
			user: JSON.parse(uni.getStorageSync('usr') || `{}`),
			swipeActionShow: -1
		};
	},
	onLoad() {

	},
	methods: {
		changeAccountLogin(item){
			this.change = true
			this.$u.api.login_make( {...item, login_account: item.mobile} ).then(res => {
				this.change = false
				uni.setStorageSync('token', res.data.token);
				uni.setStorageSync('userpwd', JSON.stringify({
					login_account: item.mobile,
					password: item.password
				}))
				this.user = {
					id: res.data.user.id,
					mobile: item.mobile,
					name: res.data.user.nickname,
					avatar: res.data.user.avatar,
				}
				uni.setStorageSync('usr', JSON.stringify({
					id: res.data.user.id,
					mobile: item.mobile,
					name: res.data.user.nickname,
					avatar: res.data.user.avatar,
				}))
				this.changeAccount({
					id: res.data.user.id,
					mobile: item.mobile,
					name: res.data.user.nickname,
					avatar: res.data.user.avatar,
					password: item.password,
				})
				uni.setStorageSync('id', res.data.user.id)
				uni.showToast({
					icon: 'success',
					title: '切换成功'
				})
				setTimeout(() => {
					uni.hideToast()
					// #ifdef APP
					plus.runtime.restart();
					// #endif
					// #ifdef H5
					window.location.replace(window.location.origin)
					// #endif
					// #ifndef APP || H5
					// uni.switchTab({
					// 	url: '/pages/index/index'
					// })
					// #endif
				}, 800)
			}).catch(err => {
				this.change = false
			})
		},
		delAccount(item){
			this.changeAccount(item, true)
		},
		addAccount(){
			uni.navigateTo({
				url: `/pages/login/index/logInAccount`
			})
		},
		desensitization(value) {
			if (!value) return value
			let _val = value.toString()
			return `${_val.substr(0,2)} **** ${_val.substr(_val.length - 2)}`
		},
	}
};
</script>

<style lang="scss" scoped>
.account {
	width: 750rpx;
	padding: 0rpx 30rpx;
	padding-top: 50rpx;
	&-item{
		&-box{
			width: 690rpx;
			margin: 0 auto;
			background: #fff;
			padding: 30rpx;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			&-hover{
				// background: #fafafa;
				opacity: .8;
			}
		}
		&-avatar{
			width: 100rpx;
			height: 100rpx;
			flex-shrink: 0;
			margin-right: 20rpx;
			border-radius: 10rpx;
		}
		&-info{
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: column;
		}
		&-name{
			font-size: 30rpx;
		}
		&-phone{
			// color: #999;
			margin-top: 10rpx;
		}
		&-state{
			&-box{
				height: 100rpx;
				flex-shrink: 0;
			}
			&-login{
				height: max-content;
				&-icon{
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background: green;
				}
				&-text{
					font-size: 28rpx;
					margin-left: 10rpx;
				}
			}
			&-loading{
				height: max-content;
				&-icon{
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background: #999;
				}
				&-text{
					font-size: 28rpx;
					margin-left: 10rpx;
					color: #999;
				}
			}
		}
	}

	&-swipe-action{
		&-item{
			width: 690rpx;
			margin: 0 auto;
			margin-bottom: 20rpx;
			border-radius: 20rpx;
			overflow: hidden;
			&:last-child {
				margin-bottom: 0rpx;
			}
		}
	}
}
</style>
