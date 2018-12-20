/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-17 09:49:21
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-29 10:27:58
 * @explanatory:  工单详情 基本信息
 */
import api from "@/libs/api.request";
const baseUrl = "/work-order";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

// 工单详情详情--基本信息
export const getWorkSheetInfoData = ({
    workSheetId
}) => {
    return post("/worksheet/detail", {
        workSheetId
    });
};

// 工单详情  设置工单 处理 状态
// handleType  处理状态 0:待处理 1:已超时 2:工单确认 3:设为完结 4:已评价
export const setWorkSheetProcessingState = ({
    workSheetId,
    handleType
}) => {
    return post("/worksheet/confirm", {
        workSheetId,
        handleType
    });
};
// 工单列表
export const getWorkSheetListData = ({
    companyName,
    identifier,
    workType,
    handleType,
    startTime,
    endTime,
    timeType,
    durationHour,
    responseHour,
    isRead,
    execute,
    partake,
    sortType,
    sort,
    telephone,
    pageNum,
    pageSize,
    count,
    customerId
}) => {
    return post("/worksheet/list", {
        companyName,
        identifier,
        workType,
        handleType,
        startTime,
        endTime,
        timeType,
        durationHour,
        responseHour,
        isRead,
        execute,
        partake,
        sortType,
        sort,
        telephone,
        pageNum,
        pageSize,
        count,
        customerId
    });
};
// 公司工单列表
export const getWorkcustomerListData = ({
    companyId,
    companyName,
    identifier,
    workType,
    handleType,
    startTime,
    endTime,
    timeType,
    durationHour,
    responseHour,
    isRead,
    execute,
    partake,
    sortType,
    sort,
    telephone,
    pageNum,
    pageSize,
    count,
    customerId
}) => {
    return post("/worksheet/customerlist", {
        companyId,
        companyName,
        identifier,
        workType,
        handleType,
        startTime,
        endTime,
        timeType,
        durationHour,
        responseHour,
        isRead,
        execute,
        partake,
        sortType,
        sort,
        telephone,
        pageNum,
        pageSize,
        count,
        customerId
    });
};
// 工单详情详情--指派工单
export const assignWorksheet = ({
    workSheetId,
    executorSixiId
}) => {
    return post("/worksheet/assign", {
        workSheetId,
        executorSixiId
    });
};
// 再次发送评价通知
export const againEvaluate = ({
    workSheetId
}) => {
    return post("/worksheet/againevaluate", {
        workSheetId
    });
};

// 部门工单列表
export const getLeaderList = ({
    customerId,
    identifier,
    handleType,
    startTime,
    endTime,
    pageNum,
    pageSize,
    workType,
    durationHour,
    responseHour,
    companyName,
    timeType,
    sortType,
    sort,
    departmentId
}) => {
    return post("/leader/list", {
        customerId,
        identifier,
        handleType,
        startTime,
        endTime,
        pageNum,
        pageSize,
        workType,
        durationHour,
        responseHour,
        companyName,
        timeType,
        sortType,
        sort,
        departmentId
    });
};

// 客户权限部门
export const getLeaderDepartment = () => {
    return post("/staff/department/leader/list", {});
};

// 获取部门人员信息
export const getLeaderDepartmentList = ({ pid }) => {
    return post("/staff/user/listbypid", { pid });
};