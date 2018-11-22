<template>
  <div class="login" :style="'background-image: url('+$CDN('/login-bg.png')+')'">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con" v-if="false">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
        <div id="wx_reg"></div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/admin/login-form";
import { mapActions } from "vuex";
import { sentLoginCodeData } from "@/api/admin/user/user";
import "./index.js";
export default {
	components: {
		LoginForm
	},
	methods: {
		...mapActions(["handleLogin", "getUserInfo", "updatedSixiId"]),
		// 账号密码登陆流程，暂时没有
		handleSubmit({ userName, password, type }) {
			this.handleLogin({ userName, password, type }).then(res => {
				this.getUserInfo().then(res => {
					this.$router.push({
						name: this.$config.homeName
					});
				});
			});
		},
		/// 微信 登录相关 API 环境校验
		WwLogin() {
			window.WwLogin({
				id: this.EWCConfig.id,
				appid: this.EWCConfig.appid,
				agentid: this.EWCConfig.agentid,
				redirect_uri: this.EWCConfig.redirect_uri,
				state: this.EWCConfig.state
			});
		},
		// 获取用户信息
		getUserInfoAction() {
			let userInfoRes = this.getUserInfo();

			if (userInfoRes.status !== 200) {
				this.$Modal.error({
					title: "获取用户信息",
					content: userInfoRes.msg
				});
				return;
			}
		},
		// 登录成功后 跳到默认页面
		skipToDefaultPage(name) {
			name = name || this.$config.homeName;
			this.$router.push({
				name
			});
		},
		// 扫码登录回调处理
		async sentLoginCode() {
			let code = this.code;
			let res = await sentLoginCodeData({ code });

			if (res.status !== 200) {
				this.$Modal.error({
					title: "企业微信扫码",
					content: res.msg
				});
				return;
			}
			this.updatedSixiId({ sixiId: res.data });
			this.getUserInfoAction();
		}
	},
	data() {
		return {
			code: "",
			enterpriseWeChatConfig: {} // 微信参数配置
		};
	},
	created() {
		this.EWCConfig = this.$config.enterpriseWeChatConfig;
	},
	mounted() {
		this.WwLogin();
		if (this.$route.query.code) {
			this.code = this.$route.query.code;
			this.sentLoginCode();
		}
	}
};
</script>
<style lang="less">
@import "./login.less";
</style>
