import api from "@/libs/api.request";
const baseUrl = "/staff";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

export const getDepartmentData = () => {
    return post("/department/listdepartment");
};
export const getUserData = ({
    departmentId
}) => {
    return post("/department/selectuser", {
        departmentId
    });
};