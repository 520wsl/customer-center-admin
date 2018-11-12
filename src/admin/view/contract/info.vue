<template>
  <div>
    <sixiheader title="我的合同"></sixiheader>
    <div class="contract-number">合同编号:{{info.contractNumber}}</div>
    <div class="contract-info">
      <h3>合同信息</h3>
      <span>合同类型：</span>
      <span>公司名称：</span>
      <span>阿里账号：</span>
      <span>签订时间：</span>
      <span>合同有效期：</span>
      <span>合同金额：</span>
      <span>业务员：</span>
      <div class="line"></div>
      <h3>团队服务</h3>
      <span>运营组长：</span>
      <span>运营人员：</span>
      <span>店铺设计：</span>
      <span>旺旺客服：</span>
    </div>
    <div class="contract-evaluate">
      <div class="evaluate-item">
        <div class="item-left">
          <img :src="$CDN('/operation_service_logo.png')">
          <span>运营服务评价</span>
        </div>
        <div class="item-right">
          <span>已评价</span>
          <span class="arrow">&gt;</span>
        </div>
      </div>
      <div class="evaluate-item">
        <div class="item-left">
          <img :src="$CDN('/aesthetic_service_logo.png')">
          <span>美工服务评价</span>
        </div>
        <div class="item-right">
          <span>已评价</span>
          <span class="arrow">&gt;</span>
        </div>
      </div>
    </div>
    <div class="contract-btn">
      <mt-button class="xf">续费</mt-button>
      <mt-button class="pay">去支付</mt-button>
    </div>
  </div>
</template>
<script>
import sixiheader from "@/components/header";
export default {
  data() {
    return {
      info: {
        contractNumber: "TBDYY201806231001"
      }
    };
  },
  components: { sixiheader },
  methods: {}
};
</script>
<style scoped>
.contract-number {
  margin-top: 10px;
  background: #fff;
  font-size: 28px;
  color: #444;
  height: 40px;
  line-height: 40px;
  padding: 40px 30px 30px;
}
.contract-info {
  padding: 0 0 0 30px;
  background: #fff;
  margin-top: 20px;
  overflow: hidden;
}
.contract-info h3 {
  height: 32px;
  line-height: 32px;
  color: #444;
  font-size: 30px;
  border-left: 6px solid #697eff;
  margin: 25px 0 35px;
  padding-left: 22px;
}
.contract-info span {
  display: block;
  color: #6e7790;
  font-size: 28px;
  margin-bottom: 20px;
}
.line {
  padding-top: 10px;
  border-bottom: 2px solid #f4f4f4;
}
.contract-evaluate {
  margin-top: 20px;
}
.evaluate-item {
  display: flex;
  height: 100px;
  padding: 0 30px;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin-bottom: 1px;
  font-size: 28px;
}
.item-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.item-left img {
  height: 34px;
}
.item-left span {
  padding-left: 26px;
  color: #2b3854;
}
.item-right {
  display: flex;
  align-items: flex-end;
  font-size: 24px;
}
.item-right .arrow {
  padding-left: 36px;
}
.contract-btn {
  padding: 104px 94px 128px;
  display: flex;
  justify-content: space-between;
}
.contract-btn .xf,
.contract-btn .pay {
  height: 64px;
  width: 240px;
  color: #fff;
  font-size: 28px;
  background: #fc7946;
}
.contract-btn .pay {
  background: #697eff;
}
</style>
<style>
body,
html {
  height: 100%;
  background: #f4f4f4;
}
</style>