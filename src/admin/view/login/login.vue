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
import { getWxSDKConfigData } from "@/api/admin/open";

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
			let res = await getWxSDKConfigData();
			console.log(res);
			/* eslint-disable no-undef */
			wx.config(res.data);
			console.log("config**************");
			wx.ready(function() {
				console.log("ready**************");
				// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			});

			wx.error(function(res) {
				console.log("error**************", res);

				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			});

			wx.checkJsApi({
				jsApiList: ["chooseImage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
				success: function(res) {
          console.log("checkJsApi", res);
          alert(res)
          this.checkJsApi = JSON.stringify(res)
					// 以键值对的形式返回，可用的api值true，不可用为false
					// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
				}
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
		}
	},
	data() {
		return {
      checkJsApi:'',
			code: "",
			enterpriseWeChatConfig: {} // 微信参数配置
		};
	},
	created() {
		this.EWCConfig = this.$config.enterpriseWeChatConfig;
	},
	mounted() {
		this.WXLogin();
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
