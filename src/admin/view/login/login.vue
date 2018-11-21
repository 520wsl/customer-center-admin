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
// const { mapActions } = createNamespacedHelpers("user");
import { sentLoginCodeData } from "@/api/admin/user/user";
import "./index.js";
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo", "updatedSixiId"]),
    handleSubmit({ userName, password, type }) {
      this.handleLogin({ userName, password, type }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          });
        });
      });
    }
  },
  mounted() {
    window.WwLogin({
      id: "wx_reg",
      appid: "ww7dc5f02540a109d3",
      agentid: "1000003",
      redirect_uri: this.$config.qywxRedirectUri,
      state: "123"
    });
    if (this.$route.query.code) {
      let code = this.$route.query.code;
      sentLoginCodeData({ code }).then(res => {
        if (res.status != 200) {
          return this.$Message.error({
            content: res.mag
          });
        }
         this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          });
        });
        this.updatedSixiId({ sixiId: res.data });
        this.$router.push({
          name: "custom-list"
        });
      });
    }
  }
};
</script>
<style lang="less">
@import "./login.less";
</style>
