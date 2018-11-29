/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-07 22:19:44
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-28 16:27:48
 * @explanatory:  路由 配置
 */
import Vue from "vue";
import Router from "vue-router";
import routes from "@/admin/router/routers";
import iView from "iview";
import { getSixiID, setTitle } from "@/libs/util";
import config from "@/config";
const { homeName } = config;

Vue.use(Router);
const router = new Router({
	base: "/admin/",
	routes,
	mode: "history"
});
const LOGIN_PAGE_NAME = "login";
// 全局守卫
router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	const sixiID = getSixiID();

	if (to.meta.noLogin) {
		next();
		return;
	}

	if (!sixiID && to.name !== LOGIN_PAGE_NAME) {
		// 未登录且要跳转的页面不是登录页
		next({
			name: LOGIN_PAGE_NAME // 跳到登录页
		});
	} else if (!sixiID && to.name === LOGIN_PAGE_NAME) {
		// 未登陆且要跳转的页面是登录页
		next(); // 跳转
	} else if (sixiID && to.name === LOGIN_PAGE_NAME) {
		// 已登录且要跳转的页面是登录页
		next({
			name: homeName
		});
	} else {
		next();
	}
});
// 全局后置钩子
router.afterEach(to => {
	setTitle(to, router.app);
	iView.LoadingBar.finish();
	window.scrollTo(0, 0);
});

export default router;
