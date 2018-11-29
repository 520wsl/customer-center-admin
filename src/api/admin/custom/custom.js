import api from "@/libs/api.request";
const baseUrl = "/customer";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}
// 客户列表
export const getCustomerListDate = ({
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
export const getCustomerInfoData = ({
    sixiId
}) => {
    return post("/company/detail", {
        sixiId
    });
};
// 微信解绑
export const setWechatUntied = ({
    openId
}) => {
    return post("/wechat/untied", {
        openId
    });
};
// 客户指派人员列表
export const getstaffListData = ({
    customerSixiId
}) => {
    return post("/staff/list", {
        customerSixiId
    });
};
// 客户公司列表
export const getCustomerbymobileList = ({
    mobile
}) => {
    return post("/customer/getcustomerbymobile", {
        mobile
    });
};

// 编辑已绑定账号
export const updateBindInfo = ({
    sex,
    sixiId,
    callName,
    mobile,
    role
}) => {
    return post("/customer/update", {
        sex,
        sixiId,
        callName,
        mobile,
        role
    });
};