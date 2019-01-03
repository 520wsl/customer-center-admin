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
    import {mapActions} from "vuex";
    import {sentLoginCodeData} from "@/api/admin/user/user";
    import {
        getWxJSSDKConfig,
        getWxSnsapiUserInfoData
    } from "@/api/admin/wechatProxy/wxSDK";
    import {
        getQyWxLoginConfig
    } from "@/api/admin/qywechatProxy/wxSDK";
    import "_js/enterpriseWeChat/wwLogin-1.0.0.js";

    export default {
        components: {
            LoginForm
        },
        methods: {
            ...mapActions(["handleLogin", "getUserInfo", "loginScheduler"]),
            // 账号密码登陆流程，暂时没有
            handleSubmit({userName, password, type}) {
                this.handleLogin({userName, password, type}).then(res => {
                    this.getUserInfo().then(res => {
                        this.$router.push({
                            name: this.$config.homeName
                        });
                    });
                });
            },
            // 微信 登录相关 API 环境校验
            WwLogin() {
                getQyWxLoginConfig().then(res => {
                    window.WwLogin(res.data);
                }).catch(error => {
                    console.log('企业微信登录配置获取失败', error)
                })

            },
            // 登录成功后 跳到默认页面
            skipToDefaultPage(name) {
                name = name || this.$config.homeName;
                this.$router.push({
                    name
                });
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
            console.log("微信--pro");
            console.log(
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c0c1aef00b3d175&redirect_uri=http://work.sixi.com/admin/login&response_type=code&scope=snsapi_userinfo&state=weChat2#wechat_redirect"
            );

            console.log("企业微信-pro");
            console.log(
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww7dc5f02540a109d3&redirect_uri=http://work.sixi.com/admin/login&response_type=code&scope=snsapi_base&state=enterpriseWeChat2#wechat_redirect"
            );

            console.log("微信-dev");
            console.log(
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c0c1aef00b3d175&redirect_uri=http://work.sixi.com/admin/login&response_type=code&scope=snsapi_userinfo&state=weChat2#wechat_redirect"
            );

            console.log("企业微信-dev");
            console.log(
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww7dc5f02540a109d3&redirect_uri=http://test.work.sixi.com/admin/login&response_type=code&scope=snsapi_base&state=enterpriseWeChat2#wechat_redirect"
            );
            console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
            this.EWCConfig =
                process.env.NODE_ENV === "development"
                    ? this.$config.enterpriseWeChatConfig.dev
                    : this.$config.enterpriseWeChatConfig.pro;
        },

        async mounted() {
            this.WwLogin();
            let route = this.$route;
            let query = route.query;
            let codeData = query.code || "";
            let stateData = query.state || "enterpriseWeChat";
            if (!codeData && !stateData) {
                return;
            }
            let res = await this.loginScheduler({
                codeData,
                stateData,
                route: this.$route
            });
            console.log("code登录", res);
            if (res) {
                this.skipToDefaultPage();
            }
        }
    };
</script>
<style lang="less">
    @import "./login.less";
</style>
