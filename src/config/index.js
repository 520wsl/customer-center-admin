/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-07 22:13:25
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-17 11:42:13
 * @explanatory:  config
 */
export default {
	/**
	 * @description token在Cookie中存储的天数，默认1天
	 */
	cookieExpires: 1,
	/**
	 * @description 默认打开的首页的路由name值，默认为home
	 */
	homeName: "home",
	baseUrl: {
		dev: "/api",
		pro: "/api"
	},
	CDN:
		"http://custom-center.oss-cn-hangzhou.aliyuncs.com/customerCenter/image",
	/**
	 * 客户端调起 路径配置
	 */
	callPhonePath: "http://172.30.34.107:3366/callout"
};
