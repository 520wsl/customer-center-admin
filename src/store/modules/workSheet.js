/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-16 18:48:22
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-20 10:51:04
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
				value: "续开工单"
			},
			{
				key: 3,
				value: "美工工单"
			},
			{
				key: 4,
				value: "深度运营"
			},
			{
				key: 5,
				value: "运营"
			},
			{
				key: 6,
				value: "新开工单"
			}
		],
		workSheetHandleType: [
			{
				key: 0,
				value: "待处理"
			},
			{
				key: 1,
				value: "已超时"
			},  
			{
				key: 2,
				value: "处理中"
			},
			{
				key: 3,
				value: "已完结"
			},
			{
				key: 4,
				value: "已评价"
			}
		],
		workSheetEventType:[
			{
				key: 0,
				value: "普通消息"
			},
			{
				key: 1,
				value: "电话沟通"
			},  
			{
				key: 2,
				value: "电话号码采集"
			},
			{
				key: 3,
				value: "账号密码采集"
			},
			{
				key: 4,
				value: "其他类型"
			}
		]
	},
	mutations: {
		setWorkSheetBaseInfo(state, workSheetBaseInfo) {
			state.workSheetBaseInfo = workSheetBaseInfo;
		}
	},
	actions: {}
};
