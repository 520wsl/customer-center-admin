<template>
    <div class="login" style="background-color: #fff;">
        <div class="login"
             style="width: 450px;margin:auto;padding-top: 200px;text-align: center;">
            <img width="250" height="250" :src="$CDN('/start-loading.gif')">
            <h1>
                <Icon type="logo-chrome"/>
                <span>  登入认证中......</span>
            </h1>
            <!--<h1 style="color:red;">-->
            <!--<Icon type="md-rainy"/>-->
            <!--<span>  认证失败！</span>-->
            <!--<div style="font-size: 18px">-->
            <!--<p>Code过期</p>-->
            <!--</div>-->
            <!--</h1>-->
            <!--<h1 style="color: green;">-->
            <!--<Icon type="md-sunny"/>-->
            <!--<span>  认证成功！</span>-->
            <!--</h1>-->
            <!--<h1 style="color: orange;">-->
            <!--<Icon type="md-warning"/>-->
            <!--<span>  警告！</span>-->
            <!--<div style="font-size: 18px">-->
            <!--<p>非法操作</p>-->
            <!--</div>-->
            <!--</h1>-->
        </div>
        <!--<div v-else class="login" :style="'background-image: url('+$CDN('/login-bg.png')+')'">-->
        <!--<div class="login-con">-->
        <!--<Card icon="log-in" title="欢迎登录" :bordered="false">-->
        <!--<div class="form-con" v-if="false">-->
        <!--<login-form @on-success-valid="handleSubmit"></login-form>-->
        <!--<p class="login-tip">输入任意用户名和密码即可</p>-->
        <!--</div>-->
        <!--<div id="wx_reg"></div>-->
        <!--</Card>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import LoginForm from "_c/admin/login-form";
    import {mapActions} from "vuex";
    import {sentLoginCodeData} from "@/api/admin/user/user";
    import {ssoLogin} from "@/api/admin/user/sso";
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
            // LoginForm
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
                // window.WwLogin({
                //     id: this.EWCConfig.id,
                //     appid: this.EWCConfig.appid,
                //     agentid: this.EWCConfig.agentid,
                //     redirect_uri: this.EWCConfig.redirect_uri,
                //     state: this.EWCConfig.state
                // });
            },
            // 登录成功后 跳到默认页面
            skipToDefaultPage(name) {
                name = name || this.$config.homeName;
                this.$router.push({
                    name
                });
            },
            method1(url) {
                // 使用正则来 两边的参数不可能是 &=? 所以去反集[^&=?]
                console.log("method1", url);
                let regex = /([^&=?]+)=([^&=?]+)/g,
                    obj = {};
                url.replace(regex, (...arg) => {
                    obj[arg[1]] = arg[2];
                });
                console.log(obj);
                return obj;
            },
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
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c0c1aef00b3d175&redirect_uri=http://workapp.sixi.com/admin/login&response_type=code&scope=snsapi_userinfo&state=weChat2#wechat_redirect"
            );

            console.log("企业微信-pro");
            console.log(
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww7dc5f02540a109d3&redirect_uri=http://work.sixi.com/admin/login&response_type=code&scope=snsapi_base&state=enterpriseWeChat2#wechat_redirect"
            );

            console.log("微信-dev");
            console.log(
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6224f0de43449867&redirect_uri=http://test.workapp.sixi.com/admin/login&response_type=code&scope=snsapi_userinfo&state=weChat2#wechat_redirect"
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
            // this.WwLogin();
            let route = this.$route;
            let queryData = route.query;
            let codeData = queryData.code || "";
            let clientId = this.$config.ssoConfig.login.clientId
            let pathname = this.$config.ssoConfig.login.pathname

            let stateData = queryData.state || "";
            if (!codeData && !stateData) {
                window.location.href = await ssoLogin({clientId, pathname});
                return;
            }
            let res = await this.loginScheduler({
                    codeData,
                    stateData,
                    clientId,
                    pathname,
                    route:
                    this.$route
                })
            ;
            if (res) {
                // this.skipToDefaultPage();
                console.log("code登录", res);
                let par = queryData.par || "";
                let query = {};

                if (par) {
                    query = this.method1(decodeURIComponent(window.atob(par)));
                    console.log("par", par);
                    console.log(
                        "decodeURIComponent(window.atob(par))",
                        decodeURIComponent(window.atob(par))
                    );
                    console.log("queryData", query);
                }

                let pageName = query.pageName || "workOrder-list";
                if (pageName && pageName !== "workOrder-list") {
                    this.$router.push({
                        name: pageName,
                        query: query
                    });
                }

                return;
            }
            console.log("code登录", res);

        }
    };
</script>
<style lang="less">
    @import "./login.less";
</style>
