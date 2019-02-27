import api from "@/libs/api.request";

const baseUrl = "/work-order/customer";

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
                                        companyName,
                                        operator,
                                        callName = "",
                                        sendCode,
                                        companyType,
                                        binding,
                                        customerId
                                    }) => {
    return post("/company/listbysearch", {
        pageSize,
        pageNum,
        mobile,
        account,
        companyName,
        operator,
        callName,
        sendCode,
        companyType,
        binding,
        staffSixiId:customerId
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
                                    id
                                }) => {
    return post("/wechat/untied", {
        id
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
                                   id,
                                   customerSixiId,
                                   companySixiId,
                                   deletedAt = null,
                                   operator,
                                   callName,
                                   mobile,
                                   role
                               }) => {
    return post("/customer/update", {
        sex,
        id,
        customerSixiId,
        companySixiId,
        deletedAt,
        operator,
        callName,
        mobile,
        role
    });
};
// 批量设置客服人员
/**
 *
 * @param {staffSetListFormList} 设置人员
 * {
      "companySixiId": "1182862037307361279", // 公司id
      "staffList": [
        {
          "staffSixiId": "sixi1183688690736592895",
          "staffName": "郭靖",
          "staffAlias": "",
          "staffTagId": 1,
          "departmentId": 14
        }
      ]
    }
 *
 */
export const setcompanystaff = ({
                                    staffSetListFormList
                                }) => {
    return post("/customer/update", {
        staffSetListFormList
    });
};
// 是否发送了二维码
export const setSendQRcord = ({
                                  id
                              }) => {
    return post("/wechat/sendqrcord", {
        id
    });
};
