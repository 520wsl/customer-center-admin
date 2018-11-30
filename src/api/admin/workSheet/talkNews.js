/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-17 09:49:45
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-29 21:08:55
 * @explanatory:  工单详情 服务信息
 */

import api from "@/libs/api.request";
const baseUrl = "/work-order";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

// 工单详情--消息记录
export const getTalkNewsListData = ({
    workSheetId,
    pageNum,
    pageSize
}) => {
    return post("/talknews/list", {
        workSheetId,
        pageNum,
        pageSize
    });
};

// 工单详情 获取倒计时
export const getTalkNewsCountdownTimeData = ({
    workSheetId
}) => {
    return post("/talknews/countdown", {
        workSheetId
    });
};
/**
 * 工单详情  创建对话记录(信息记录)
 * @param {workOrderStatus} 工单状态 
 * @param {userSixiId} 发送给指定人员sixiId(客户个人)
 * @param {workSheetId} 工单id 
 * @param {eventType} 事件类型 1：电话沟通信息记录（当为该类型时此接口会返回一个对话id） 2：发起电话采集请求 3：发起账号密码采集请求 
 */
export const addItemTalkNewsData = ({
    workOrderStatus,
    userSixiId,
    workSheetId,
    eventType,
    companySixiId
}) => {
    return post("/talknews/save", {
        workOrderStatus,
        userSixiId,
        workSheetId,
        eventType,
        companySixiId
    });
};

// 更新对话记录
export const updateItemTalkNewsData = ({
    id,
    workOrderId,
    identifier,
    record,
    remark
}) => {
    return post("/talknews/update", {
        id,
        workOrderId,
        identifier,
        record,
        remark
    });
};