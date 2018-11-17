/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-17 09:49:21
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-17 09:58:58
 * @explanatory:  工单详情 基本信息
 */
import api from "@/libs/api.request";
const baseUrl = "/work-order";
function post(url, params) {
	return api.post(baseUrl + url, params);
}
function get(url, params) {
	return api.get(baseUrl + url, params);
}

// 工单详情详情--基本信息
export const getWorkSheetInfoData = ({ workSheetId }) => {
	return post("/worksheet/detail", {
		workSheetId
	});
};

// 工单详情  设置工单 处理 状态 
// handleType  处理状态 0:待处理 1:已超时 2:工单确认 3:设为完结 4:已评价
export const setWorkSheetProcessingState = ({ workSheetId, handleType }) => {
	return post("/worksheet/confirm", {
		workSheetId,
		handleType
	});
};
