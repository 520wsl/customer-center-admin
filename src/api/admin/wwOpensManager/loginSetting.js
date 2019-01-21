import api from "@/libs/api.request";
const baseUrl = "/customer/";

function post (url, params) {
  return api.post(baseUrl + url, params);
}

function get (url, params) {
  return api.get(baseUrl + url, params);
}
// 列表
export const wwOpensManagerLoginSettingListDate = ({
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
// 清空
export const wwOpensManagerLoginSettingEmptyData = ({ companyList }) => {
  return post("/staff/ali/empty", { companyList });
};
// 设置状态
export const wwOpensManagerLoginSettingSetStatus = ({
  status,
  companyList
}) => {
  return post("/company/ali/change/status", {
    status,
    companyList
  });
};

