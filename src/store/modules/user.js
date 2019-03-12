import {logout, sentLoginCodeData} from "@/api/admin/qywechatProxy/user";
import {getIsDirector,getIsLeader} from "@/api/admin/case/case"
import {getUserInfoData} from "@/api/admin/user/user";
import {ssoLogin,ssoCode,ssoLoginOut} from "@/api/admin/user/sso";
import {setToken, getToken} from "@/libs/util";
import {setStore, getStore} from "@/libs/util/storeage";
import config from "@/config";

const {storeageUserInfoKey} = config;
const storedimensionListKey = "dimensionList";
/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-08 10:50:44
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2019-01-22 18:56:02
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
        storeageUserInfoKey: storeageUserInfoKey
    },
    mutations: {
        setIsDirector(state, isDirector) {
            state.userInfo.isDirector = isDirector;
        },
        getIsLeader(state, isBigLeader) {
            state.userInfo.isBigLeader = isBigLeader;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setUserInfoStoreage(state, userInfo) {
            setStore(state.storeageUserInfoKey, userInfo);
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
        setUser({commit}) {
            commit("setUserName", {a: 1, b: 2});
        },
        // 退出登录
        handleLogOut({state, commit}, {clientId,pathname}) {
            commit("setSixiId", "");
            commit("setUserInfo", "");
            commit("setUserInfoStoreage", "");
            setStore(storedimensionListKey, "");
            window.location.href = ssoLoginOut({clientId,pathname})
            // return new Promise((resolve, reject) => {
            //     // logout()
            //     //     .then(() => {
            //     //         commit("setSixiId", "");
            //     //         commit("setUserInfo", "");
            //     //         commit("setUserInfoStoreage", "");
            //     //         setStore(storedimensionListKey, "");
            //     //         resolve();
            //     //     })
            //     //     .catch(err => {
            //     //         reject(err);
            //     //     });
            //     //   如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
            //     // commit("setToken", "");
            //     // commit("setAccess", []);
            //     // resolve();
            // });
        },
        async getUserInfoAction({dispatch, state, commit}) {
            let userInfo = JSON.parse(getStore(state.storeageUserInfoKey));
            if (userInfo) {
                console.log("getUserInfoAction", userInfo);
                let userName = "";
                if (userInfo && userInfo.userName && userInfo.departmentName) {
                    userName =
                        userInfo.userName + "(" + userInfo.departmentName + ")";
                }
                commit("setUserInfo", userInfo);
                commit("setAvator", userInfo && userInfo.avatar);
                commit("setUserName", userName);
                commit("setUserId", userInfo && userInfo.userId);
                commit("setSixiId", userInfo && userInfo.sixiId);
                return;
            }
            setTimeout(()=>{
               dispatch("getUserInfo");
            },2000)
           
            return true;
        },
        // 获取用户相关信息
        getUserInfo({state, commit}) {
            return new Promise((resolve, reject) => {
                try {
                    getUserInfoData()
                        .then(res => {
                            if (!res.status || !res.data) {
                                console.error("[debug]:getUserInfoData", res);
                                resolve(res);
                                return;
                            }
                            const data = res.data;
                            let userName = "";
                            if (data && data.userName && data.departmentName) {
                                userName =
                                    data.userName +
                                    "(" +
                                    data.departmentName +
                                    ")";
                            }
                            console.log("getUserInfoData", res.data);
                            commit("setAvator", data && data.avatar);
                            commit("setUserName", userName);
                            commit("setUserId", data && data.userId);
                            commit("setSixiId", data && data.sixiId);
                            commit("setUserInfo", data);
                            commit("setUserInfoStoreage", data);
                            // commit("setAccess", data.permissions);
                            commit("setHasGetInfo", true);
                            getIsDirector().then(result => {
                                if (!result.status) {
                                    console.error("[debug]:getIsDirector", result);
                                    resolve(result);
                                    return;
                                }
                                commit("setIsDirector", result.data || false);
                                data.isDirector = result.data || false;
                                commit("setUserInfoStoreage", data);
                            })
                             getIsLeader().then(result => {
                                if (!result.status) {
                                    console.error("[debug]:getIsLeader", result);
                                    resolve(result);
                                    return;
                                }
                                commit("getIsLeader", result.data || false);
                                data.isBigLeader = result.data || false;
                                commit("setUserInfoStoreage", data);
                            })
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
        getSixiId({state, commit}) {
            let sixiId = getStore(state.storeageKey);
            if (sixiId) {
                commit("setSixiId", sixiId);
            }
        },
        async loginScheduler(
            {dispatch, state, commit},
            {codeData, stateData,clientId,pathname}
        ) {
            console.log("【debug】loginScheduler ** codeData：", codeData);
            console.log("【debug】loginScheduler ** stateData：", stateData);
            let res = "";
            let res2 = "";
            if (codeData) {
                switch (stateData) {
                    case "enterpriseWeChat":
                        res = await sentLoginCodeData({code: codeData});
                        if (res.status !== 200) {
                            console.error("[debug]:sentLoginCodeData", res);
                            return false;
                        }
                        res2 = await dispatch("getUserInfo");
                        if (res2.status !== 200) {
                            console.error("[debug]:getUserInfo", res2);
                            return false;
                        }
                        return true;
                    case "weChat":
                        break;
                    case  "sso":
                        res = await ssoCode({code: codeData,clientId,pathname});
                        res2 = await dispatch("getUserInfo");
                        if (res2.status !== 200) {
                            console.error("[debug]:getUserInfo", res2);
                            return false;
                        }
                        return true;
                }
            }
        }
    }
};
