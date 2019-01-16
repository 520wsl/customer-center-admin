import api from "@/libs/api.request";
const baseUrl = "/customer";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}
// 批量新增旺旺人员
export const addAliStaff = ({
    companyList,
    peopleList
}) => {
    return post("/staff/ali/add", {
        companyList,
        peopleList
    });
};
// 批量删除人员
export const delAliStaff = ({
    companyList,
    peopleList
}) => {
    return post("/staff/ali/delete", {
        companyList,
        peopleList
    });
};
// 人员搜索
// export const getAliStaffList = ({
//     pageSize,
//     pageNum,
//     name
// }) => {
//     return post("/user/ali/find", {
//         pageSize,
//         pageNum,
//         name
//     });
// };
// 查看已选中
export const getSelectedAliStaffList = ({
    companyList,
    pageNum = 1,
    pageSize = 10,
    name = "",
    isPage = true
}) => {
    return post("/staff/ali/selected", {
        companyList,
        pageNum,
        pageSize,
        name,
        isPage
    });
};