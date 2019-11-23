<template>
  <div class="component-container" v-if="showModel">
    <div class="model-wrap">
      <div class="content-wrap">
        <div class="title">新增货架</div>
        <div class="shelf-name">
          <span>货架名称:</span>
          <input type="text" :value="defaultName" @input="inputChange" :disabled="edit">
        </div>
        <div class="check-wrap" @click="selectHandel">
          <image class="check-icon" :src="selected ? '/static/images/icon_selected.png' : '/static/images/icon_noselected.png'" mode="widthFix" lazy-load="false"></image>
          <span>盘点时带出货架商品</span> 
        </div>
      </div>
      <div class="sp-line"></div>
      <div class="btn-wrap">
        <div class="btn-com cancel-btn" @click="cancelHandel">返回</div>
        <div class="btn-com confirm-btn" @click="confirmHandel">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showModel: {
        type: Boolean,
        default: false
      },
      selected: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      },
      defaultName: {
        type: String,
        default: ''
      }
    },
    methods: {
      cancelHandel () {
        this.$emit("cancelHandel")
      },
      confirmHandel () {
        this.$emit("confirmHandel", {defaultName: this.defaultName, selected: this.selected})
      },
      selectHandel () {
        // this.$emit("selectHandel")
        this.selected = !this.selected
      },
      inputChange (e) {
        this.defaultName = e.target.value
        // this.$emit("inputChange", e)
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
    width: 600rpx;
    height: auto;
    position: absolute;
    left: 50%;
    margin-left: -300rpx;
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
  .shelf-name {
    margin-top: 30rpx;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }
  .shelf-name>span, .check-wrap>span {
    font-size: 28rpx;
    color: #555555;
    letter-spacing: 0;
    text-align: left;
    padding-right: 10rpx;
  }
  .shelf-name>input {
    border: 1px solid #EAEAEA;
    border-radius: 8rpx;
    width: 334rpx;
    height: 82rpx;
    text-align: center;
    font-size: 28rpx;
    color: #222222;
  }
  .check-wrap {
    margin-top: 20rpx;
    display: flex;
    align-items: center;
  }
  .check-icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 10rpx;
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