<template>
  <div>
    <sixiheader title='支付结果' :isBack='false'></sixiheader>
    <div class="line"></div>
    <div class="success-body">
      <img src="../../assets/success_icon.png">
      <span>支付成功</span>
      <mt-button class="btn" type='primary'>查看合同</mt-button>
    </div>
  </div>
</template>
<script>
import sixiheader from "@/components/header";
export default {
  data() {
    return {};
  },
  components: { sixiheader },
  methods: {}
};
</script>
<style scoped>
.line {
  background: #f4f4f4;
  height: 10px;
}
.success-body {
  padding: 0 100px;
}
.success-body img {
  display: block;
  width: 120px;
  margin: 52px auto;
}
.success-body span {
  display: block;
  font-size: 34px;
  color: #6e7790;
  text-align: center;
}
.success-body .btn {
  display: block;
  width: 100%;
  font-size: 30px;
  margin-top: 100px;
  height: 70px;
}
</style>
<style>
body,
html {
  height: 100%;
}
</style>
