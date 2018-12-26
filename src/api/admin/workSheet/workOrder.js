/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-17 09:49:21
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-12-25 09:39:12
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

// 工单详情--客服回复
export const setWorkOrderCustomerServiceStaffReplyData = ({
	content,
	customerSixiId,
	resourceType,
	workSheetId
}) => {
	return post("/workorder/reply", {
		content,
		customerSixiId,
		resourceType,
		workSheetId
	});
};

// 工单详情 -- 手机号列表
export const getWorkOrderPhoneListData = ({ workSheetId, companySixiId }) => {
	return post("/workorder/phonelist", {
		workSheetId,
		companySixiId
	});
};

// 创建工单
export const saveWorkOrder = ({
	workOrderType,
	context,
	mobile,
	companySixiId,
	companyName,
	customerSixiId,
	wechatNickname,
	sponsorType
}) => {
	return post("/workorder/save", {
		workOrderType,
		context,
		mobile,
		companySixiId,
		companyName,
		customerSixiId,
		wechatNickname,
		sponsorType
	});
};
// 修改工单标题
export const editWorkOrderTitle = ({ title, id }) => {
	return post("/workorder/updatetitle", {
		title,
		id
	});
};

// 修改工单备注
export const editWorkOrderRemark = ({ remark, id }) => {
	return post("/workorder/updateremark", {
		remark,
		id
	});
};


// 修改工单标签
export const editWorkOrderLabel = ({ label, id }) => {
	return post("/workorder/updatelabel", {
		label,
		id
	});
};
