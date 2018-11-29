<template>
    <router-view/>
</template>
<script>
import { mapActions } from "vuex";
import { getQyWxJSSDKConfig } from "@/api/admin/qywechatProxy/wxSDK";
export default {
    name: "ParentView",

    methods: {
        ...mapActions([
            "handleLogin",
            "getUserInfo",
            "updatedSixiId",
            "loginScheduler"
        ]),
        // 登录成功后 跳到默认页面
        skipToDefaultPage(name) {
            name = name || this.$config.homeName;
            this.$router.push({
                name
            });
        },
        async QYWXLogin() {
            let res = await getQyWxJSSDKConfig({
                url: "http://work.sixi.com/admin/wx/workOrder/list"
            });
            console.log(res);

            /* eslint-disable no-undef */
            wx.config(res.data);

            wx.ready(function() {
                console.log("【wx JS-SDK】:wx.ready****");
                wx.checkJsApi({
                    jsApiList: ["chooseImage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function(res) {
                        let redirect_url =
                            "http://work.sixi.com/admin/wx/workOrder/list";
                        wx.invoke(
                            "openDefaultBrowser",
                            {
                                url:
                                    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=CORPID&redirect_uri=" +
                                    redirect_url +
                                    "&response_type=code&scope=snsapi_base&agentid=1000003&state=enterpriseWeChat#wechat_redirect" // 在默认浏览器打开redirect_uri，并附加code参数；也可以直接指定要打开的url，此时不会附带上code参数。
                            },
                            function(res) {
                                console.log(
                                    "【wx JS-SDK】：wx.invoke --*****：",
                                    res
                                );
                                if (res.err_msg != "openDefaultBrowser:ok") {
                                    //错误处理
                                }
                            }
                        );
                        console.log(res);
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    }
                });
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
            wx.error(function(res) {
                console.log("【wx JS-SDK】:wx.error****", res);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
            /* eslint-disable no-undef */
        }
    },
    created() {},
    async mounted() {
        let route = this.$route;
        let query = route.query;
        let codeData = query.code || "";
        let stateData = query.state || "enterpriseWeChat";
        this.QYWXLogin()
        if (!codeData && !stateData) {
            return;
        }
        let res = await this.loginScheduler({
            codeData,
            stateData,
            route: this.$route
        });
        console.log("code登录", res);
        
    }
};
</script>
