/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-17 09:49:45
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-22 22:57:17
 * @explanatory:  wx sdk config
 */

import api from "@/libs/api.request";
const baseUrl = "/open";
function post(url, params) {
	return api.post(baseUrl + url, params);
}
function get(url, params) {
	return api.get(baseUrl + url, params);
}

// wx sdk config
export const getWxSDKConfigData = () => {
	return get("/jsapi/config");
};
