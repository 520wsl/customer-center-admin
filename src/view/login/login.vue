<template>
  <div>
    <sixiheader title='登录' background="#2E2E2E"></sixiheader>
    <div class="login-title">
      <div><img src="../../assets/sixi_logo.png"></div>
      <h1>欢迎登录四喜服务</h1>
    </div>
    <div class="h5-form">
      <div class="h5-input">
        <input type="tel" placeholder="手机号" class="input" v-model="phone" maxlength="11">
        <div class="code-pic" @click="getVerifycode">获取验证码</div>
      </div>
      <div class="h5-input">
        <input type="text" placeholder="验证码" class="input" v-model="verifycode" maxlength="4">
      </div>
    </div>
    <div class="login-btn">
      <mt-button type="danger" class="login" style="background:#FC7946">登录</mt-button>
      <mt-button type="primary" class="login" style="background:#697EFF">本机号码一键登录</mt-button>
    </div>

  </div>
</template>
<script>
import sixiheader from "@/components/header";
export default {
  data() {
    return {
      phone: "",
      verifycode: ""
    };
  },
  components: {
    sixiheader
  },
  methods: {
    getVerifycode() {
      console.log("获取验证码");
    }
  }
};
</script>
<style scoped>
.h5-form {
  padding: 0 0.3rem;
  margin-top: 0.2rem;
}
.h5-form .h5-input {
  border-bottom: 2px solid #ececec;
  position: relative;
  margin-top: 0.16rem;
}
.h5-form .h5-input input {
  display: block;
  height: 0.84rem;
  width: 100%;
  border: 0 none;
  font-size: 0.32rem;
}
.h5-form .h5-input .code-pic {
  position: absolute;
  font-size: 0.28rem;
  width: 1.64rem;
  height: 0.56rem;
  line-height: 0.56rem;
  text-align: center;
  border: 2px solid #a5b2ff;
  border-radius: 2px;
  bottom: 0.1rem;
  right: 0;
  color: #a6b2fa;
}
.login-btn {
  padding: 0 0.3rem;
  margin-top: 0.4rem;
}
.login {
  margin-bottom: 0.3rem;
  display: block;
  width: 100%;
}
.login-title {
  margin-top: 0.28rem;
  padding: 0 0.3rem;
}
.login-title div img {
  display: block;
  height: 1.04rem;
}
.login-title h1 {
  font-size: 0.36rem;
}
</style>
