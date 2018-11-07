/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-07 22:19:44 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-07 22:48:20
 * @explanatory:  路由 配置
 */
import Vue from "vue";
import Router from "vue-router";
import routes from "@/router/routers";

Vue.use(Router);
const router = new Router({
	routes,
	mode: "history"
});

export default router;
