import api from "@/libs/api.request";
const baseUrl = "/customer";

function post (url, params) {
  return api.post(baseUrl + url, params);
}

function get (url, params) {
  return api.get(baseUrl + url, params);
}
// 列表
export const wwOpensManagerLoginListDate = ({
  pageSize,
  pageNum,
  keyword,
  groupName,
  type,
  staffSixiId,
  status
}) => {
  return post("/company/ali/list", {
    pageSize,
    pageNum,
    keyword,
    groupName,
    type,
    staffSixiId,
    status
  });
};
//批量登录
export const wwOpensManagerLoginListBatchLogin = ({
  accountList
}) => {
  return post("/company/ali/login", {
    accountList
  });
};
//分组列表
export const wwOpensManagerLoginGetGroup = () => {
  return post("/company/ali/group/list");
};
//加入分组
export const wwOpensManagerLoginSetGroup = ({
  companySixiIdList, groupName
}) => {
  return post("/company/ali/group/set", {
    companySixiIdList, groupName
  });
};