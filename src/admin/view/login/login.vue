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
import {
	getWxJSSDKConfig,
	getWxSnsapiUserInfoData
} from "@/api/admin/wechatProxy/wxSDK";

import "_js/enterpriseWeChat/wwLogin-1.0.0.js";
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
		async WXLogin() {
			let res = await getWxJSSDKConfig({
				url: "http://work.sixi.com/admin/login"
			});
			console.log(res);
			/* eslint-disable no-undef */
			wx.config(res.data);
			console.log("config**************");
			wx.ready(function() {
				console.log("ready**************");
				wx.checkJsApi({
					jsApiList: ["chooseImage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
					success: function(res) {
						console.log("checkJsApi", res);
						this.checkJsApi = JSON.stringify(res);
						// 以键值对的形式返回，可用的api值true，不可用为false
						// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
					}
				});
			});

			wx.error(function(res) {
				console.log("error**************", res);
			});
			/* eslint-disable no-undef */
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
		async getUserInfoAction() {
			let res = await this.getUserInfo();

			if (res.status !== 200) {
				this.$Modal.error({
					title: "获取用户信息",
					content: res.msg
				});
				return;
			}

			this.skipToDefaultPage();
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
		},
		async getWxSnsapiUserInfo(code) {
			let res = await getWxSnsapiUserInfoData({ code });
			console.log("getWxSnsapiUserInfoData", res);
			return;
		},
		scheduler(query) {
			let code = query.code;
			let state = query.state || "enterpriseWeChat";

			if (code && state == "enterpriseWeChat") {
				this.code = this.$route.query.code;
				this.sentLoginCode();
				return;
			}

			if (code && state == "weChat") {
				this.code = this.$route.query.code;
				console.log(code);
				this.getWxSnsapiUserInfo(code);
			}
		}
	},
	data() {
		return {
			checkJsApi: "",
			code: "",
			enterpriseWeChatConfig: {} // 微信参数配置
		};
	},
	created() {
		console.log(
			"<a href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c0c1aef00b3d175&redirect_uri=http://work.sixi.com/admin/login&response_type=code&scope=snsapi_base&state=weChat#wechat_redirect'>测试</a>"
		);
		this.EWCConfig = this.$config.enterpriseWeChatConfig;
	},

	mounted() {
		// this.WXLogin();  暂时不需要
		this.WwLogin();
		let query = this.$router.query || "";
		if (query) {
			this.scheduler(query);
		}
	}
};
</script>
<style lang="less">
@import "./login.less";
</style>
