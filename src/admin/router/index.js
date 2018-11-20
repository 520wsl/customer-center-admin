/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-07 22:19:44
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-14 09:39:14
 * @explanatory:  路由 配置
 */
import Vue from "vue";
import Router from "vue-router";
import routes from "@/admin/router/routers";
import iView from "iview";

Vue.use(Router);
const router = new Router({
	base:"/admin/",
	routes,
	mode: "history"
});
// 全局守卫
router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	// console.log("router.beforeEach:from=>", from);
    // console.log("router.beforeEach:to=>", to);
    if (to.meta.title) {//判断是否有标题
        document.title = to.meta.title
    }
	next();
});
// 全局解析守卫
router.beforeResolve((to, from, next) => {
	// console.log("router.beforeResolve:from=>", from);
	// console.log("router.beforeResolve:to=>", to);
	next();
});
// 全局后置钩子
router.afterEach(to => {
	// console.log("router.afterEach:to=>", to);
	iView.LoadingBar.finish();
	window.scrollTo(0, 0);
});

export default router;
