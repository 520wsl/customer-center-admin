import api from "@/libs/api.request";
const baseUrl = "/work-order/evaluate";
const noWorkOrderBaseUrl = "/evaluate";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function noWorkOrderPost(url, params) {
    return api.post(noWorkOrderBaseUrl + url, params);
  }
function get(url, params) {
  return api.get(baseUrl + url, params);
}
// 维度列表
export const getDimensionListData = () => {
  return post("/dimension/list");
};

// 评价详情
export const getEvaluateInfo = (orderNumber = "", sixiId = "") => {
  return post("/evaluate/info", {
    orderNumber,
    sixiId
  });
};

// 获取工单评价列表
export const getWorkEvaluateListData = ({
  workType = -1,
  evaluateName = "",
  companyName = "",
  identifier = "",
  value = "",
  executorId = "",
  timeMin = "",
  timeMax = "",
  pageNum = 1,
  pageSize= 10
}) => {
  return noWorkOrderPost("/evaluatework/listBy", {
    workType,
    evaluateName,
    companyName,
    identifier,
    value,
    executorId,
    timeMin,
    timeMax,
    pageNum,
    pageSize
  });
};
