import api from "@/libs/api.request";
const baseUrl = "/staff";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

// 人员搜索
export const getAliStaffList = ({
    pageSize,
    pageNum,
    name
}) => {
    return post("/user/ali/find", {
        pageSize,
        pageNum,
        name
    });
};
//获取权限
export const wwOpensManagerLoginSettingQX = () => {
  return post("/user/ali/permission");
};