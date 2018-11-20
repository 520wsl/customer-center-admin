/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-07 15:32:18
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-18 18:33:35
 * @explanatory:  axios 接口封装
 */
import axios from "axios";

class HttpRequest {
	constructor(baseUrl = baseUrl) {
		this.baseUrl = baseUrl;
	}

	getInsideConfig() {
		const config = {
			baseURL: this.baseUrl,
			timeout: 10000,
			responseType: "json",
			headers: {
				"If-Modified-Since": 0,
				"Cache-Control": "no-cache"
			}
		};
		return config;
	}
	// 各种状态码处理
	setResponse(status, msg, url) {
		switch (status) {
			case 500:
				console.log(
					"服务器错误500：请截图给管理员，以便快捷修复错误！  \nurl:" +
						url +
						"\n错误信息：" +
						msg
				);
				alert(
					"服务器错误500：请截图给管理员，以便快捷修复错误！  \nurl:" +
						url +
						"\n错误信息：" +
						msg
				);
				break;

			case 401:
				console.log(
					"未登录或登陆超时 401：请重新登陆！  \nurl:" +
						url +
						"\n错误信息：" +
						msg
				);
				alert(
					"未登录或登陆超时 401：请重新登陆！  \nurl:" +
						url +
						"\n错误信息：" +
						msg
				);
				this.goLogin();
				break;

			default:
				break;
		}
	}

	goLogin() {
		location.href = "/login";
	}

	interceptors(instance) {
		// axios 请求拦截
		instance.interceptors.request.use(
			config => {
				return config;
			},
			error => {
				return Promise.reject(error);
			}
		);
		// axios 响应拦截
		instance.interceptors.response.use(
			res => {
				let { data } = res;
				if (data && data.status) {
					this.setResponse(data.status, data.msg, res.config.url);
				}
				if (res && data && data.status !== 200) {
					data.data = {};
				}

				return data;
			},
			error => {
				console.log(String(error).search("401"));
				if (String(error).search("401") !== -1) {
					this.goLogin();
				}
				return Promise.reject(error);
			}
		);
	}
	request(options) {
		const instance = axios.create();
		options = Object.assign(this.getInsideConfig(), options);
		this.interceptors(instance);
		return instance(options);
	}
}
export default HttpRequest;
