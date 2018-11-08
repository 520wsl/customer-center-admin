/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-08 18:13:43 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-08 18:14:04
 * @explanatory:  sessionStorage 存储
 */
// 保存数据到sessionStorage
export const setItem = (key, params) => {
	sessionStorage.setItem(key, JSON.stringify(params));
};

// 从sessionStorage获取数据
export const getItem = key => {
	return JSON.parse(sessionStorage.getItem(key));
};

// 从sessionStorage删除保存的数据
export const removeItem = key => {
	sessionStorage.removeItem(key);
};

// 从sessionStorage删除所有保存的数据
export const clear = key => {
	sessionStorage.clear();
};
