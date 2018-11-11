<template>
  <div>
    <sixiheader title='我的合同'></sixiheader>
    <div class="contract-list">
      <div class="contract-item" v-for="(item,index) in contractList" :key="index">
        <div class="contract-title">
          <h3>{{item.contractName}}</h3>
          <h4>合同编号：{{item.contractNumber}}</h4>
          <span>待生效</span>
        </div>
        <div class="contract-content clearfix">
          <span>签订时间：{{item.createdTime}}</span>
          <span>合同有效期：{{item.startTime}}至{{item.endTime}}</span>
          <span>合同金额：¥{{item.money}}</span>
        </div>
        <div class="contract-btn">
          <mt-button class="detail">查看详情</mt-button>
          <mt-button class="xf">续费</mt-button>
          <mt-button class="pay">去支付</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sixiheader from "@/components/header";
export default {
  data() {
    return {
      contractList: [
        {
          contractName: "zhongwenalituoguan",
          contractNumber: "TBDYY201806231001",
          createdTime: "2018-208-09",
          startTime: "2018-08-16",
          endTime: "2018-08-15",
          money: "2800.00"
        },
        {
          contractName: "zhongwenalituoguan",
          contractNumber: "TBDYY201806231001",
          createdTime: "2018-208-09",
          startTime: "2018-08-16",
          endTime: "2018-08-15",
          money: "2800.00"
        }
      ]
    };
  },
  components: { sixiheader },
  methods: {}
};
</script>
<style scoped>
h3,
h4 {
  margin: 0;
}
.contract-list {
  margin-top: 10px;
}
.contract-item {
  background: #fff;
  padding-left: 30px;
  margin-bottom: 20px;
}

.contract-title {
  border-bottom: 2px solid #f4f4f4;
  padding: 30px 0;
  color: #444;
  position: relative;
}
.contract-title span {
  position: absolute;
  font-size: 28px;
  right: 30px;
  bottom: 80px;
  color: #697eff;
}
.contract-title h3 {
  font-size: 30px;
  margin-bottom: 20px;
  height: 42px;
  line-height: 42px;
}
.contract-title h4 {
  font-size: 28px;
  height: 40px;
  line-height: 40px;
  font-weight: normal;
}
.contract-content {
  color: #6e7790;
  font-size: 28px;
  padding: 42px 0 40px;
}
.contract-content span {
  display: block;
  margin-bottom: 20px;
}
.contract-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 30px 30px 0;
}
.contract-btn .detail,
.contract-btn .xf,
.contract-btn .pay {
  font-size: 26px;
  margin-left: 24px;
  height: 52px;
}
.contract-btn .pay {
  background: #697eff;
  color: #fff;
  width: 136px;
}
.contract-btn .xf {
  background: #fc7946;
  width: 136px;
  color: #fff;
}
.contract-btn .detail {
  background: 0 none;
  border: 1px solid #d0d0d0;
}
</style>
<style>
body,
html {
  height: 100%;
  background: #f4f4f4;
}
</style>