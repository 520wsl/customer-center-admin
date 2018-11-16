<template>
	<div class="login" :style="'background-image: url('+$CDN('/login-bg.jpg')+')'">
		<div class="login-con">
			<Card icon="log-in" title="欢迎登录" :bordered="false">
				<div class="form-con">
					<login-form @on-success-valid="handleSubmit"></login-form>
					<p class="login-tip">输入任意用户名和密码即可</p>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
import LoginForm from "_c/admin/login-form";
import { mapActions } from "vuex";
// const { mapActions } = createNamespacedHelpers("user");
export default {
	components: {
		LoginForm
	},
	methods: {
		...mapActions(["handleLogin", "getUserInfo"]),
		handleSubmit({ userName, password, type }) {
			this.handleLogin({ userName, password, type }).then(res => {
				this.getUserInfo().then(res => {
					this.$router.push({
						name: this.$config.homeName
					});
				});
			});
		}
	}
};
</script>
<style lang="less">
@import "./login.less";
</style>
