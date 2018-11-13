/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-13 14:36:52
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-13 22:39:32
 * @explanatory:  user 相关接口
 */
import api from "@/libs/api.request";

export const getCalssChildData = () => {
	return api.get("/class/child", {
		pid: 4
	});
};
export const login = ({ userName, password, type }) => {
	const data = {
		username: userName,
		password,
		type
	};
	return api.post("/auth/login", data);
};

export const getUserInfo = () => {
	return api.get("/user/info");
};

export const logout = () => {
	return api.post("/auth/logout");
};
