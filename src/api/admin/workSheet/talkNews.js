/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-17 09:49:45
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-18 17:10:21
 * @explanatory:  工单详情 服务信息
 */

import api from "@/libs/api.request";
const baseUrl = "/work-order";
function post(url, params) {
	return api.post(baseUrl + url, params);
}
function get(url, params) {
	return api.get(baseUrl + url, params);
}

// 工单详情--消息记录
export const getTalkNewsListData = ({ workSheetId, pageNum, pageSize }) => {
	return post("/talknews/list", {
		workSheetId,
		pageNum,
		pageSize
	});
};

// 工单详情 获取倒计时
export const getTalkNewsCountdownTimeData = ({ workSheetId }) => {
	return post("/talknews/countdown", {
		workSheetId
	});
};
// 工单详情  创建对话记录
export const addItemTalkNewsData = ({
	workOrderStatus,
	userSixiId,
	workSheetId,
	eventType
}) => {
	return post("/talknews/save", {
		workOrderStatus,
		userSixiId,
		workSheetId,
		eventType
	});
};

// 更新对话记录
export const updateItemTalkNewsData = ({
	id,
	workOrderId,
	identifier,
	record,
	remark
}) => {
	return post("/talknews/update", {
		id,
		workOrderId,
		identifier,
		record,
		remark
	});
};
