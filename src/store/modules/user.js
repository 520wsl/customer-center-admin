import { login, logout, getUserInfoData } from "@/api/admin/user/user";
import { setToken, getToken } from "@/libs/util";
import { setStore, getStore } from "@/libs/util/storeage";
/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-08 10:50:44
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-22 14:59:40
 * @explanatory:  store demo
 */
export default {
	state: {
		userInfo: {},
		userName: "",
		userId: "",
		avatorImgPath: "http://1.img.dianjiangla.com/assets/user.png",
		token: getToken(),
		access: "",
		hasGetInfo: false,
		sixiId: "",
		storeageKey: "sixiId",
		storeageUserInfoKey: "userInfo"
	},
	mutations: {
		setUserInfo(state, userInfo) {
			setStore(state.storeageUserInfoKey, userInfo);
			state.userInfo = userInfo;
		},
		setAvator(state, avatorPath) {
			state.avatorImgPath = avatorPath;
		},
		setUserId(state, id) {
			state.userId = id;
		},
		setSixiId(state, id) {
			setStore(state.storeageKey, id);
			state.sixiId = id;
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
		// handleLogin({ commit }, { userName, password, type }) {
		// 	userName = userName.trim();
		// 	return new Promise((resolve, reject) => {
		// 		login({
		// 			userName,
		// 			password,
		// 			type
		// 		})
		// 			.then(res => {
		// 				if (!res.status) {
		// 					console.error("[debug]:setToken", userName);
		// 					console.error("[debug]:handleLogin", res);
		// 					return;
		// 				}
		// 				commit("setToken", userName);
		// 				resolve();
		// 			})
		// 			.catch(err => {
		// 				reject(err);
		// 			});
		// 	});
		// },
		// 退出登录
		handleLogOut({ state, commit }) {
			return new Promise((resolve, reject) => {
				logout()
					.then(() => {
						commit("setSixiId", "");
						commit("setUserInfo", "");
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
					getUserInfoData()
						.then(res => {
							if (!res.status) {
								console.error("[debug]:getUserInfoData", res);
								return;
							}
							const data = res.data;
							let userName =
								data.userName + "(" + data.userName + ")";
							console.log("getUserInfoData", res.data);
							commit("setAvator", data.avatar);
							commit("setUserName", userName);
							commit("setUserId", data.userId);
							commit("setSixiId", data.sixiId);
							commit("setUserInfo", data);
							// commit("setAccess", data.permissions);
							commit("setHasGetInfo", true);
							resolve(res);
						})
						.catch(err => {
							reject(err);
						});
				} catch (error) {
					reject(error);
				}
			});
		},
		// 更新四喜Id
		updatedSixiId({ state, commit }, { sixiId }) {
			commit("setSixiId", sixiId);
		},
		getSixiId({ state, commit }) {
			let sixiId = getStore(state.storeageKey);
			if (sixiId) {
				commit("setSixiId", sixiId);
			}
		}
	}
};
