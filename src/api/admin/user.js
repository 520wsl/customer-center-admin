/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-13 14:36:52
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-13 15:47:57
 * @explanatory:  user 相关接口
 */
import api from "@/libs/api.request";

export const getCalssChildData = () => {
	return api.get("/class/child", {
		pid: 4
	});
};
export const login = ({ username, password }) => {
	const data = {
		username,
		password
	};
	return api.post("/auth/login", data);
};

export const getUserInfo = token => {
	return api.get("/user/info");
};

export const logout = () => {
	return api.post("/auth/logout");
};
