import { setStore, getStore, removeStore } from "@/libs/util/storeage";
import { getDimensionListData } from "@/api/admin/evaluate/dimension";
const storeKey = "dimensionList";

export default {
	namespaced: true,
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
			let store = getStore(storeKey);

			if (!store) {
				let res = await getDimensionListData();
				if (res.status !== 200) {
					console.error("getDimensionListData 获取维度列表", res.msg);
					return;
				}
				setStore(storeKey, res.data);
			}
			commit("setDimensionListData", JSON.parse(store));
		}
	}
};
