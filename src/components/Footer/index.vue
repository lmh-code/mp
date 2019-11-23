<template>
  <div class="footer-container">
    <div class="mask"></div>
    <div class="options-wrap">
      <div class="opt-com left" v-if="showLeft" @click="leftHandel">{{leftTxt}}</div>
      <div class="opt-com right" v-if="showRight" @click="rightHandel">{{rightTxt}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      showLeft: {
        type: Boolean,
        required: false,
        default: false
      },
      showRight: {
        type: Boolean,
        default: false
      },
      leftTxt: {
        type: String,
        default: ''
      },
      rightTxt: {
        type: String,
        default: ''
      }
    },
    methods: {
      leftHandel () {
        this.$emit("leftBtnHandel")
      },
      rightHandel () {
        this.$emit("rightBtnHandel")
      }
    }
  }
</script>
<style scoped>
  .footer-container {
    width: 100%;
    height: auto;
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .mask {
    width: 100%;
    height: 4rpx;
    background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.05) 100%);
  }
  .options-wrap {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }
  .opt-com {
    flex: 1;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 40rpx;
  }
  .left {
    color: #555555;
    background-color: #ffffff;
  }
  .right {
    background-color: #E66F22;
    color: #ffffff;
  }
</style>