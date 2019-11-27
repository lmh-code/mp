<style scoped>
  .page-container {
    width: 100%;
    min-height: 100vh;
    height: auto;
    background-color: #f2f2f2;
  }
</style>
<template>
  <div class="page-container">
    <hi-search-view placeholder="请输入商品名称或编码" showScan="true"></hi-search-view>
    <div>
      adfadsasdfsda
    </div>
  </div>
</template>
<script>
  import Storage from "@/utils/localStorage"
  import utils from "@/utils/utils"
  import HiSearch from "@/components/HiSearch"
  export default {
    data () {
      return {
        storeNo: Storage.get('loginInfo').StoreNo
      }
    },
    onShow() {
      this.storeNo = Storage.get('loginInfo').StoreNo
    },
    components: {
      "hi-search-view": HiSearch
    }
  }
</script>