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
