/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-07 22:22:23
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-12-10 11:54:10
 * @explanatory: Routers Config   路由 路径 配置
 */
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 *  noLogin: (false) 页面是否需要登陆拦截，默认需要
 * }
 */
const Main1 = r =>
	require.ensure([], () => r(require("_c/admin/main")), "main"); //模板页
const parentView = r =>
	require.ensure([], () => r(require("_c/admin/parent-view")), "main"); //模板页
export default [
	{
		path: "/workOrder",
		name: "workOrder",
		meta: {
			// showAlways: true,
			icon: "ios-stats",
			title: "工单"
		},
		component: Main1,
		children: [
			{
				path: "list",
				name: "workOrder-list",
				meta: {
					icon: "ios-stats",
					title: "工单列表"
				},
				component: r =>
					require.ensure([], () =>
						require("@/admin/view/workOrder/list")
					)
			},
			{
				path: "info",
				name: "workOrder-info",
				meta: {
					hideInMenu: true,
					icon: "ios-stats",
					title: "工单详情",
					notCache: true
				},
				component: r =>
					require.ensure([], () =>
						require("@/admin/view/workOrder/info")
					),
				children: [
					{
						path: "base",
						name: "workOrder-info-base",
						meta: {
							hideInMenu: true,
							icon: "ios-stats",
							// title: "工单详情基本信息",
							title: route => `${route.query.companyName}-工单详情基本信息`,
							notCache: true
						},
						component: r =>
							require.ensure([], () =>
								require("@/admin/view/workOrder/baseMessage")
							)
					},
					{
						path: "service",
						name: "workOrder-info-service",
						meta: {
							hideInMenu: true,
							icon: "ios-stats",
							// title: "工单详情服务信息",
							title: route => `${route.query.companyName}-工单详情服务信息`,
							notCache: true
						},
						component: r =>
							require.ensure([], () =>
								require("@/admin/view/workOrder/serviceMessage")
							)
					}
				]
			}
		]
	},
	{
		path: "/demo",
		name: "demo",
		component: Main1,
		meta: {
			icon: "logo-buffer",
			title: "案例",
			hideInMenu: true
		},
		children: [
			{
				path: "test01",
				meta: {
					icon: "_qq",
					title: "test01"
				},
				name: "test01",
				component: r =>
					require.ensure(
						[],
						() => r(require("@/admin/view/demo/test01")),
						"demo"
					) //demo
			},
			{
				path: "test02",
				meta: {
					icon: "_qq",
					title: "test02"
				},
				name: "test02",
				component: r =>
					require.ensure(
						[],
						() => r(require("@/admin/view/demo/test01")),
						"demo"
					) //demo
			}
		]
	},
	{
		path: "/login",
		name: "login",
		meta: {
			title: "Login-登录",
			hideInMenu: true
		},
		component: r =>
			require.ensure(
				[],
				() => r(require("@/admin/view/login/login.vue")),
				"login"
			) //登录页面
	},
	{
		path: "/phone",
		name: "phone",
		meta: {
			title: "手机回显页面",
			hideInMenu: true
		},
		component: r =>
			require.ensure(
				[],
				() => r(require("@/admin/view/phone/phone.vue")),
				"phone"
			) //手机回显页面
	},
	{
		path: "/",
		name: "_home",
		redirect: "/home",
		component: Main1,
		meta: {
			hideInMenu: true,
			notCache: true
		},
		children: [
			{
				path: "/home",
				name: "home",
				meta: {
					hideInMenu: true,
					title: "首页",
					notCache: true,
					icon: "md-home"
				},
				component: r =>
					require.ensure(
						[],
						() => r(require("@/admin/view/home/home")),
						"login"
					) //首页
			}
		]
	},
	{
		path: "/evaluate",
		name: "evaluate",
		meta: {
			// showAlways: true,
			icon: "ios-stats",
			title: "评价"
		},
		component: Main1,
		children: [
			{
				path: "list",
				name: "evaluate-list",
				meta: {
					icon: "ios-stats",
					title: "评价模板"
				},
				component: r =>
					require.ensure([], () =>
						require("@/admin/view/evaluate/list")
					)
			},
			{
				path: "info",
				name: "evaluate-info",
				meta: {
					hideInMenu: true,
					icon: "ios-stats",
					title: "评价模板编辑",
					notCache: true
					// beforeCloseName: "before_close_normal"
				},
				component: r =>
					require.ensure([], () =>
						require("@/admin/view/evaluate/info")
					)
			}
		]
	},
	{
		path: "/workorderEvaluate",
		name: "workorderEvaluate",
		meta: {
			// showAlways: true,
			icon: "ios-stats",
			title: "评价列表"
		},
		component: Main1,
		children: [
			{
				path: "list",
				name: "workorder-evaluate-list",
				meta: {
					icon: "ios-stats",
					title: "工单评价列表"
				},
				component: r =>
					require.ensure([], () =>
						require("@/admin/view/evaluate/workorderEvaluateList")
					)
			}
		]
	},
	{
		path: "/custom",
		name: "custom",
		meta: {
			// showAlways: true,
			icon: "ios-stats",
			title: "客户"
		},
		component: Main1,
		children: [
			{
				path: "list",
				name: "custom-list",
				meta: {
					icon: "ios-stats",
					title: "客户列表"
				},
				component: r =>
					require.ensure([], () =>
						require("@/admin/view/custom/list")
					)
			},
			{
				path: "info",
				name: "custom-info",
				meta: {
					hideInMenu: true,
					icon: "ios-stats",
					title: "客户详情",
					notCache: true,
					beforeCloseName: "before_close_normal"
				},
				component: r =>
					require.ensure([], () =>
						require("@/admin/view/custom/info")
					)
			}
		]
	},
	{
		path: "/wx/workOrder",
		name: "wx-workOrder",
		meta: {
			hideInMenu: true,
			icon: "ios-stats",
			title: "工单",
			noLogin: true
		},
		component: parentView,
		children: [
			{
				path: "list",
				name: "wx-workOrder-list",
				meta: {
					hideInMenu: true,
					icon: "ios-stats",
					title: "工单列表",
					noLogin: true
				},
				component: r =>
					require.ensure([], () =>
						require("@/admin/view/workOrder/list")
					)
			},
			{
				path: "info",
				name: "wx-workOrder-info",
				meta: {
					hideInMenu: true,
					icon: "ios-stats",
					title: "工单详情",
					notCache: true,
					noLogin: true
				},
				component: r =>
					require.ensure([], () =>
						require("@/admin/view/workOrder/info")
					),
				children: [
					{
						path: "base",
						name: "wx-workOrder-info-base",
						meta: {
							hideInMenu: true,
							icon: "ios-stats",
							title: "工单详情基本信息",
							notCache: true,
							noLogin: true
						},
						component: r =>
							require.ensure([], () =>
								require("@/admin/view/workOrder/baseMessage")
							)
					},
					{
						path: "service",
						name: "wx-workOrder-info-service",
						meta: {
							hideInMenu: true,
							icon: "ios-stats",
							title: "工单详情服务信息",
							notCache: true,
							noLogin: true
						},
						component: r =>
							require.ensure([], () =>
								require("@/admin/view/workOrder/serviceMessage")
							)
					}
				]
			}
		]
	},
	{
		path: "/wx/custom",
		name: "wx-custom",
		meta: {
			icon: "ios-stats",
			title: "客户",
			hideInMenu: true,
			notCache: true,
			noLogin: true
		},
		component: parentView,
		children: [
			{
				path: "list",
				name: "wx-custom-list",
				meta: {
					icon: "ios-stats",
					title: "客户列表",
					hideInMenu: true,
					notCache: true,
					noLogin: true
				},
				component: r =>
					require.ensure([], () =>
						require("@/admin/view/custom/list")
					)
			},
			{
				path: "info",
				name: "wx-custom-info",
				meta: {
					icon: "ios-stats",
					title: "客户详情",
					beforeCloseName: "before_close_normal",
					hideInMenu: true,
					notCache: true,
					noLogin: true
				},
				component: r =>
					require.ensure([], () =>
						require("@/admin/view/custom/info")
					)
			}
		]
	}
];
