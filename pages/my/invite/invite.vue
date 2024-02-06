<template>
	<view class="page">

		<image src="/static/images/ranking/yqfx_bg.png" class="page-bg" mode="widthFix"></image>

		<view class="content">

			<view class="card-box">
				<view class="title-box">
					<text>邀请好友</text>
				</view>

				<view class="content-box">
					<view class="content-user-box">
						<view class="u-flex align-center justify-between">
							<view class="u-flex align-center">
								<u-avatar :src="avatar" size="100"></u-avatar>
								<view class="u-flex-col u-m-l-20">
									<text class="u-font-32 text-w-500 color-3d">{{name}}</text>
									<text class="u-font-22 u-m-t-10 color-6">用户ID号：{{ userId }}</text>
								</view>
							</view>
<!--							<view class="u-flex">-->
<!--								<text class="color-3 u-font-22">剩余邀请名额：</text>-->
<!--								<view class="content-tag">-->
<!--									<text class="color-3">{{ user_invitation_limit }}</text>-->
<!--								</view>-->
<!--							</view>-->
						</view>
						<view class="content-li-content-but" @click="buycode" v-if="sys_invitation_unlimited==0">购买邀请码</view>
					</view>


					<view class="content-li-box">
						<view class="content-li-title-box">
							<view class="content-li-title-icon">1</view>
							<view class="content-li-title-text">邀请链接</view>
						</view>

						<view class="content-li-content-box">
							<view class="content-li-content-left u-line-1 text-main">
								<text class="color-3">{{ QRcode }}</text>
							</view>
							<view class="content-li-content-right">
								<view class="content-li-content-but" @click="copy(QRcode)">复制链接</view>
							</view>
						</view>
					</view>

					<view class="content-li-box">
						<view class="content-li-title-box">
							<view class="content-li-title-icon">2</view>
							<view class="content-li-title-text">邀请码</view>
						</view>

						<view class="content-li-content-box">
							<view class="content-li-content-left u-line-1 text-main">
								<text class="color-3">{{ invite_code }}</text>
							</view>
							<view class="content-li-content-right">
								<view class="content-li-content-but" @click="copy(invite_code)">复制邀请码</view>
							</view>
						</view>
					</view>

					<view class="content-li-box">
						<view class="content-li-title-box">
							<view class="content-li-title-icon">3</view>
							<view class="content-li-title-text">邀请二维码</view>
						</view>

						<view class="content-li-content-box-image">
							<view class="content-li-content-left">
								<!-- <image src="" class="content-li-content-left" mode="widthFix"></image> -->
								<tki-qrcode foreground="#333333" ref="qrcode" :val="QRcode" :showLoading="false" />
							</view>
							<view class="content-li-content-right">
								<view class="content-li-content-but" @click="make">邀请海报(长按海报保存)</view>
							</view>
						</view>

					</view>

				</view>
			</view>

			<view class="card-box">
				<view class="title-box">
					<text>活动规则</text>
				</view>

				<view class="content-box">
					<u-parse class="size-28 color-d5" :html="contentText" />
				</view>
			</view>

			<view class="card-box" v-if="false">
				<view class="title-box">
					<text>邀请历史</text>
				</view>

				<view class="content-box">

					<view class="content-list-box">
						<template v-for="(item,index) in list">
							<view class="content-list-item u-flex align-end justify-between" :key="index">
								<view class="u-flex align-center">
									<u-avatar :src="item.avatar" size="80"></u-avatar>
									<view class="u-flex-col u-m-l-20">
										<view class="u-flex">
											<text class="u-font-28 color-3d text-w-500">{{ item.nickname }}</text>
											<text class="content-list-item-tag" v-if="item.check == 1">已实名</text>
										</view>
										<view class="">
											<text class="u-font-20 color-6">{{item.user_account}}</text>
										</view>
									</view>
								</view>
								<view class="">
									<text class="u-font-20 color-6">{{ item.created_at }}</text>
								</view>
							</view>
						</template>
					</view>

				</view>
			</view>

			<view class="card-box">
				<view class="title-box">
					<text>邀请排行</text>
				</view>
				<view class="content-box">
					<view class="content-table-box">
						<view class="content-table-tr">
              <view class="content-table-th num Width_10">排行</view>
							<view class="content-table-th name Width_28">昵称</view>
              <view class="content-table-th num Width_20">赚积分</view>
              <view class="content-table-th num Width_20">赚红包</view>
							<!-- <view class="content-table-th phone">手机号</view> -->
							<view class="content-table-th num Width_20">邀请数</view>
						</view>
						<template v-for="(item,index) in list">
							<view class="content-table-tr" :key="index">
                <view class="content-table-td num Width_10">
                  <text>{{ index + 1 }}</text>
                </view>
								<view class="content-table-td name Width_28">
									<image :src="(item.user || {}).avatar" class="content-table-td-avatar" mode=""></image>
									<text class="content-table-td-name">{{ (item.user || {}).nickname }}</text>
								</view>
								<!-- <view class="content-table-td phone">
									<text>{{item.user_account}}</text>
								</view> -->
								<view class="content-table-td num Width_20">
									<text>{{ item.points }}分</text>
								</view>
                <view class="content-table-td num Width_20">
                  <text>{{ item.red_packet }}元</text>
                </view>
                <view class="content-table-td num Width_20 PR" @click="checkChild(item)">
                  <text>{{ item.total_invitations }}人</text>
                  <image src="/static/images/youjiantou.png" mode="aspectFit" class="Icon"></image>
                </view>
							</view>
						</template>
					</view>
				</view>
			</view>
		</view>

		<create-poster ref="poster" :avatar="avatar" :qrVal="QRcode" :inviteBg="backImg" :name="name" @finish="finish"></create-poster>
	</view>
