<style>
  .empty-wrap {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-icon {
    width: 280rpx;
    height: 280rpx;
    margin-top: -100rpx;
  }

</style>
<template>
  <div class="empty-wrap">
    <image class="empty-icon" src="/static/images/empty.png" mode="widthFix" lazy-load="false"></image>
  </div>
</template>
