import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/libs/flexible";

import Mint from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(Mint);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
