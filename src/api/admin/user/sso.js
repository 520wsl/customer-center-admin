import api from "@/libs/api.request";

const baseUrl = "/work-order";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

function getRedirectUri() {
    return window.location.href
}

export const ssoCode = ({code, clientId}) => {
    let redirectUri = getRedirectUri()
    return post("/code", {code, redirectUri, clientId});
};
export const ssoLogin = ({clientId}) => {
    let redirectUri = getRedirectUri()
    return '/api' + baseUrl + '/login?redirectUri=' + redirectUri + '&clientId=' + clientId
};

export const ssoLoginOut = ({clientId}) => {
    let redirectUri = getRedirectUri()
    return '/api' + baseUrl + '/loginout?redirectUri=' + redirectUri + '&clientId=' + clientId
};


