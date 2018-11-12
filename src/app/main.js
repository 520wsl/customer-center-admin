import Vue from "vue";
import App from "@/app/App.vue";
import router from "@/app/router";
import store from "@/store";
import "@/libs/flexible";

import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import "@/assets/style/common.css";
import "@/assets/style/appBase.css";
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
