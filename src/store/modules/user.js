/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-08 10:50:44 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-08 14:22:30
 * @explanatory:  store demo
 */
export default {
    namespaced: true,
	state: {
		userName: "Mad Dragon"
	},
	mutations: {
		setUserName(state, name) {
			state.userName = name;
		}
	},
	actions: {
		setUser({ commit }) {
			commit("setUserName", {a:1,b:2});
		}
	}
};
