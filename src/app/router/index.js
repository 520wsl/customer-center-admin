/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-07 22:19:44 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-12 11:16:06
 * @explanatory:  路由 配置
 */
import Vue from "vue";
import Router from "vue-router";
import routes from "@/app/router/routers";

Vue.use(Router);
const router = new Router({
	// base:"/",
	routes,
	mode: "history"
});
// 全局守卫
router.beforeEach((to, from, next) => {
	console.log("router.beforeEach:from=>", from);
	console.log("router.beforeEach:to=>", to);
	next();
});
// 全局解析守卫
router.beforeResolve((to, from, next) => {
	console.log("router.beforeResolve:from=>", from);
	console.log("router.beforeResolve:to=>", to);
	next();
});
// 全局后置钩子
router.afterEach(to => {
	console.log("router.afterEach:to=>", to);
	window.scrollTo(0, 0);
});

export default router;
