<template>
    <div>
        <Card class="md-card">
            <div slot="title">
                <div style="padding: 10px 0;font-size: 20px;font-weight: bold;">生成按钮链接 -- 企业微信：</div>
                <Input v-model="param" type="textarea" :rows="2" placeholder="添加par参数..."/></div>
            <!--<div><span>加密后：</span> </div>-->
            <table class="tab">
                <tr>
                    <td class="title">测试 state:</td>
                    <td>{{encodeUrlData.stateTest}}</td>
                </tr>
                <tr>
                    <td class="title">线上 state:</td>
                    <td>{{encodeUrlData.stateOnline}}</td>
                </tr>
                <tr>
                    <td class="title">测试 :</td>
                    <td>{{encodeUrlData.enUrlTest}}</td>
                </tr>
                <tr>
                    <td class="title">线上 :</td>
                    <td>{{encodeUrlData.enUrlOnline}}</td>
                </tr>
            </table>
        </Card>

        <Card class="md-card">
            <div slot="title">
                <div style="padding: 10px 0;font-size: 20px;font-weight: bold;">解析按钮链接 -- 企业微信：</div>
                <Input v-model="oauthUrl" type="textarea" :rows="6" placeholder="添加par参数..."/></div>
            <!--<div><span>加密后：</span> </div>-->
            <table class="tab">
                <tr>
                    <td class="title">par :</td>
                    <td>{{decondeUrlData.par}}</td>
                </tr>
                <tr>
                    <td class="title">host :</td>
                    <td>{{decondeUrlData.host}}</td>
                </tr>
                <tr>
                    <td class="title">redirect_uri :</td>
                    <td>{{decondeUrlData.redirect_uri}}</td>
                </tr>
                <tr>
                    <td class="title">state :</td>
                    <td>{{decondeUrlData.state}}</td>
                </tr>
            </table>
        </Card>
    </div>
</template>
<script>
    export default {
        mounted() {
            // this.enUrlActhon()
            // this.dUrlAction()
        },
        methods: {
            enUrlActhon() {
                let estate_test = this.eState(this.encodeUrlData.client_id, this.encodeUrlData.host, this.param)
                this.encodeUrlData.stateTest = estate_test
                this.encodeUrlData.enUrlTest = this.eURL(estate_test)
                let estate_online = this.eState(this.encodeUrlData.client_id, this.encodeUrlData.onlineHost, this.param)
                this.encodeUrlData.stateOnline = estate_online
                this.encodeUrlData.enUrlOnline = this.eURL(estate_online)
            },
            eState(client_id, host, param) {
                return btoa("client_id=" + client_id + "&redirect_uri=" + encodeURIComponent(host + '?par=' + btoa(encodeURIComponent(param)) + "&state=" + this.common.state))
            },
            eURL(state) {
                return this.common.weixin_host + "?" +
                    "appid=" + this.common.appid +
                    "&redirect_uri=" + this.common.redirect_uri +
                    "&response_type=" + this.common.response_type +
                    "&scope=" + this.common.scope +
                    "&state=" + state +
                    "#wechat_redirect"
            },
            dUrlAction() {
                let params = this.getParams(this.oauthUrl)
                this.decondeUrlData.par = params.par;
                this.decondeUrlData.host = params.host;
                this.decondeUrlData.redirect_uri = params.redirect_uri;
                this.decondeUrlData.state = params.state;
            },
            getParams(url) {
                let state = atob(this.getState(url))
                let redirect_uri = this.getRedirect_uri(state)
                let host = redirect_uri.split('?')[0];
                let params = redirect_uri.split('?')[1].split('&')[0]
                let par = decodeURIComponent(atob(params.split('par=')[1]))

                return {
                    state:decodeURIComponent(state),
                    redirect_uri,
                    par,
                    host
                }
            },
            getRedirect_uri(state) {
                let redirect_uri = ""
                if (state.length <= 0) {
                    return
                }
                state.split('&').map(function (item) {
                    if (item.indexOf("redirect_uri=") != -1) {
                        redirect_uri = item.split('#')[0].split('redirect_uri=')[1]
                    }
                    return item
                })
                return decodeURIComponent(redirect_uri)
            },
            getState(oauthUrl) {
                let state = ""
                if (oauthUrl.length <= 0) {
                    return
                }
                oauthUrl = oauthUrl.split('&')

                oauthUrl.map(function (item) {
                    if (item.indexOf("state=") != -1) {
                        state = item.split('#')[0].split('state=')[1]
                    }
                    return item
                })
                return state
            }
        },
        data() {
            return {
                param: '',
                common: {
                    weixin_host: "https://open.weixin.qq.com/connect/oauth2/authorize",
                    appid: 'ww7dc5f02540a109d3',
                    redirect_uri: 'https://oauth.sixi.com/qywechat',
                    response_type: 'code',
                    scope: 'snsapi_base',
                    state: 'sso'
                },
                encodeUrlData: {
                    client_id: 'workorder',
                    host: 'http://test.work.sixi.com/admin/login',
                    onlineHost: 'http://work.sixi.com/admin/login',
                    enUrlTest: '',
                    enUrlOnline: '',
                    stateTest: '',
                    stateOnline: '',
                },
                oauthUrl: '',
                decondeUrlData: {
                    par: '',
                    host: '',
                    redirect_uri: '',
                    state: ''
                }
            };
        },
        watch: {
            param(val) {
                if (val.length <= 0) {
                    console.log(val)
                    this.encodeUrlData.enUrlTest = ""
                    this.encodeUrlData.enUrlOnline = ""
                    this.encodeUrlData.stateTest = ""
                    this.encodeUrlData.stateOnline = ""
                    return
                }
                this.enUrlActhon()
            },
            oauthUrl(val) {
                if (val.length <= 0) {
                    console.log(val)
                    this.decondeUrlData.par = ""
                    this.decondeUrlData.host = ""
                    this.decondeUrlData.redirect_uri = ""
                    this.decondeUrlData.state = ""
                    return
                }
                this.dUrlAction()
            }
        }
    };
</script>
<style lang="less" scoped>
    table tr td {
        padding: 10px;
    }

    .title {
        font-size: 18px;
        font-weight: bold;
    }


</style>