import { login, logout, getUserInfo } from "@/api/admin/user";
import { setToken, getToken } from "@/libs/util";
/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-08 10:50:44
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-13 15:31:48
 * @explanatory:  store demo
 */
export default {
	namespaced: true,
	state: {
		access: "",
		token: "",
		userName: "Mad Dragon",
		avatorImgPath: "http://1.img.dianjiangla.com/assets/user.png"
	},
	mutations: {
		setAvator(state, avatorPath) {
			state.avatorImgPath = avatorPath;
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
		}
	},
	actions: {
		setUser({ commit }) {
			commit("setUserName", { a: 1, b: 2 });
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
					getUserInfo(state.token)
						.then(res => {
							const data = res.data;
							commit("setAvator", data.avator);
							// commit("setUserName", data.name);
							// commit("setUserId", data.user_id);
							// commit("setAccess", data.access);
							// commit("setHasGetInfo", true);
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
