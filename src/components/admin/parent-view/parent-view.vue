<template>
    <router-view/>
</template>
<script>
import { mapActions } from "vuex";
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
        }
    },
    async mounted() {
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
        // if(res){
        // 	this.skipToDefaultPage(this.$route.name)
        // }
    }
};
</script>
