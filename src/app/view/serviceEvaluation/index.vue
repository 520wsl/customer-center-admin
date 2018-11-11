<template>
  <div>
    <sixiheader title="服务评价"></sixiheader>
    <ul
      class="evaluation-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li v-for="(item,index) in list" :key="index">
        <div class="company">
          <img :src="$CDN+'/service_evaluation_logo.png'">
          <span>{{item.companyName}}</span>
        </div>
        <span
          class="time"
        >{{item.completeTime}}&nbsp;&nbsp;({{item.isEvaluate=0?'已评价':'待评价'}})&nbsp;&nbsp;&gt;</span>
      </li>
    </ul>
    <div v-if="loading" class="loading">加载中...</div>
  </div>
</template>
<script>
import sixiheader from "@/components/header";
import { formatTime } from "@/libs/util/time";
export default {
  data() {
    return {
      loading: false,
      list: [
        {
          completeTime: formatTime(1541580913000),
          companyName: "四喜",
          isEvaluate: 0
        }
      ],
      params: {
        pageSize: "20",
        pageNum: "1"
      }
    };
  },
  components: { sixiheader },
  methods: {
    loadMore() {
      // this.loading = true;
      // console.log(1111);
    }
  }
};
</script>
<style scoped>
.evaluation-list {
  margin-top: 10px;
  background: #fff;
}
.evaluation-list li {
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #f4f4f4;
  height: 100px;
}
.evaluation-list .company {
  font-size: 26px;
  display: flex;
  align-items: center;
  color: #6e7790;
}
.evaluation-list .company img {
  height: 34px;
  width: 34px;
}
.evaluation-list .company span {
  padding-left: 26px;
}
.evaluation-list .time {
  font-size: 24px;
  color: #929eaa;
}
.loading {
  font-size: 30px;
  text-align: center;
  background: #fff;
  height: 50px;
  line-height: 50px;
}
</style>
<style>
body,
html {
  height: 100%;
  background: #f4f4f4;
}
</style>

