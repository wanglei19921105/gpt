<template>
  <view>
    <button
      type="default"
      :style="btnStyle"
      class="get_code border-color-main color-main"
      @tap="getCode"
    >
      {{ tips }}
    </button>
    <u-toast ref="uToast"></u-toast>
    <!-- 获取验证码 -->
    <u-verification-code
      :seconds="seconds"
      @end="end"
      @start="start"
      ref="uCode"
      @change="codeChange"
      :keep-running="true"
      :unique-key="uniquekey"
      :start-text="i18n.register5"
    >
    </u-verification-code>
    <u-loading class="uloading" mode="circle" :show="show"></u-loading>
    <u-popup
      v-model="show1"
      mode="center"
      border-radius="20"
      width="690rpx"
      height=""
    >
      <view class="text-center padding-32 card-bg">
        <image :src="img" mode="" style="width: 480rpx; height: 144rpx"></image>
        <!-- <image src="../static/images/box2.png" mode=""></image> -->
        <view class="padding-32">
          <input
            type="text"
            name=""
            id=""
            v-model="sum"
            style="
              height: 50rpx;
              font-size: 50rpx;
              border-bottom: 1rpx solid #666;
              letter-spacing: 20rpx;
            "
          />
        </view>
        <u-button @click="go" class="sumbtn color-main card-bg">提交</u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  name: "countdownYellow",
  props: {
    placeholder: {
      type: String,
      default: () => {
        return "请输入您的验证码";
      },
    },
    uniquekey: {
      type: String,
      default: () => {
        return "";
      },
    },
    phone: {
      type: String,
      default: () => {
        return "";
      },
    },
    type: {
      type: String,
      default: () => {
        return "";
      },
    },
    countryCode: {
      type: String,
      default: () => {
        return "";
      },
    },
    btnStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    bindPhone: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
  data() {
    return {
      tips: "",
      seconds: 60,
      params: {
        phone: "",
        type: "",
        country_code: "",
      },
      show: false,
      show1: false,
      img: "",
      sum: "",
      sumkey: "",
    };
  },
  watch: {
    phone(newval) {
      this.params.phone = newval;
    },
  },
  mounted() {
    this.params.type = this.type;
    this.params.country_code = "+" + this.countryCode;
    this.params.phone = this.phone;
  },
  methods: {
    codeChange(text) {
      this.tips = text;
    },
    go() {
      this.$u.api
        .send_code({
          phone: this.params.phone,
          type: this.params.type,
          // captcha: this.sum,
          captcha: "",
          key: this.sumkey,
          country_code: "+" + this.$store.state.areacode,
        })
        .then((res) => {
          // this.show1 = false
          this.show = true;
          if (res.code == 200) {
            setTimeout(() => {
              uni.hideLoading();
              this.show = false;
              this.show1 = false;
              this.$u.toast(this.i18n.register12);
              this.$refs.uCode.start();
            }, 2000);
          }
        });
      setTimeout(() => {
        uni.hideLoading();
        this.show = false;
        this.show1 = false;
      }, 2000);
    },
    getCode() {
      if (!this.params.phone) {
        // 请输入手机号
        this.bindPhone != 1
          ? this.$u.toast(this.i18n.register11)
          : this.$u.toast("请输入手机号");
        return false;
      }
      if (this.bindPhone == 1 && !this.$u.test.mobile(this.params.phone)) {
        this.$u.toast("请填写正确的手机号");
        return false;
      }
      if (this.$refs.uCode.canGetCode) {
        this.$u.api
          .send_code({
            phone: this.params.phone,
            type: this.params.type,
            // captcha: this.sum,
            captcha: "",
            key: this.sumkey,
            country_code: "+" + this.$store.state.areacode,
          })
          .then((res) => {
            // this.show1 = false
            this.show = true;
            if (res.code == 200) {
              setTimeout(() => {
                uni.hideLoading();
                this.show = false;
                // this.show1 = false;
                this.$u.toast(this.i18n.register12);
                this.$refs.uCode.start();
              }, 2000);
            }
          });
      } else {
        // 倒计时结束后再发送
        this.$u.toast(this.i18n.register12);
      }
    },
    end() {
      // this.$u.toast('倒计时结束');
    },
    start() {
      // this.$u.toast('倒计时开始');
    },
  },
};
</script>

<style lang="scss" scoped>
.get_code {
  height: 88rpx;
  line-height: 88rpx;
  // background-color: #fff;
  // border: 1px solid;
  text-align: center !important;
  margin-left: 30rpx;
  flex: 1;
  font-size: 28rpx;
  // color: #2D3746 !important;
  border-radius: 50rpx;
}

uni-button:after {
  border: none;
}

.uloading {
  position: absolute;
  left: 50%;
  top: 50%;
}
.sumbtn {
  // background-color: #E6BB81;
}
</style>
