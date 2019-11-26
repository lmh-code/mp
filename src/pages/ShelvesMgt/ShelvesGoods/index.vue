<style>
  .page-container {
    width: 100%;
    height: 100vh;
    background-color: #f2f2f2;
  }
</style>
<template>
  <div class="page-container">
    货架管理 货架
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    onLoad(options) {
      let shelfName = options.shelfName
      mpvue.setNavigationBarTitle({
        title: `货架：${shelfName}`
      })
    },
    methods: {

    }
  }
</script>