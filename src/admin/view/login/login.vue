<template>
  <div>
    <div class="login-title">
      <div>
        <img :src="$CDN('/sixi_logo.png')">
      </div>
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

    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			phone: "",
			verifycode: ""
		};
	},
	components: {},
	methods: {
		getVerifycode() {
			console.log("获取验证码");
		}
	}
};
</script>
<style scoped>
.h5-form {
	padding: 0 30px;
	margin-top: 20px;
}
.h5-form .h5-input {
	border-bottom: 2px solid #ececec;
	position: relative;
	margin-top: 16px;
}
.h5-form .h5-input input {
	display: block;
	height: 84px;
	width: 100%;
	border: 0 none;
	font-size: 32px;
}
.h5-form .h5-input .code-pic {
	position: absolute;
	font-size: 28px;
	width: 164px;
	height: 56px;
	line-height: 56px;
	text-align: center;
	border: 2px solid #a5b2ff;
	border-radius: 2px;
	bottom: 10px;
	right: 0;
	color: #a6b2fa;
}
.login-btn {
	padding: 0 30px;
	margin-top: 40px;
}
.login {
	margin-bottom: 30px;
	display: block;
	width: 100%;
	height: 88px;
	font-size: 32px;
}
.login-title {
	margin-top: 28px;
	padding: 0 30px;
}
.login-title div img {
	display: block;
	height: 104px;
}
.login-title h1 {
	font-size: 36px;
}
</style>
