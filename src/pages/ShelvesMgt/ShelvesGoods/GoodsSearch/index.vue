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
    <hi-search-view placeholder="请输入商品名称或编码" showScan="true" @doSearchHandel="doSearchHandel"></hi-search-view>
    <div>
      adfadsasdfsda
    </div>
  </div>
</template>
<script>
  import Storage from "@/utils/localStorage"
  import utils from "@/utils/utils"
  import HiSearch from "@/components/HiSearch"
  import shelvesUrl from "@/Api/shelves"
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
    },
    methods: {
      doSearchHandel(params) {
        let _this = this
        let queryStr = params
        if (!queryStr) return
        let _params = {
          businessType: 1,
          pageSize: -1,
          pageNum: 1,
          searchValue: queryStr,
          storeNo: this.storeNo
        }
        this.$http.post({
          showLoading: true,
          url: shelvesUrl.storeGoodsPageList,
          data: {
            ..._params
          },
          success: function (res) {
            if (res.code === 0) {
              
              return
            } else {
              utils.toast(res.msg, "none")
            }
          }
        })
        console.log("params:", params)
      }
    }
  }
</script>