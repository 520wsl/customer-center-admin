/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-16 18:48:05 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-12-01 10:08:05
 * @explanatory:  授权模块
 */
import { setItem, getItem, removeStore } from "@/libs/util/session";
import { getDimensionListData } from "@/api/admin/evaluate/dimension";
const storeKey = "dimensionList";

export default {
	state: {
		dimensionListData: []
	},
	mutations: {
		setDimensionListData(state, dimensionListData) {
			state.dimensionListData = dimensionListData;
		}
	},
	actions: {
		async getDimensionList({ commit }) {
			let store = getItem(storeKey);

			if (!store) {
				let res = await getDimensionListData();
				if (res.status !== 200) {
					console.error("getDimensionListData 获取维度列表", res.msg);
					return;
				}
				setItem(storeKey, res.data);
			}
			commit("setDimensionListData", JSON.parse(store));
		}
	}
};
