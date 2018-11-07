/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-07 20:46:41 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-07 21:05:01
 * @explanatory:  api 调用 demo
 */
import api from "@/libs/api.request";

export const getCalssChildData = () => {
	return api.get("/class/child", {
		pid: 4
	});
};
