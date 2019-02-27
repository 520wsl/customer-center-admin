import api from "@/libs/api.request";
const baseUrl = "/work-order/api/tab";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}
// 标签组列表
export const getTabGroupList = ({
    tabGroupName,
    pageNum,
    pageSize,
    orderBy
}) => {
    return post("/group/list", {
        tabGroupName,
        pageNum,
        pageSize,
        orderBy
    });
};
// 添加标签组
export const addTabGroup = ({
    tabGroupName,
    remark
}) => {
    return post("/group/add", {
        tabGroupName,
        remark
    });
};
// 修改标签组
export const updateTabGroup = ({
    id,
    tabGroupName,
    remark
}) => {
    return post("/group/update", {
        id,
        tabGroupName,
        remark
    });
};
// 标签列表
export const getTabList = ({
    isForbidden,
    tabName,
    tabGroupId,
    pageNum,
    pageSize,
    orderBy
}) => {
    return post("/detail/list", {
        isForbidden,
        tabName,
        tabGroupId,
        pageNum,
        pageSize,
        orderBy
    });
};
// 启用禁用标签
export const changeTabStatus = ({
    isForbidden,
    id
}) => {
    return post("/detail/forbidden", {
        isForbidden,
        id
    });
};
// 添加标签
export const addTab = ({
    tabName,
    tabGroupId,
    remark
}) => {
    return post("/detail/add", {
        tabName,
        tabGroupId,
        remark
    });
};
// 更新标签
export const updateTab = ({
    tabName,
    id,
    remark
}) => {
    return post("/detail/update", {
        tabName,
        id,
        remark
    });
};
// 获取所有标签
export const getAllTabList = () => {
    return post("/detail/all/list", {});
};