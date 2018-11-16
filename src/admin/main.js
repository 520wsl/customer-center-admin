import Vue from "vue";
import App from "@/admin/App.vue";
import router from "@/admin/router";
import store from "@/store";
import config from "@/config";
import iView from "iview";
import "iview/dist/styles/iview.css";
import "@/assets/style/common.css";
import "@/assets/style/adminBase.less";
import "@/assets/icons/iconfont.css";
import { CDN } from "@/libs/tools";
import "./index.less";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(iView);
Vue.use(ElementUI);

Vue.config.productionTip = false;
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
Vue.prototype.$CDN = CDN;

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
