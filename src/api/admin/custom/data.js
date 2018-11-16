import api from "@/libs/api.request";
const baseUrl = "/customer";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}
// 客户列表
export const getCompanyList = ({
  pageSize,
  pageNum,
  mobile,
  account,
  companyName
}) => {
  return post("/company/listbysearch", {
    pageSize,
    pageNum,
    mobile,
    account,
    companyName
  });
};
// 客户详情
export const getCompanyInfo = ({ sixiId }) => {
  return post("/company/detail", {
    sixiId
  });
};
