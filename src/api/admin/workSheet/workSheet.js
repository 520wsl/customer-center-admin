/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-17 09:49:21
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2019-01-05 13:40:20
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

// 工单详情  设置工单 受理 状态
// handleType  受理状态 0:待受理 1:已超时 2:工单确认 3:设为完结 4:已评价
export const setWorkSheetProcessingState = ({
    workSheetId,
    handleType,
    handlerMode = 1
}) => {
    return post("/worksheet/confirm", {
        workSheetId,
        handleType,
        handlerMode
    });
};
// 工单详情  受理工单
export const setWorkSheetAcceptance = ({
    workSheetId
}) => {
    return post("/worksheet/grabsheet", {
        workSheetId
    });
};
// 工单详情  带我受理第一二三级信息
export const getWorkorderPendingPerson = ({
    workSheetId
}) => {
    return post("/worksheet/accept/list/by/id", {
        workSheetId
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
// 工单详情详情--工单移交
export const assignWorksheet = ({
                                    workSheetId,
                                    sixiId,
                                    remark
                                }) => {
    return post("/worksheet/transfer", {
        workSheetId,
        sixiId,
        remark
    });
};
// 工单详情详情--工单移交详情
export const transferWorksheetInfo = ({
                                          workSheetId
                                      }) => {
    return post("/worksheet/transfer/detail", {
        workSheetId
    });
};
// 工单详情详情--工单移交确认
export const sureTransferWorksheet = ({
                                          workSheetId,
                                          state,
                                          refuseReason
                                      }) => {
    return post("/worksheet/transfer/confirm", {
        workSheetId,
        state,
        refuseReason
    });
};
// 工单详情详情--工单移交撤回
export const retractTransferWorksheet = ({
                                             workSheetId,
                                             userId
                                         }) => {
    return post("/worksheet/transfer/back", {
        workSheetId,
        userId
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
    return post("/worksheet/leader/list", {
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
export const getLeaderDepartmentList = ({pid}) => {
    return post("/staff/user/listbypid", {pid});
};

// 代我受理 工单列表
export const getAcceptedListData = ({
                                        pageSize,
                                        pageNum,
                                        companyName,
                                        identifier,
                                        workType,
                                        handleType,
                                        sponsor,
                                        timeMin,
                                        timeMax,
                                    }) => {
    return post("/worksheet/get/accepted/list", {
        pageSize,
        pageNum,
        companyName,
        identifier,
        workType,
        handleType,
        sponsor,
        timeMin,
        timeMax,
    })
}