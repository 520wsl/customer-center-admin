<template>
  <div>
    <sixiheader title="服务评价"></sixiheader>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="(item,index) in list" :key="index">
        <div>
          <img src="">
          <span>{{item.companyName}}</span>
        </div>

      </li>
    </ul>
    <div v-if="loading">加载中...</div>
  </div>
</template>
<script>
import sixiheader from "@/components/header";
export default {
  data() {
    return {
      loading: false,
      list: [],
      params: {
        pageSize: "20",
        pageNum: "1"
      }
    };
  },
  components: { sixiheader },
  methods: {
    loadMore() {
      this.loading = true;
      console.log(1111);
    }
  }
};
</script>
<style scoped>
</style>
<style>
body,
html {
  height: 100%;
  background: #f4f4f4;
}
</style>

