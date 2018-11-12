<template>
  <div>
    <sixiheader title="线下销售记录"></sixiheader>
    <div class="sale-record">
      <div class="record-company">
        {{companyName}}
        <span>&gt;</span>
      </div>
      <div class="record-month">
        <span class="timeBtn">&lt;</span>
        <span class="month">{{month}}月</span>
        <span class="timeBtn">&gt;</span>
      </div>
      <div class="record-year">{{year}}年</div>
      <div class="record-list-title">
        <span>单量：{{sum}}笔</span>
        <span>金额：¥{{money}}元</span>
      </div>
      <div class="record-list">
        <div class="record-list-item" v-for="(item,index) in recordList" :key="index">
          <div class="time">
            <span>{{item.time}}&nbsp;&nbsp;{{item.weekday}}&nbsp;&nbsp;({{item.isToday}})</span>
            <img :src="$CDN('/edit_logo.png')">
          </div>
          <div class="footer">
            <div>
              单量：
              <span>{{item.sum}}笔</span>
            </div>
            <div>
              金额：
              <span>¥{{item.money}}元</span>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <mt-button class="add" @click="addRecord">增加记录</mt-button>
      </div>
    </div>
    <div class="modal-task" v-if="modal.bool">
      <div class="modal-body">
        <div class="input-item">
          <b>单量：</b>
          <input type="number" v-model="modal.sum">
          <span>笔</span>
        </div>
        <div class="input-item">
          <b>金额：</b>
          <input type="number" v-model="modal.money">
          <span>元</span>
        </div>
        <div class="btn-group mt76">
          <mt-button class="default btn" @click="centerClick">取消</mt-button>
          <mt-button class="primary btn" @click="successClick">确定</mt-button>
        </div>
        <div
          class="modal-footer-line"
          :style="'background-image: url('+$CDN('/moda_bottom_line.png')+')'"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import sixiheader from "@/components/app/header";
export default {
  data() {
    return {
      modal: {
        bool: false,
        sum: "",
        money: ""
      },
      companyName: "杭州假话聚氨酯制品有限公司",
      month: "10",
      year: "2018",
      money: "2000.00",
      sum: "20",
      recordList: [
        {
          time: "10/1",
          weekday: "星期四",
          isToday: "昨天",
          sum: "20",
          money: "2000.00"
        }
      ]
    };
  },
  components: { sixiheader },
  methods: {
    addRecord() {
      this.modal.bool = true;
    },
    centerClick() {
      this.modal.bool = false;
    },
    successClick() {
      this.modal.bool = false;
    }
  }
};
</script>
<style scoped>
/* 按钮 */
.btn-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 74px;
  font-size: 28px;
}
.btn-group .btn {
  width: 240px;
  height: 64px;
}
.btn-group .default {
  border: 1px solid #d9d9d9;
  background: #fff;
  color: #000;
}
.btn-group .primary {
  background: #697eff;
  color: #fff;
}
/* 弹窗 */
.mt76 {
  margin-top: 76px;
}
.modal-task {
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
}
.modal-body {
  position: absolute;
  width: 690px;
  top: 386px;
  left: 30px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.modal-footer-line {
  bottom: 0;
  left: 0;
  position: absolute;
  /*background-image: url("../../assets/image/moda_bottom_line.png");*/
  background-size: 100 6px;
  width: 100%;
  height: 6px;
}
.input-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 98px 0 62px;
  border-bottom: 2px solid #f4f4f4;
  font-size: 30px;
  height: 122px;
}
.input-item b {
  color: #6e7790;
}
.input-item span {
  color: #d9d9d9;
  font-weight: bold;
}
.input-item input {
  border: 0 none;
  height: 60px;
  width: 400px;
  text-align: center;
}
/* 主体 */
.sale-record {
  border-top: 10px solid #f4f4f4;
  padding: 30px 30px 0;
}
.record-company {
  text-align: center;
  font-size: 30px;
  color: #6a9ce4;
  position: relative;
  margin-bottom: 40px;
}
.record-company span {
  position: absolute;
  top: 0;
  right: 100px;
  font-size: 40px;
  transform: rotate(90deg);
  color: #6e7790;
}
.record-month {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 84px;
  margin-bottom: 18px;
}
.record-month .timeBtn {
  color: #6e7790;
}
.record-month .month {
  font-weight: bold;
  color: #444;
  font-size: 60px;
}
.record-year {
  text-align: center;
  font-size: 30px;
  color: #444;
  margin-bottom: 40px;
  font-weight: bold;
}
.record-list-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  color: #fff;
  background: #697eff;
  border: 1px solid #f4f4f4;
  height: 100px;
  padding: 0 42px 0 56px;
}
.record-list-item {
  margin-top: 10px;
  border: 1px solid #f4f4f4;
}
.record-list-item .time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28px;
  color: #6e7790;
  font-weight: bold;
  padding: 0 30px;
  border-bottom: 2px solid #f4f4f4;
  height: 80px;
}
.record-list-item .time img {
  width: 38px;
}
.record-list-item .footer {
  font-size: 30px;
  color: #6e7790;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 42px 0 54px;
  height: 118px;
}
.record-list-item .footer span {
  color: #fc7946;
}
.btn {
  margin: 20px 0 68px;
}
.btn .add {
  height: 80px;
  background: #fc7946;
  color: #fff;
  width: 100%;
  font-size: 30px;
}
</style>
