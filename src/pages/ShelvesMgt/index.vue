<template>
  <div>
    <div v-for="item in shelvesList">
      {{item.shelfName}}
    </div>
  </div>
</template>

<script>
  import Storage from "@/utils/localStorage"
  import shelvesUrl from "@/Apis/shelves"
  export default {
    data() {
      return {
        pageNum: 1,
        pageSize: 50,
        storeNo: Storage.get('loginInfo').StoreNo,
        shelvesList: []
      }
    },
    onShow() {
      this.getShelves()
    },
    methods: {
      getShelves() {
        let _this = this
        let _params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          storeNo: this.storeNo
        }
        this.$http.post({
          showLoading: true,
          url: shelvesUrl.shelvesList,
          data: {..._params},
          success: function (res) {
            if (res.code === 0) {
              this.shelvesList = res.data && res.data.result && res.data.result.length ? res.data.result : []
            } else {
              // utils.toast(res.msg)
            }
          }
        })
      }
    }
  }
</script>
