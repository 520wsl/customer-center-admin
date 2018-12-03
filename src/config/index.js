/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-07 22:13:25
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-12-03 20:16:28
 * @explanatory:  config
 */
export default {
	/**
	 * @description 配置显示在浏览器标签的title
	 */
	title: "客户服务中心",
	/**
	 * @description token在Cookie中存储的天数，默认1天
	 */
	cookieExpires: 1,
	/**
	 * @description 默认打开的首页的路由name值，默认为home
	 */
	homeName: "workOrder-list",
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
		state: "enterpriseWeChat"
	},
	wechatConfig: {
		debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: "", // 必填，公众号的唯一标识
		timestamp: 0, // 必填，生成签名的时间戳
		nonceStr: "", // 必填，生成签名的随机串
		signature: "", // 必填，签名
		jsApiList: [] // 必填，需要使用的JS接口列表
	},
	storeageUserInfoKey: "userInfo",
	wechatToPagePath:"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c0c1aef00b3d175&response_type=code&scope=snsapi_userinfo&state=weChat&connect_redirect=1"
};
