/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-17 11:45:46
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-17 20:04:50
 * @explanatory:  拨打电话
 */
import config from "@/config";
import api from "@/libs/api.request";

const baseUrl = config.callPhonePath;

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

// 工单详情详情--基本信息
export const callPhoneAction = ({
                                    phone,
                                    callback = "cb_callout",
                                    recordId
                                }) => {
    return api.jsonp(
        baseUrl +
        "/callout?phone=" +
        phone +
        "&&callback=cb_callout&&recordId=" +
        recordId
    );
};

// 工单详情详情--获取当前账号
export const AccountStatus = () => {
    return api.jsonp(
        baseUrl +
        "/AccountStatus?callback=cb_account"
    );
};
