import api from "@/libs/api.request";
const baseUrl = "/qywechat-proxy-service";
function post(url, params) {
	return api.post(baseUrl + url, params);
}
function get(url, params) {
	return api.get(baseUrl + url, params);
}

// 企业微信  获取 微信 jsapi SDK config 配置
export const getQyWxJSSDKConfig = ({ url }) => {
	return get("/wx/wxJSSDKConfig", { url });
};