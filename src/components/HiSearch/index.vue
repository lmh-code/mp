<style scoped>
  .page-container {
    background-color: #ffffff;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
  }
  .row-com {
    flex: 1;
  }
</style>
<template>
  <div class="page-container">
    <div class="row-com">
      <input type="text" :disabled="disabled" :placeholder="placeholder">
    </div>
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