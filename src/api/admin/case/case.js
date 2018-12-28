import api from "@/libs/api.request";
const baseUrl = "/work-order";
function post(url, params) {
	return api.post(baseUrl + url, params);
}
function get(url, params) {
	return api.get(baseUrl + url, params);
}
// 案例库列表
export const getWorkOrderCaseListData = ({ pageSize, pageNum }) => {
	return post("/case/list", {
		pageSize,
		pageNum
	});
};

// 删除案例库
export const delWorkOrderCaseListData = ({ caseLibraryId }) => {
	return post("/case/delete", {
		caseLibraryId
	});
};

// 查看案例库（工单列表）
export const getWorkOrderCaseInfoData = ({
	caseLibraryId,
	pageSize,
	pageNum
}) => {
	return post("/case/order/list", {
		caseLibraryId,
		pageSize,
		pageNum
	});
};

// 删除案例库中的工单
export const delWorkOrderCaseInfoData = ({ workSheetId }) => {
	return post("/case/delete/order", {
		workSheetId
	});
};

// 修改案例库名称
export const editWorkOrderCaseInfoName = ({ caseLibraryId, name }) => {
	return post("/case/update", { caseLibraryId, name });
};
