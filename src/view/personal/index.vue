<template>
  <div class="personal">
    <sixiheader title='我的' background=""></sixiheader>
    <div class="company">
      <div class="company-image">
        <img v-if="companyUrl" :src="companyUrl" class="img">
        <div v-else class="default-img"></div>
      </div>
      <div class="company-info">
        <div>{{companyName}}</div>
        <div>{{phone}}</div>
      </div>
      <div class="company-change">
        切换
      </div>
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
    <div style="padding:0 0.3rem;background:#fff;margin-bottom:0.2rem;">
      <a class="item" href="#">
        <div>
          <img src="../../assets/sale_record_logo.png">
          <span>线下销售记录</span>
        </div>
        <span>&gt;</span>
      </a>
    </div>
    <div class="personal-other">
      <a class="item border" href="#">
        <div>
          <img src="../../assets/contract_logo.png">
          <span>我的合同</span>
        </div>
        <span>&gt;</span>
      </a>
      <a class="item border" href="#">
        <div>
          <img src="../../assets/service_valuation_logo.png">
          <span>服务评价</span>
        </div>
        <span>&gt;</span>
      </a>
      <a class="item border" href="#">
        <div>
          <img src="../../assets/work_list_logo.png">
          <span>服务工单</span>
        </div>
        <span>&gt;</span>
      </a>
      <a class="item" href="#">
        <div>
          <img src="../../assets/qustion_logo.png">
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
  background: url("../../assets/my_company_bg.png");
  background-size: 100% 2.4rem;
  height: 2.4rem;
  padding: 0 0.3rem;
  position: relative;
  overflow: hidden;
  display: flex;
}
.company-image {
  margin: 0.34rem 0.22rem 0 0;
  width: 1.32rem;
  height: 1.32rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  flex: none;
}
.company-image .img {
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0.06rem;
  border-radius: 50%;
}
.default-img {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  margin: 0.06rem;
  background: #fff;
}
.company-info {
  margin-top: 0.5rem;
  font-size: 0.3rem;
  color: #fff;
}
.company-change {
  position: absolute;
  bottom: 0.15rem;
  right: 0.2rem;
  font-size: 0.24rem;
  border: 1px solid #fff;
  border-radius: 4px;
  color: #fff;
  width: 1.2rem;
  height: 0.48rem;
  line-height: 0.48rem;
  text-align: center;
}
.now-sales {
  margin-top: 0.2rem;
  padding: 0 0.3rem;
  background: #fff;
  overflow: hidden;
}
.now-sales-title {
  font-size: 0.28rem;
  color: #333;
  border-left: 4px solid #7994ff;
  height: 0.4rem;
  margin: 0.22rem 0;
}
.now-sales-title span {
  padding-left: 0.24rem;
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
  font-size: 0.26rem;
  display: block;
  padding-top: 0.22rem;
}
.sales-category .online b,
.sales-category .offline b {
  font-size: 0.3rem;
  color: #fc7946;
  font-weight: normal;
  display: block;
  padding-top: 0.18rem;
}
.sales-category .online i,
.sales-category .offline i {
  font-size: 0.24rem;
  color: #999999;
  display: block;
  font-style: normal;
  padding: 0.18rem 0 0.22rem;
}
.sales-category .line {
  width: 2px;
  height: 1.2rem;
  background: #f4f4f4;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.28rem;
  height: 0.96rem;
}
.item div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item div img {
  height: 0.28rem;
}
.item div span {
  padding-left: 0.2rem;
}
.border {
  border-bottom: 2px solid #f7f7f7;
}
.personal-other {
  padding: 0 0.3rem;
  background: #fff;
}
.login-out {
  margin-top: 0.44rem;
  padding: 0 1.08rem 0.24rem;
}
.login-out .btn {
  color: #fff;
  font-size: 0.32rem;
  display: block;
  width: 100%;
  background: #fc7946;
}
</style>
