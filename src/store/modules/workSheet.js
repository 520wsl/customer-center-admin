/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-16 18:48:22
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-16 20:42:56
 * @explanatory:  工单模块
 */
import { getWorkSheetInfoData } from "@/api/admin/workSheet/workSheet";
export default {
	state: {
		workSheetBaseInfo: {},
		workSheetType: [
			{
				key: 0,
				value: "未知资源类型"
			},
			{
				key: 2,
				value: "(xk)找续开工单"
			},
			{
				key: 3,
				value: "(mg)找美工工单"
			},
			{
				key: 4,
				value: "(sdyy)找深度运营"
			},
			{
				key: 5,
				value: "(yy)找运营"
			}
		]
	},
	mutations: {
		setWorkSheetBaseInfo(state, workSheetBaseInfo) {
			state.workSheetBaseInfo = workSheetBaseInfo;
		}
	},
	actions: {
		async getWorkSheetInfo() {
			let res = await getWorkSheetInfoData({ workSheetId: 8 });
			console.log("getWorkSheetInfo", res);
			if (res.status !== 200) {
				console.error("getWorkSheetInfo", res.msg);
				this.$Modal.error({
					title: "工单详情",
					content: res.msg
				});
				return;
			}
		}
	}
};
