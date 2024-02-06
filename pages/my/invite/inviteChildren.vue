<template>
	<view class="page">
		<view class="content">

      <view class="card-box">
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
                <view class="content-table-td num Width_20 PR">
                  <text>{{ item.total_invitations }}人</text>
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
  onLoad(e){
    if(typeof(e.id) != 'undefined'){
      this.recommend(e.id);
    }
  },
	onShow() {
	},
	methods: {
		buycode(){
			uni.navigateTo({
				url:"/pages/my/invite/buyCode"
			})
		},
		recommend(id) {
			this.$u.api
				.recommendChildrenList({parent_id:id})
				.then(res => {
					this.list = res.data.ranking_list

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
  padding-top: 40rpx;
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
            //  width: 40%;
            //}
            //&.phone {
            //  width: 40%;
            //}
            //&.num {
            //  width: 20%;
            //  font-weight: 800;
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
