import {
    login,
    logout,
    getUserInfoData
} from "@/api/admin/user/user";
import {
    setToken,
    getToken
} from "@/libs/util";
import {
    setStore,
    getStore
} from "@/libs/util/storeage";

import {
    getDepartmentData
} from "@/api/admin/department/department";

export default {
    state: {
        departmentData: []
    },
    actions: {
        async getDepartmentData({
            state,
            commit
        }) {
            let store = localStorage.departmentData || '';
            var list = [];
            if (!store) {
                let arr = await getDepartmentData();
                const list = arr[0].children || [];
                if (list.length > 0) {
                    localStorage.departmentData = JSON.stringify(list);
                } else {
                    localStorage.departmentData = '';
                }
            } else {
                list = JSON.parse(store)
            }
            commit("SetDepartmentData", list);
        }
    },
    mutations: {
        SetDepartmentData(state, data) {
            state.departmentData = data;
        }
    }
}