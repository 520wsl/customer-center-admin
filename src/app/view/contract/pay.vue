<template>
  <div>
    <!-- <sixiheader title="确认支付"></sixiheader> -->
    <div class="contract-number">合同编号:{{info.contractNumber}}</div>
    <div class="contract-info">
      <h3>付款信息</h3>
      <span>付款情况：</span>
      <span>合同金额：</span>
      <span>优惠金额：</span>
      <span>银付金额：</span>
      <div class="line"></div>
      <h3>账户余额：</h3>
      <div class="line"></div>
      <h3>剩余金额：</h3>
      <div @click="setPaytype(1)" class="pay-item space-between">
        <div class="icon-big">
          <img :src="$CDN('/icon-pay-wx.png')" alt="微信支付">
        </div>
        <div :class="payType == 1? 'fontcolor':''" style="flex: 1;text-indent:30px;">微信支付</div>
        <div v-show="payType==1" class="icon-min">
          <img :src="$CDN('/icon-pay-active.png')">
        </div>
        <div v-show="payType!=1" class="icon-min">
          <img :src="$CDN('/icon-pay-default.png')">
        </div>
      </div>
      <div @click="setPaytype(2)" class="pay-item space-between">
        <div class="icon-big">
          <img :src="$CDN('/icon-pay-zf.png')" alt="支付宝支付">
        </div>
        <div :class="payType == 2? 'fontcolor':''" style="flex: 1;text-indent:30px;">支付宝支付</div>
        <div v-show="payType==2" class="icon-min">
          <img :src="$CDN('/icon-pay-active.png')">
        </div>
        <div v-show="payType!=2" class="icon-min">
          <img :src="$CDN('/icon-pay-default.png')">
        </div>
      </div>
    </div>
    <div class="pay-btn">
      <mt-button type="primary" class="btn">确认支付</mt-button>
    </div>
  </div>
</template>
<script>
// import sixiheader from "@/components/app/header";
import { randomPath } from "@/libs/tools";
export default {
  data() {
    return {
      randomPath: randomPath(""),
      payType: 1,
      info: {
        contractNumber: "TBDYY201806231001"
      }
    };
  },
  created() {
    this.$parent.$parent.setTitle("确认支付");
  },
  // components: { sixiheader },
  methods: {
    setPaytype(type) {
      this.payType = type;
    }
  }
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
.pay-item {
  border-bottom: 1px solid #f4f4f4;
  padding: 15px 42px 15px 0;
  line-height: 45px;
  font-size: 26px;
  display: flex;
  justify-content: space-between;
  color: #5a5a5a;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.icon-big,
.icon-big img {
  width: 45px;
  height: 45px;
}
.icon-min,
.icon-min img {
  width: 30px;
  height: 30px;
}
.pay-btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 0 30px 0 30px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.pay-btn .btn {
  display: block;
  width: 100%;
  height: 70px;
}
</style>
<style>
body,
html {
  height: 100%;
  background: #f4f4f4;
}
</style>