import api from "@/libs/api.request";

const baseUrl = "/work-order";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

// 案例库列表（视图1）
export const getWorkOrderCaseListData = ({pageSize, pageNum}) => {
    return post("/case/list", {
        pageSize,
        pageNum
    });
};

// 删除案例库
export const delWorkOrderCaseListData = ({caseLibraryId}) => {
    return post("/case/delete", {
        caseLibraryId
    });
};

// 查看案例库（工单列表）
export const getWorkOrderCaseInfoData = ({
                                             caseLibraryId,
                                             companyName,
                                             identifier,
                                             workType,
                                             startTime,
                                             endTime,
                                             timeType,
                                             durationHour,
                                             responseHour,
                                             pageNum,
                                             pageSize,
                                             count,
                                             customerId
                                         }) => {
    return post("/case/order/list", {
        caseLibraryId,
        companyName,
        identifier,
        workType,
        startTime,
        endTime,
        timeType,
        durationHour,
        responseHour,
        pageNum,
        pageSize
    });
};

// 查看案例库（视图2）
export const getWorkOrderCaseListData2 = ({
                                              companyName,
                                              identifier,
                                              workType,
                                              startTime,
                                              endTime,
                                              timeType,
                                              durationHour,
                                              responseHour,
                                              pageNum,
                                              cName,
                                              pageSize
                                          }) => {
    return post("/case/database/list", {
        companyName,
        identifier,
        workType,
        startTime,
        endTime,
        timeType,
        durationHour,
        responseHour,
        pageNum,
        cName,
        pageSize
    });
};


// 删除案例库中的工单
export const delWorkOrderCaseInfoData = ({workSheetId, caseLibraryId}) => {
    return post("/case/delete/order", {
        workSheetId,
        caseLibraryId
    });
};

// 修改案例库名称
export const editWorkOrderCaseInfoName = ({caseLibraryId, name}) => {
    return post("/case/update", {caseLibraryId, name});
};
// 创建案例库
export const createWorkOrderCase = ({caseName}) => {
    return post("/case/create", {
        caseName
    });
};
// 加入案例库
export const joinWorkOrderCase = ({workOrderId, caseLibraryList}) => {
    return post("/case/join", {
        workOrderId,
        caseLibraryList
    });
};
// 发送案例库列表
export const getWorkOrderSendCaseList = ({customerSixiId}) => {
    return post("/case/send/list", {
        customerSixiId
    });
};
// 发送案例
export const senWorkOrderdCase = ({id, hour, minute, customerSixiId}) => {
    return post("/case/sendcase", {
        id,
        hour,
        minute,
        customerSixiId
    });
};
// 停止访问案例库
export const sotpVisitCase = ({customerSixiId, caseLibraryId}) => {
    return post("/case/sotpvisit", {
        customerSixiId,
        caseLibraryId
    });
};
// 是否总监
export const getIsDirector = () => {
    return post("/staff/department/director", {});
};

// 是否总监
export const getIsLeader = () => {
    return post("/staff/department/leader", {});
};