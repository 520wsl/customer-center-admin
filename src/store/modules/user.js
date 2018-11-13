import { login, logout, getUserInfo } from "@/api/admin/user";
import { setToken, getToken } from "@/libs/util";
/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-08 10:50:44
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-13 22:53:08
 * @explanatory:  store demo
 */
export default {
	namespaced: true,
	state: {
		userName: "",
		userId: "",
		avatorImgPath: "http://1.img.dianjiangla.com/assets/user.png",
		token: getToken(),
		access: "",
		hasGetInfo: false
	},
	mutations: {
		setAvator(state, avatorPath) {
			state.avatorImgPath = avatorPath;
		},
		setUserId(state, id) {
			state.userId = id;
		},
		setUserName(state, name) {
			state.userName = name;
		},
		setAccess(state, access) {
			state.access = access;
		},
		setToken(state, token) {
			state.token = token;
			setToken(token);
		},
		setHasGetInfo(state, status) {
			state.hasGetInfo = status;
		}
	},
	actions: {
		setUser({ commit }) {
			commit("setUserName", { a: 1, b: 2 });
		},
		// 登录
		handleLogin({ commit }, { userName, password, type }) {
			userName = userName.trim();
			return new Promise((resolve, reject) => {
				login({
					userName,
					password,
					type
				})
					.then(res => {
						if (!res.status) {
							console.error("[debug]:setToken", userName);
							console.error("[debug]:handleLogin", res);
							return;
						}
						commit("setToken", userName);
						resolve();
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		// 退出登录
		handleLogOut({ state, commit }) {
			return new Promise((resolve, reject) => {
				logout()
					.then(() => {
						commit("setToken", "");
						commit("setAccess", []);
						resolve();
					})
					.catch(err => {
						reject(err);
					});
				//   如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
				// commit("setToken", "");
				// commit("setAccess", []);
				// resolve();
			});
		},
		// 获取用户相关信息
		getUserInfo({ state, commit }) {
			return new Promise((resolve, reject) => {
				try {
					getUserInfo()
						.then(res => {
							if (!res.status) {
								console.error("[debug]:getUserInfo", res);
								return;
							}
							const data = res.data;
							console.log("getUserInfo", res.data);
							commit("setAvator", data.image_url);
							commit(
								"setUserName",
								data.nickname || data.username || data.phone
							);
							commit("setUserId", data.id);
							commit("setAccess", data.permissions);
							commit("setHasGetInfo", true);
							resolve(data);
						})
						.catch(err => {
							reject(err);
						});
				} catch (error) {
					reject(error);
				}
			});
		}
	}
};
