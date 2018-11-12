<template>
  <div>
    <sixiheader title='我的公司'></sixiheader>
    <div class="complany-list">
      <div v-for="(item,index) in companyList" :key="index" class="company-item">
        <span>{{item.companyName}}</span>
        <span>&gt;</span>
      </div>
    </div>
  </div>
</template>
<script>
import sixiheader from "@/components/app/header";
export default {
  data() {
    return {
      companyList: [
        { companyName: "123" },
        { companyName: "123" },
        { companyName: "123" }
      ]
    };
  },
  components: { sixiheader },
  methods: {}
};
</script>
<style scoped>
.complany-list {
  margin-top: 10px;
}
.company-item {
  font-size: 26px;
  padding: 0 30px;
  color: #6e7790;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  background: #fff;
  line-height: 100px;
  height: 100px;
}
</style>
<style>
body,
html {
  height: 100%;
  background: #f4f4f4;
}
</style>
