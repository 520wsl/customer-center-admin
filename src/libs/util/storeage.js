/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-08 18:14:10 
 * @Last Modified by:   Mad Dragon 
 * @Last Modified time: 2018-11-08 18:14:10 
 * @explanatory:  localStorage 存储
 */
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== "string") {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
};
