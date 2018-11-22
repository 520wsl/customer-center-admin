/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-07 22:13:25
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-22 10:08:29
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
	homeName: "custom-list",
	baseUrl: {
		dev: "/api",
		pro: "/api"
	},
	CDN:
		"http://custom-center.oss-cn-hangzhou.aliyuncs.com/customerCenter/image",
	/**
	 * 客户端调起 路径配置
	 */
	callPhonePath: "http://127.0.0.1:3366",
	attachmentPath: "http://wechat-base-images.oss-cn-hangzhou.aliyuncs.com/",
	enterpriseWeChatConfig: {
		id: "wx_reg",
		appid: "ww7dc5f02540a109d3",
		agentid: "1000003",
		redirect_uri: "http://work.sixi.com/login",
		state: "123"
	}
};
