<template>
  <div>
    <sixiheader title="服务工单" class="top"></sixiheader>
    <div class="servicebill">
      <h3>显示工单类型如店铺美化问题</h3>
      <p class="BillId">工单编号：
        <b>TBDYY201806231001</b>
      </p>
      <ul class="item">
        <li>工单创建时间：2018-08-09</li>
        <li>持续时间：30h</li>
        <li>客服人员：李某某</li>
      </ul>
      <p class="status">
        <span>状态：处理中</span>
        <mt-button class="btn">评价</mt-button>
      </p>
    </div>

    <div class="servicebill">
      <h3>显示工单类型如店铺美化问题</h3>
      <p class="BillId">工单编号：
        <b>TBDYY201806231001</b>
      </p>
      <ul class="item">
        <li>工单创建时间：2018-08-09</li>
        <li>持续时间：30h</li>
        <li>客服人员：李某某</li>
      </ul>
      <p class="status">
        <span>状态：处理中</span>
        <mt-button class="btn">评价</mt-button>
      </p>
    </div>
  </div>
</template>
<script>
import sixiheader from "@/components/header.vue";
export default {
  components: { sixiheader },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.top {
  margin-bottom: 10px;
}
.servicebill {
  padding-top: 20px;
  padding-left: 20px;
  background: #fff;
  color: #6e7790;
  margin-bottom: 20px;
  h3 {
    font-size: 30px;
    margin: 10px 0;
  }
  .BillId {
    font-size: 28px;
    padding-bottom: 52px;
    b {
      color: #170000;
    }
  }
  .item {
    font-size: 28px;
    margin-bottom: 20px;
    overflow: hidden;
    li {
      padding-bottom: 20px;
    }
  }
  .status {
    display: flex;
    overflow: hidden;
    height: 100px;
    font-size: 28px;
    border-top: 1px solid #f4f4f4;
    align-items: center;
    span {
      flex: 1;
    }
    .btn {
      margin-right: 52px;
      width: 136px;
      height: 52px;
    }
  }
}
</style>

