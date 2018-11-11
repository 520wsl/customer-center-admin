<template>
  <div class="personal">
    <sixiheader title="我的" background=""></sixiheader>
    <div class="company" :style="'background-image: url('+$CDN+'/my_company_bg.png'+')'">
      <div class="company-image">
        <img v-if="companyUrl" :src="companyUrl" class="img">
        <div v-else class="default-img"></div>
      </div>
      <div class="company-info">
        <div>{{companyName}}</div>
        <div>{{phone}}</div>
      </div>
      <div class="company-change">切换</div>
    </div>
    <div class="now-sales">
      <div class="now-sales-title">
        <span>本月销售</span>
      </div>
    </div>
    <div class="sales-category">
      <div class="online">
        <span>线上销售</span>
        <b>￥{{sales.onlineSales}}元</b>
        <i>{{sales.onlineNum}}笔</i>
      </div>
      <div class="line"></div>
      <div class="offline">
        <span>线下销售</span>
        <b>￥{{sales.offlineSales}}元</b>
        <i>{{sales.offlineNum}}笔</i>
      </div>
    </div>
    <div class="personal-sale">
      <a class="item" href="#">
        <div>
          <img :src="$CDN+'/sale_record_logo.png'">
          <span>线下销售记录</span>
        </div>
        <span>&gt;</span>
      </a>
    </div>
    <div class="personal-other">
      <a class="item border" href="#">
        <div>
          <img :src="$CDN+'/contract_logo.png'">
          <span>我的合同</span>
        </div>
        <span>&gt;</span>
      </a>
      <a class="item border" href="#">
        <div>
          <img :src="$CDN+'/service_valuation_logo.png'">
          <span>服务评价</span>
        </div>
        <span>&gt;</span>
      </a>
      <a class="item border" href="#">
        <div>
          <img :src="$CDN+'/work_list_logo.png'">
          <span>服务工单</span>
        </div>
        <span>&gt;</span>
      </a>
      <a class="item" href="#">
        <div>
          <img :src="$CDN+'/qustion_logo.png'">
          <span>常见问题</span>
        </div>
        <span>&gt;</span>
      </a>
    </div>
    <div class="login-out">
      <mt-button type="primary" class="btn">退出登录</mt-button>
    </div>
  </div>
</template>
<script>
import sixiheader from "@/components/header";
export default {
  data() {
    return {
      companyUrl: "",
      companyName: "公司公司公司公司公司公司公司公司公司公司公司公司公司公司",
      phone: "123123123",
      sales: {
        onlineSales: "0.00",
        onlineNum: "0",
        offlineSales: "1.00",
        offlineNum: "1"
      }
    };
  },
  components: { sixiheader },
  methods: {}
};
</script>
<style scoped>
.personal {
  background: #f4f4f4;
}
.company {
  /*background: url("../../assets/image/my_company_bg.png");*/
  background-size: 100% 240px;
  height: 240px;
  padding: 0 30px;
  position: relative;
  overflow: hidden;
  display: flex;
}
.company-image {
  margin: 34px 22px 0 0;
  width: 132px;
  height: 132px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  flex: none;
}
.company-image .img {
  display: block;
  width: 12px;
  height: 120px;
  margin: 6px;
  border-radius: 50%;
}
.default-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 6px;
  background: #fff;
}
.company-info {
  margin-top: 50px;
  font-size: 30px;
  color: #fff;
}
.company-change {
  position: absolute;
  bottom: 15px;
  right: 20px;
  font-size: 24px;
  border: 1px solid #fff;
  border-radius: 4px;
  color: #fff;
  width: 120px;
  height: 48px;
  line-height: 48px;
  text-align: center;
}
.now-sales {
  margin-top: 20px;
  padding: 0 30px;
  background: #fff;
  overflow: hidden;
}
.now-sales-title {
  font-size: 28px;
  color: #333;
  border-left: 6px solid #7994ff;
  height: 40px;
  margin: 22px 0;
}
.now-sales-title span {
  padding-left: 24px;
}
.sales-category {
  margin: 1px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
}
.sales-category .online,
.sales-category .offline {
  width: 50%;
  text-align: center;
}
.sales-category .online span,
.sales-category .offline span {
  font-size: 26px;
  display: block;
  padding-top: 22px;
}
.sales-category .online b,
.sales-category .offline b {
  font-size: 30px;
  color: #fc7946;
  font-weight: normal;
  display: block;
  padding-top: 18px;
}
.sales-category .online i,
.sales-category .offline i {
  font-size: 24px;
  color: #999999;
  display: block;
  font-style: normal;
  padding: 18px 0 22px;
}
.sales-category .line {
  width: 2px;
  height: 120px;
  background: #f4f4f4;
}
.personal-sale {
  padding: 0 30px;
  background: #fff;
  margin-bottom: 20px;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  height: 96px;
}
.item div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item div img {
  height: 28px;
}
.item div span {
  padding-left: 20px;
}
.border {
  border-bottom: 2px solid #f7f7f7;
}
.personal-other {
  padding: 0 30px;
  background: #fff;
}
.login-out {
  margin-top: 44px;
  padding: 0 108px 24px;
}
.login-out .btn {
  color: #fff;
  font-size: 32px;
  display: block;
  width: 100%;
  background: #fc7946;
  height: 76px;
}
</style>
<style>
body,
html,
.main,
.personal {
  height: 100%;
  background: #fff;
}
</style>
