<style scoped>
  .page-container {
    width: 100%;
    height: auto;
    background-color: #ffffff;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    padding: 12rpx 20rpx;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
  }

  .scan-wrap {
    padding: 10rpx 10rpx 10rpx 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .scan-icon {
    margin-right: 10rpx;
    width: 44rpx;
    height: 44rpx;
  }

  .row-com {
    flex: 1;
    height: auto;
  }

  .input-wrap {
    height: 72rpx;
    background-color: #F4F4F4;
    border-radius: 10rpx;
    padding-left: 60rpx;
    box-sizing: border-box;
    color: #aaaaaa;
    font-size: 28rpx;
    line-height: 72rpx;
  }

  .search-icon {
    width: 32rpx;
    height: 32rpx;
    position: absolute;
    top: 20rpx;
    left: 20rpx;
  }

  .search-btn {
    color: #fff;
    background: #E66F22;
    line-height: 68rpx;
    padding: 0 14rpx;
    box-sizing: border-box;
    border-radius: 8rpx;
    font-size: 32rpx;
    margin-left: 10rpx;
  }

</style>
<template>
  <div class="page-container">
    <div class="scan-wrap">
      <image class="scan-icon" src="/static/images/scan_photo.png" mode="widthFix" lazy-load="false"></image>
    </div>

    <div class="row-com">
      <div style="position: relative;">
        <image class="search-icon" src="/static/images/search.png" mode="widthFix" lazy-load="false"></image>
        <input type="text" :disabled="disabled" :placeholder="placeholder" class="input-wrap">
      </div>
    </div>
    <div class="search-btn">搜索</div>
  </div>
</template>
<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    methods: {

    }
  }

</script>
