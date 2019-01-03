import api from "@/libs/api.request";
import axios from 'axios'
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

// 企业微信  获取 微信 jsapi SDK config 配置 jtk
// export const getQyWxJSSDKConfig = ({ url }) => {
// 	return axios.get("https://qywx.n.yumc.pw/api/jsapi/config?url="+url);
// };

// 企业微信  获取 微信 登录 config 配置
export const getQyWxLoginConfig = () => {
	return post("/user/config");
};
