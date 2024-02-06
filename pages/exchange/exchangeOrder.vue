<template>
  <view class="page" :class="getThemeClass">
    <unavbar :isback="false" class="my-nav-ber-a-box mallunavbar">
      <tabs :list="seriesList" :current="tabCenter" @click="change"></tabs>
      <u-icon
        name="arrow-left"
        color="#FFFFFF"
        size="40"
        @click="goBark"
      ></u-icon>
    </unavbar>
    <!-- 交易订单 -->
    <view v-if="tabCenter == 0">
      <view style="height:120rpx"></view>
      <!-- tab -->
      <view class="coll-head">
        <u-tabs
          :list="types1"
          name="title"
          :is-scroll="true"
          :current="orderCurrent1"
          height="70"
          :show-bar="false"
          font-size="24"
          @change="orderChange1"
          active-color="#FFFFFF"
          inactive-color="#A4A6AC"
          bg-color="transparent"
          :active-item-style="activeStyle"
        ></u-tabs>
      </view>
      <!-- 列表 -->
      <view class="tradOrder">
        <view class="tradOrder-list" v-for="item in list" :key="item.id">
          <view class="list-text">
            <view class="text-name">商户名称</view>
            <view class="text-argument">{{item.name}}</view>
          </view>
          <view class="list-text">
            <view class="text-name">单价</view>
            <view class="text-argument">￥{{item.unit}}/USDT</view>
          </view>
          <view class="list-text">
            <view class="text-name">购买数量</view>
            <view class="text-argument">{{item.num}}USDT</view>
          </view>
          <view class="list-text">
            <view class="text-name">订单编号</view>
            <view class="text-argument">{{item.out_trade_no}}</view>
          </view>
          <view class="flex justify-between align-center u-p-t-20" v-if="item.order_status == 1">
            <view class="size-26" style="color: #2283EC;text-decoration: underline;" @click="lookProof(item.pic)">查看支付凭证</view>
            <view class="flex justify-between align-center">
              <view class="list-btn" style="background: #262626;" @click="telephoneMer(item.phone)">联系商户</view>
              <view class="list-btn u-m-l-10" style="background: #262626;">等待确认</view>
            </view>
          </view>
          <view class="flex justify-between align-center u-p-t-20" v-if="item.order_status == 3">
            <view class="size-26" style="color: #2283EC;text-decoration: underline;" @click="lookProof(item.pic)">查看支付凭证</view>
            <view class="list-btn" style="background: #262626;">已完成</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 出售挂单 -->
    <view v-if="tabCenter == 1">
      <view style="height:120rpx"></view>
      <view class="coll-head">
        <u-tabs
          :list="types2"
          name="title"
          :is-scroll="true"
          :current="orderCurrent2"
          height="70"
          :show-bar="false"
          font-size="24"
          @change="orderChange2"
          active-color="#FFFFFF"
          inactive-color="#A4A6AC"
          bg-color="transparent"
          :active-item-style="activeStyle"
        ></u-tabs>
      </view>
      <view class="tradOrder">
        <view class="tradOrder-list" v-for="item in list1" :key="item.id">
          <view class="list-text" v-if="item.type == 0">
            <view class="text-name">商户名称</view>
            <view class="text-argument">{{item.name}}</view>
          </view>
          <view class="list-text" v-else>
            <view class="text-name">买家</view>
            <view class="text-argument">{{item.user_name}}</view>
          </view>
          <view class="list-text" v-if="item.type == 1">
            <view class="text-name">单价</view>
            <view class="text-argument">￥{{item.unit}}/USDT</view>
          </view>
          <view class="list-text">
            <view class="text-name">{{item.type == 1?'购买数量':'出售数量'}}</view>
            <view class="text-argument">{{item.num}}USDT</view>
          </view>
          <view class="list-text" v-if="item.type == 0">
            <view class="text-name">预计获得</view>
            <view class="text-argument">{{item.expected_gain}}</view>
          </view>
          <view class="list-text" v-if="item.type == 0 && item.order_status == 0">
            <view class="text-name">出售剩余数量</view>
            <view class="text-argument">{{item.surplus_num}}</view>
          </view>
          <view class="list-text" v-if="item.type == 1">
            <view class="text-name">订单编号</view>
            <view class="text-argument">{{item.out_trade_no}}</view>
          </view>
          <view class="flex justify-end u-p-t-20" v-if="item.type == 0 && item.order_status == 0">
            <view class="list-btn" @click="delist(item.id)">下架</view>
          </view>
          <view class="flex justify-between align-center u-p-t-20" v-if="item.type == 1 && item.order_status == 1">
            <view class="size-26" style="color: #2283EC;text-decoration: underline;" @click="lookProof(item.pic)">查看支付凭证</view>
            <view class="list-btn" @click="confirmOrder(item.id)">确认订单</view>
          </view>
          <view class="flex justify-between align-center u-p-t-20" v-if="item.type == 1 && item.order_status == 3">
            <view class="size-26" style="color: #2283EC;text-decoration: underline;" @click="lookProof(item.pic)">查看支付凭证</view>
            <view class="list-btn" style="background: #262626;">已完成</view>
          </view>
        </view>
      </view>
    </view>
    <u-popup v-model="payshow" mode="center" border-radius="20">
      <view>
        <image :src="payshow_img" mode="aspectFit"/>
      </view>
    </u-popup>
    <u-popup v-model="phoneMer" mode="center" border-radius="20">
      <view class="phoneMer">
        <view>手机号</view>
        <view>{{phoneMer_num}}</view>
        <view @click="copy(phoneMer_num)">复制</view>
      </view>
    </u-popup>
		<u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      payshow:false,
      payshow_img:'',
      phoneMer:false,
      phoneMer_num:'',
      seriesList: [
        {
          id: 0,
          title: "交易订单",
        },
        {
          id: 1,
          title: "出售挂单",
        },
      ],
      activeStyle: {
        background: "#2283EC",
      },
      tabCenter: 0, //0交易订单  1出售挂单
      orderCurrent1: 0, //交易订单的index
      orderCurrent2:0,  //出售挂单的index
      types1: [ //交易订单
        {
          title: "全部",
        },
        {
          title: "进行中",
        },
        {
          title: "已完成",
        },
      ],
      types2: [ //出售挂单
        {
          title: "全部",
        },
        {
          title: "挂单中",
        },
        {
          title: "已售罄",
        },
        {
          title: "待确认",
        },
        {
          title: "已完成",
        },
      ],
      page:1,
      page1:1,
      list:[],
      list1:[],
    };
  },
  onLoad() {
    this.loadData(true);
  },
  onReachBottom() {
    if (this.listStatus === "loadmore") {
      if (this.tabCenter == 0) {
        this.page++
        this.loadData(true);
      } else {
        this.page1++
        this.loadData1(true);
      }
    }
  },
  methods: {
    loadData(flag){
      if(flag)this.page=1,this.list=[]
      this.$u.api.Trading_trade_order({
          type:this.orderCurrent1,
          page: this.page,
        }).then(res => {
        if (res.code == 200) {
          this.list = flag? res.data.list.data:this.list.concat(res.data.list.data);
          this.loadStatus = res.data.list.next_page_url?'more':'noMore'
        }
      })
    },
    loadData1(flag){
      if(flag)this.page=1,this.list1=[]
      this.$u.api.Trading_sell_order({
          type:this.orderCurrent2,
          page: this.page1,
        }).then(res => {
        if (res.code == 200) {
          this.list1 = flag? res.data.list.data:this.list.concat(res.data.list.data);
          this.loadStatus1 = res.data.list.next_page_url?'more':'noMore'
        }
      })
    },
    change(index) {
      this.tabCenter = index;
      if (this.tabCenter == 0) {
        this.loadData(true);
      } else {
        this.loadData1(true);
      }
    },
    delist(id){
      uni.showModal({
        content: '确定要下架么？',
        success:  (res) => {
          if (res.confirm) {
            this.$u.api.Trading_sell_down({
                id
              }).then(res => {
              if (res.code == 200) {
                this.$refs.uToast.show({
                  title: "下架成功",
                  type: 'success',
                  callback:()=>{
                    this.loadData1(true);
                  }
                });
              }
            })
          } else if (res.cancel) {
          }
        }
      });
    },
    confirmOrder(id){
      uni.showModal({
        content: '是否确认订单？',
        success:  (res) => {
          if (res.confirm) {
            this.$u.api.Trading_confirm({
                id
              }).then(res => {
              if (res.code == 200) {
                this.$refs.uToast.show({
                  title: "确认成功",
                  type: 'success',
                  callback:()=>{
                    this.loadData(true);
                  }
                });
              }
            })
          } else if (res.cancel) {
          }
        }
      });
    },
    lookProof(pic){
      this.payshow_img = pic
      console.log(this.payshow_img,'this.payshow_img');
      if (this.payshow_img) {
        this.payshow = true
      }
    },
    telephoneMer(num){
      console.log(num);
      this.phoneMer_num = num
      if (this.phoneMer_num) {
        this.phoneMer = true
      }
    },
    goBark() {
      uni.navigateBack();
    },
    orderChange1(index) {
      this.orderCurrent1 = index;
      this.loadData(true);
    },
    orderChange2(index) {
      this.orderCurrent2 = index;
      this.loadData1(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.mallunavbar {
}
::v-deep .coll-head {
  width: 100%;
  position: fixed;
  top: calc(44px + var(--status-bar-height));
  left: 0;
  background-color: #000000;
  padding-top: 30rpx;
  padding-left: 28rpx;
  z-index: 10;
  .u-tabs {
    border-radius: 32rpx;
    .u-tab-item {
      width: 128rpx;
      height: 64rpx;
      margin: 0 15rpx;
      border-radius: 32rpx;
      background: #1e1e1e;
    }
  }
}
.tradOrder{
  padding: 0 30rpx;
  // padding-top: 64rpx;
  .tradOrder-list{
    border-radius: 24rpx;
    padding: 30rpx;
    background: #1E1E1E;
    margin-bottom: 24rpx;
    .list-text{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 25rpx;
      .text-name{
        font-size: 26rpx;
        color: #A5A5A5;
      }
      .text-argument{
        font-size: 26rpx;
      }
    }
    .list-btn{
      width: 156rpx;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      border-radius: 32rpx;
      font-size: 24rpx;
      background: #2283EC;
    }
  }
}
.phoneMer{
  width: 300rpx;
  height: 200rpx;
  line-height: 60rpx;
  border-radius: 20rpx;
  color: #000;
  text-align: center;
  
}
</style>