</template>

<script>
export default {
	data() {
		return {
			inviteData: {},
			contentText: '',
			QRcode: '',
			backImg: '',

			avatar: '',
			name: '',
			posturl: '',
			invite_code: '000000',
			list:[],
			userId: 0,
			inviteNum: 0,
			inviteMaxNum: 0,
			user_invitation_limit:0,
			teamList: [],
			sys_invitation_unlimited:0
		};
	},
	onShow() {
		this.recommend();
		this.invite()
	},
	methods: {
    checkChild(item){
      uni.navigateTo({
        url: '/pages/my/invite/inviteChildren?id=' + item.user_id
      })
    },
		buycode(){
			uni.navigateTo({
				url:"/pages/my/invite/buyCode"
			})
		},
		recommend() {
			this.$u.api
				.recommend()
				.then(res => {
					this.list = res.data.ranking_list
					this.avatar = res.data.avatar;
					this.name = res.data.nickname;
					this.inviteData = res.data;
					this.QRcode = res.data.url;
					this.backImg = res.data.share.pic;
					this.invite_code = res.data.invite_code
					console.log(this.QRcode);
					this.contentText = res.data.share.content;
					this.user_invitation_limit = res.data.user_invitation_limit
					this.sys_invitation_unlimited = res.data.sys_invitation_unlimited
					setTimeout(()=>{
						this.$refs.qrcode._makeCode();
					},300)

				})
				.catch(err => {});
		},
		invite(){
			this.$u.api
				.invite()
				.then(res => {
					this.teamList = res.data.list
					this.avatar = res.data.users.avatar;
					this.name = res.data.users.nickname;
					this.userId = res.data.users.id
					this.invite_code = res.data.users.invite_code
					this.inviteNum = res.data.users.child_num
					this.inviteMaxNum = res.data.users.invitation_limit
				})
				.catch(err => {});
		},
		back() {
			uni.navigateBack({});
		},
		init(num){
			return num.substr(0,3) + "****" + num.substr(7)
		},
		finish(data) {
			this.posturl = data.url;
			if (data.type == 1) this.share();
		},
		make() {
			if (this.posturl) {
				uni.previewImage({
					urls: [this.posturl]
				});
			} else {
				this.$refs.poster.create();
			}
		},
		copy(data){
			uni.setClipboardData({
				data: data,
				success: function () {
					uni.showToast({
						title:"复制成功",
						icon:"none"
					})
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.Width_20{
  width: 20%;
  text-align: center;
}
.Width_10{
  width: 10%;
  text-align: center;
}
.Width_28{
  width: 28%;
}
.page {
	// background-color: #010101;
	background: linear-gradient(180deg, #03096B 0%, #000000 100%);
	position: relative;
	padding-top: 770rpx;
	padding-left: 30rpx;
	padding-right: 30rpx;
	padding-bottom: 50rpx;
}

.page-bg{
	position: absolute;
	top: 0rpx;
	left: 0rpx;
	width: 100vw;
	z-index: 0;
}

.content-li-content-but {
							width: 100%;
							background: #2121D9;
							border-radius: 60rpx;
							padding: 30rpx 40rpx;
							font-size: 32rpx;
							font-weight: 500;
							color: #FFFFFF;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-top: 50rpx;
							&:active {
								opacity: .8;
							}
						}

.content{
	position: relative;
	z-index: 1;

	.card-box{
		width: 100%;
		padding: 30rpx;
		background-color: #fff;
		border: solid #1A218D 15rpx;
		border-radius: 25rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 50rpx;

		.title-box{
			background: linear-gradient(180deg, #2121D9 0%, #1010A8 100%);
			border-radius: 30rpx;
			padding: 10rpx 30rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #FFFFFF;
			width: max-content;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.content-box{
			width: 100%;
			padding: 30rpx 0rpx;

			.content-user-box {
				padding: 0rpx 0rpx 50rpx 0rpx;
				border-bottom: solid 1rpx #E8E8E8;
			}

			.content-li-box{
				width: 100%;
				margin-top: 50rpx;
				&:first-child {
					margin-top: 0rpx;
				}

				.content-li-title-box{
					display: flex;
					align-items: center;
					.content-li-title-icon{
						width: 50rpx;
						height: 50rpx;
						background: #4747EF;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28rpx;
						font-weight: 500;
						color: #FFFFFF;
						margin-right: 20rpx;
					}
					.content-li-title-text {
						font-size: 34rpx;
						font-weight: 800;
						color: #000000;
					}
				}

				.content-li-content-box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-left: 30rpx;
					background-color: #F8F8F8;
					border-radius: 50rpx;
					margin-top: 40rpx;
					.content-li-content-left {
						width: 100%;
					}
					.content-li-content-right {
						flex-shrink: 0;
						margin-left: 30rpx;
						.content-li-content-but {
							background: #2121D9;
							border-radius: 60rpx;
							padding: 30rpx 40rpx;
							font-size: 32rpx;
							font-weight: 500;
							color: #FFFFFF;
							display: flex;
							align-items: center;
							justify-content: center;
							&:active {
								opacity: .8;
							}
						}
					}
				}

				.content-li-content-box-image{
					display: flex;
					align-items: center;
					flex-direction: column;
					margin-top: 50rpx;
					.content-li-content-left {
						width: 240rpx;
						height: 240rpx;
						.content-li-content-image {
							width: 240rpx;
							height: 240rpx;
						}
					}
					.content-li-content-right {
						width: 90%;
						.content-li-content-but {
							width: 100%;
							background: #2121D9;
							border-radius: 60rpx;
							padding: 30rpx 40rpx;
							font-size: 32rpx;
							font-weight: 500;
							color: #FFFFFF;
							display: flex;
							align-items: center;
							justify-content: center;
							&:active {
								opacity: .8;
							}
						}
					}
				}
			}

			.content-table-box{
				.content-table-tr{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 30rpx;
					border: solid 1rpx #D7D8DB;
					border-top: none;
					&:first-child {
						border-top: solid 1rpx #D7D8DB;
					}

					.content-table-th{
            font-weight: 700;
						font-size: 24rpx;
						color: #4B505A;
						// &.name {
						// 	width: 40%;
						// }
						// &.phone {
						// 	width: 40%;
						// }
						// &.num {
						// 	width: 20%;
						// }
					}
					.content-table-td{
						font-size: 24rpx;
						color: #000000;
						//display: flex;
						//align-items: center;
            .Icon{
              position: absolute;
              width: 20rpx;
              height: 20rpx;
              right: 36%;
              bottom: -24rpx;
            }
						.content-table-td-avatar {
							width: 50rpx;
							height: 50rpx;
							margin-right: 40rpx;
						}

						//&.name {
						//	width: 40%;
						//}
						//&.phone {
						//	width: 40%;
						//}
						//&.num {
						//	width: 20%;
						//	font-weight: 800;
						//}
					}
				}
			}

			.content-list-box{
				.content-list-item {
					background: #F6FAFE;
					padding: 20rpx 30rpx;
					border-radius: 25rpx;
					margin-top: 20rpx;
					.content-list-item-tag {
						font-size: 20rpx;
						color: #fff;
						padding: 5rpx 15rpx;
						background: linear-gradient(289deg, #094A94 11%, #AED1F9 88%);
						border-radius: 50rpx;
						margin-left: 20rpx;
					}
				}
			}
		}
	}

}
.PR{
  position: relative;
}
.Block{
  display: block;
}
</style>
