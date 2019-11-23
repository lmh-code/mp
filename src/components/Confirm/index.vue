<template>
  <div class="component-container" v-if="showModel">
    <div class="model-wrap">
      <div class="content-wrap">
        <div class="title" v-if="showTitle">{{title}}</div>
        <div class="tip-msg" v-if="showTip && tipMsg">{{tipMsg}}</div>
      </div>
      <div class="sp-line"></div>
      <div class="btn-wrap">
        <div class="btn-com cancel-btn" v-if="showCancel" @click="cancelHandel">{{cancelTxt}}</div>
        <div class="btn-com confirm-btn" v-if="showConfirm" @click="confirmHandel">{{confirmTxt}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      // 提示框显示与隐藏
      showModel: {
        type: Boolean,
        default: false
      },
      showCancel: {
        type: Boolean,
        default: true
      },
      cancelTxt: {
        type: String,
        default: '取消'
      },
      showConfirm: {
        type: Boolean,
        default: true
      },
      confirmTxt: {
        type: String,
        default: '确定'
      },
      showTitle: {
        type: Boolean,
        default: false
      },
      // 标题
      title: {
        type: String,
        default: '温馨提示'
      },
      showTip: {
        type: Boolean,
        default: false
      },
      // 提示信息
      tipMsg: {
        type: String,
        default: ''
      }
    },
    methods: {
      cancelHandel () {
        this.$emit("cancelHandel")
      },
      confirmHandel () {
        this.$emit("confirmHandel")
      }
    }
  }
</script>
<style scoped>
  .component-container {
    width: 100%;
    height: 100vh;
    background: rgba(4,4,15,0.60);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .model-wrap {
    width: 550rpx;
    height: auto;
    position: absolute;
    left: 50%;
    margin-left: -275rpx;
    top: 50%;
    margin-top: -50%;
    background-color: #ffffff;
    border-radius: 28rpx;
    line-height: 44rpx;
  }
  .content-wrap {
    padding: 60rpx 50rpx 40rpx;
    box-sizing: border-box;
  }
  .title {
    width: 100%;
    font-size: 36rpx;
    color: #555555;
    letter-spacing: 0;
    text-align: center;
  }
  .tip-msg {
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #555555;
    letter-spacing: 0;
    text-align: left;
  }
  .sp-line {
    width: 100%;
    height: 2rpx;
    background: #F4F4F4;
  }
  .btn-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .btn-com {
    flex: 1;
    text-align: center;
    line-height: 100rpx;
    font-size: 36rpx;
    letter-spacing: 0;
  }
  .cancel-btn {
    color: #aaaaaa;
  }
  .confirm-btn {
    color: #FD6400;
  }
</style>