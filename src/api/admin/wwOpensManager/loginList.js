import api from "@/libs/api.request";
const baseUrl = "/customer";

function post (url, params) {
  return api.post(baseUrl + url, params);
}

function get (url, params) {
  return api.get(baseUrl + url, params);
}
// 列表
export const getLoginListDate = ({
  pageSize,
  pageNum,
  keyword,
  type,
  staffSixiId,
  status
}) => {
  return post("/company/ali/list", {
    pageSize,
    pageNum,
    keyword,
    type,
    staffSixiId,
    status
  });
};
//批量登录
export const batchLogin = ({
  accountList
}) => {
  return post("/company/ali/login", {
    accountList
  });
};


