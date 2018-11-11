/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-07 22:22:23
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-10 17:49:13
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
 * }
 */
const Main1 = r =>
  require.ensure([], () => r(require("_c/template/main1")), "main"); //模板页 不带底部导航
export default [
  {
    path: "/demo/test01",
    name: "demoTest01",
    component: r =>
      require.ensure([], () => r(require("@/viewApp/view/demo/test01")), "demo") //demo
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login-登录"
    },
    component: r =>
      require.ensure(
        [],
        () => r(require("@/viewApp/view/login/login")),
        "login"
      ) //登录页面
  },
  {
    path: "/",
    name: "_home",
    redirect: { name: "home" },
    component: Main1,
    children: [
      {
        path: "home",
        name: "home",
        meta: {
          title: "首页"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/home/home")),
            "login"
          ) //首页
      }
    ]
  },
  {
    path: "/contract",
    name: "_contract",
    redirect: { name: "contract" },
    component: Main1,
    children: [
      {
        path: "index",
        name: "contract",
        meta: {
          title: "我的合同"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/contract/index")),
            "contract"
          )
      },
      {
        path: "info",
        name: "contractInfo",
        meta: {
          title: "合同详情"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/contract/info")),
            "contract"
          )
      },
      {
        path: "pay",
        name: "contractPay",
        meta: {
          title: "支付"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/contract/pay")),
            "contract"
          )
      },
      {
        path: "paySuccess",
        name: "contractPaySuccess",
        meta: {
          title: "支付成功"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/contract/paySuccess")),
            "contract"
          )
      }
    ]
  },
  {
    path: "/log",
    name: "_log",
    redirect: { name: "saleRecord" },
    component: Main1,
    children: [
      {
        path: "saleRecord",
        name: "saleRecord",
        meta: {
          title: "记录"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/log/saleRecord")),
            "log"
          )
      }
    ]
  },
  {
    path: "/personal",
    name: "_personal",
    redirect: { name: "personal" },
    component: Main1,
    children: [
      {
        path: "index",
        name: "personal",
        meta: {
          title: "我的"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/personal/index")),
            "personal"
          )
      },
      {
        path: "company",
        name: "personalCompany",
        meta: {
          title: "我的公司"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/personal/company")),
            "personal"
          )
      }
    ]
  },
  {
    path: "/question",
    name: "_question",
    redirect: { name: "question" },
    component: Main1,
    children: [
      {
        path: "index",
        name: "question",
        meta: {
          title: "常见问题"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/question/index")),
            "question"
          )
      },
      {
        path: "info",
        name: "questionInfo",
        meta: {
          title: "常见问题详情"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/question/info")),
            "questionInfo"
          )
      }
    ]
  },
  {
    path: "/serviceBill",
    name: "_serviceBill",
    redirect: { name: "serviceBill" },
    component: Main1,
    children: [
      {
        path: "index",
        name: "serviceBill",
        meta: {
          title: "服务工单"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/serviceBill/index")),
            "serviceBill"
          )
      },
      {
        path: "info",
        name: "serviceBillInfo",
        meta: {
          title: "服务工单-详情记录"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/serviceBill/info")),
            "serviceBillInfo"
          )
      },
      {
        path: "preview",
        name: "serviceBillBreview",
        meta: {
          title: "服务工单-详情记录"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/serviceBill/preview")),
            "serviceBillPreview"
          )
      }
    ]
  },
  {
    path: "/serviceEvaluation",
    name: "_serviceEvaluation",
    redirect: { name: "serviceEvaluation" },
    component: Main1,
    children: [
      {
        path: "index",
        name: "serviceEvaluation",
        meta: {
          title: "服务评价"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/serviceEvaluation/index")),
            "serviceEvaluation"
          )
      },
      {
        path: "feedback",
        name: "serviceEvaluationBreview",
        meta: {
          title: "服务评价反馈"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/serviceEvaluation/feedback")),
            "serviceEvaluation"
          )
      },
      {
        path: "info",
        name: "serviceEvaluationInfo",
        meta: {
          title: "服务评价详情"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/viewApp/view/serviceEvaluation/info")),
            "serviceEvaluation"
          )
      }
    ]
  }
];
