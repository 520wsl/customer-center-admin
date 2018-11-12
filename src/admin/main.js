import Vue from "vue";
import App from "@/admin/App.vue";
import router from "@/admin/router";
import store from "@/store";

import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import "@/assets/style/common.css";
import "@/assets/style/adminBase.css";
import { CDN } from "@/libs/tools";
Vue.use(Mint);

Vue.prototype.$CDN = CDN;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
