import api from "@/libs/api.request";
const baseUrl = "/work-order/customer";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}
// 客户标签查询
export const getCustomerTagInfo = ({
    customerSixiId
}) => {
    return post("/company/customertab", {
        customerSixiId
    });
};
// 客户添加标签
export const addCustomerTag = ({
    customerSixiId,
    tabIds
}) => {
    return post("/company/addtab", {
        customerSixiId,
        tabIds
    });
};