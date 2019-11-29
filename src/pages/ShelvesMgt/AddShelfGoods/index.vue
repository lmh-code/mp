<template>
  <div class="component-container" v-if="showModel">
    <div class="model-wrap">
      <div class="content-wrap">
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-msg">
          <span>商品编码: {{goodsNo}}</span><span>商品条码: {{barCode}}</span>
        </div>
      </div>
      <div class="sp-line"></div>
      <div class="btn-wrap">
        <div class="btn-com cancel-btn" @click="cancelHandel">{{cancelTxt}}</div>
        <div class="btn-com confirm-btn" @click="confirmHandel">{{confirmTxt}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '@/utils/utils'
  export default {
    props: {
      showModel: {
        type: Boolean,
        default: false
      },
      goodsName: {
        type: String,
        default: ''
      },
      fromList: {
        type: Boolean,
        default: true
      },
      goodsNo: {
        type: String,
        default: ''
      },
      barCode: {
        type: String,
        default: ''
      },
      cancelTxt: {
        type: String,
        default: '取消'
      },
      confirmTxt: {
        type: String,
        default: '确定'
      }
    },
    methods: {
      cancelHandel() {
        this.$emit("cancelHandel")
      },
      confirmHandel() {
        this.$emit("confirmHandel", {
          fromList: this.fromList,
          goodsNo: this.goodsNo,
          goodsName: this.goodsName,
          barCode: this.barCode
        })
      }
    }
  }

</script>
<style scoped>
  .component-container {
    width: 100%;
    height: 100vh;
    background: rgba(4, 4, 15, 0.60);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }

  .model-wrap {
    width: 600rpx;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: #ffffff;
    border-radius: 28rpx;
    line-height: 44rpx;
    transform: translate(-50%, -60%);
  }

  .content-wrap {
    padding: 60rpx 50rpx 40rpx;
    box-sizing: border-box;
  }

  .goods-name {
    width: 100%;
    font-size: 36rpx;
    color: #555555;
    letter-spacing: 0;
    text-align: center;
  }

  .goods-msg {
    margin-top: 30rpx;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .goods-msg>span,
  .goods-msg>span {
    font-size: 28rpx;
    color: #555555;
    letter-spacing: 0;
    text-align: left;
    padding-right: 10rpx;
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
