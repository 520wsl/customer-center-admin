import api from "@/libs/api.request";
const baseUrl = "/evaluate-service";
function post(url, params) {
	return api.post(baseUrl + url, params);
}
function get(url, params) {
	return api.get(baseUrl + url, params);
}
// 模板列表
export const getTemplateListData = ({ pageNum, pageSize, select, keyword }) => {
	return post("/template/list", {
		pageNum,
		pageSize,
		select,
		keyword
	});
};
// 模板状态修改
export const setTemplateStatusType = ({ id }) => {
	return post("/template/setstatus", { id });
};

// 删除模板

export const delTemplateData = ({ id }) => {
	return post("/template/del", { id });
};

// 获取模板详情
export const getTemplateInfoData = ({ id }) => {
	return post("/template/info", { id });
};

// 模板添加
export const addItemTemplateData = ({ id, templateTitle, status, content }) => {
	console.log(id,templateTitle,status,content)
	return post("/template/add", {
		id,
		templateTitle,
		status,
		content
	});
};
