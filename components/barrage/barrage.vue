<template>
  <view class="bullet-wrap">
    <!-- :class="{ 'bullet-item--c': item.isLoginUser }" -->
    <view
      class="bullet-item bullet-animation"
      v-for="item in bulletlist"
      @animationend="animationend"
      :key="getUUID()"
    >
      {{ item.user.nickname }}
    </view>
  </view>
</template>

<script>
export default {
  name: "barrage",
  data() {
    return {
      // list: [
      //     {id: this.getUUID(), name: 'www.lilnong.top', isLoginUser: true, line: 0},
      //     {id: this.getUUID(), name: '微信搜一搜:前端linong', isLoginUser: true, line: 0},
      //     {id: this.getUUID(), name: 'Vue 实现弹幕效果', isLoginUser: true, line: 0},
      //     {id: this.getUUID(), name: '小帅哥快来玩呀1', isLoginUser: false, line: 0},
      //     {id: this.getUUID(), name: '小帅哥快来玩呀2', isLoginUser: false, line: 0},
      //     {id: this.getUUID(), name: '小帅哥快来玩呀3', isLoginUser: false, line: 0},
      //     {id: this.getUUID(), name: '小帅哥快来玩呀4', isLoginUser: false, line: 0},
      //     {id: this.getUUID(), name: '小帅哥快来玩呀5', isLoginUser: false, line: 0},
      //     {id: this.getUUID(), name: '小帅哥快来玩呀6', isLoginUser: false, line: 0}
      // ], // 普通的弹幕队列
      clist: [], // c位的弹幕队列
      bulletlist: [], // 当前正在执行的
      value: "",
      idx: 3,
    };
  },
  props: ['list'],
  mounted() {
    setInterval(() => {
      var item = null;
      if (this.idx == 3) {
        // c 位
        item = this.clist.shift();
      }
      if (!item) {
        console.log(this.list.shift());
        item = this.list.shift();
      }
      if (item) {
        item.line = this.idx;
        this.idx = (this.idx % 5) + 1;
        this.bulletlist.push(item);
      } else {
        if (this.clist.length) {
          item = this.clist.shift();
          item.line = 3;
          this.idx = 3;
          this.bulletlist.push(item);
        }
      }
    }, 1000);
  },
  methods: {
    animationend() {
      console.log('animationend');
      console.log(this.list);
      this.list.push(this.bulletlist.shift())
    },
    getUUID() {
      return Date.now() + Math.random();
    }
  },
}
</script>
<style lang="scss">
.bullet-wrap {
  height: 400px;
  position: relative;
  overflow: hidden;
  font-size: 36px;
  background: url(https://www.lilnong.top/static/img/Desert.jpg) center center
    no-repeat;
  background-size: cover;
}
.bullet-item {
  text-shadow: 1px 1px #000;
  color: #ffffff82;
  white-space: nowrap;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
}
.bullet-item--c {
  border: 1px solid #ff000082;
}
.bullet-item[data-line="1"] {
  top: 0px;
}
.bullet-item[data-line="2"] {
  top: 80px;
}
.bullet-item[data-line="3"] {
  top: 160px;
}
.bullet-item[data-line="4"] {
  top: 240px;
}
.bullet-item[data-line="5"] {
  top: 320px;
}
.bullet-animation {
  animation: right2left 7s linear both;
}

@keyframes right2left {
  0% {
    transform: translate(100vw);
  }
  100% {
    transform: translate(-100%);
  }
}
</style>
