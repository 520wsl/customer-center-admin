/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-07 15:32:18
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-12-27 14:35:33
 * @explanatory:  axios 接口封装
 */
import axios from "axios";

class HttpRequest {
    constructor(baseUrl = baseUrl) {
        this.baseUrl = baseUrl;
    }

    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            timeout: 10000,
            responseType: "json",
            headers: {
                "If-Modified-Since": 0,
                "Cache-Control": "no-cache"
            }
        };
        return config;
    }
    // 各种状态码处理
    setResponse(status, msg, url, params = {}) {
        switch (status) {
            case 500:
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                console.error(
                    "服务器错误500：请截图给管理员，以便快捷修复错误！" +
                    " \n请求参数：\n===>" +
                    params +
                    "    \nurl: \n===>" +
                    url +
                    "\n错误信息：\n===>" +
                    msg
                );
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                alert(
                    "服务器错误500：请截图给管理员，以便快捷修复错误！" +
                    " \n请求参数：\n===>" +
                    params +
                    "\nurl: \n===>" +
                    url +
                    "\n错误信息：\n===>" +
                    msg
                );
                break;
            case 502:
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                console.error(
                    "服务器错误502：请截图给管理员，以便快捷修复错误！" +
                    " \n请求参数：\n===>" +
                    params +
                    "    \nurl: \n===>" +
                    url +
                    "\n错误信息：\n===>" +
                    msg
                );
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                alert(
                    "服务器错误502：请截图给管理员，以便快捷修复错误！" +
                    " \n请求参数：\n===>" +
                    params +
                    "\nurl: \n===>" +
                    url +
                    "\n错误信息：\n===>" +
                    msg
                );
                break;
            case 503:
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                console.error(
                    "服务器错误503：请截图给管理员，以便快捷修复错误！" +
                    " \n请求参数：\n===>" +
                    params +
                    "    \nurl: \n===>" +
                    url +
                    "\n错误信息：\n===>" +
                    msg
                );
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                alert(
                    "服务器错误503：请截图给管理员，以便快捷修复错误！" +
                    " \n请求参数：\n===>" +
                    params +
                    "\nurl: \n===>" +
                    url +
                    "\n错误信息：\n===>" +
                    msg
                );
                break;

            case 404:
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                console.error(
                    "资源请求404：请截图给管理员，以便快捷修复错误！" +
                    " \n请求参数：\n===>" +
                    params +
                    "    \nurl: \n===>" +
                    url +
                    "\n错误信息：\n===>" +
                    msg
                );
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                alert(
                    "资源请求404：请截图给管理员，以便快捷修复错误！" +
                    " \n请求参数：\n===>" +
                    params +
                    "\nURL: \n===>" +
                    url +
                    "\n错误信息：\n===>" +
                    msg
                );
                break;
            case 403:
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                console.error(msg);
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                // alert(msg);
                break;
            case 401:
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                console.error("未登录或登陆超时 401：请重新登陆");
                console.log(
                    "-------------------【错误拦截】------------------------------"
                );
                alert("未登录或登陆超时 401：请重新登陆");
                // this.goLogin();
                break;

            default:
                break;
        }
    }

    goLogin() {
        location.href = "/admin/login";
    }

    interceptors(instance) {
        // axios 请求拦截
        instance.interceptors.request.use(
            config => {
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        // axios 响应拦截
        instance.interceptors.response.use(
            res => {
                let { data } = res;
                if (data && data.status) {
                    this.setResponse(data.status, data.msg, res.config.url);
                }
                if (res && data && data.status !== 200) {
                    data.data = {};
                }

                return data;
            },
            error => {
                let msg =
                    (error.response.data && error.response.data.msg) ||
                    (error.response.data && JSON.stringify(error.response.data)) ||
                    "";
                this.setResponse(
                    error.response.status,
                    msg,
                    error.response.config.url,
                    error.response.config.data || {}
                );
                if (error.response.status === 403) {
                    return Promise.reject(error.response.data);
                }
                return Promise.reject(error);
            }
        );
    }
    request(options) {
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance);
        return instance(options);
    }
}
export default HttpRequest;
/**
 *                             _ooOoo_
 *                            o8888888o
 *                            88" . "88
 *                            (| -_- |)
 *                            O\  =  /O
 *                         ____/`---'\____
 *                       .'  \\|     |//  `.
 *                      /  \\|||  :  |||//  \
 *                     /  _||||| -:- |||||-  \
 *                     |   | \\\  -  /// |   |
 *                     | \_|  ''\---/''  |   |
 *                     \  .-\__  `-`  ___/-. /
 *                   ___`. .'  /--.--\  `. . __
 *                ."" '<  `.___\_<|>_/___.'  >'"".
 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
 *          ======`-.____`-.___\_____/___.-`____.-'======
 *                             `=---='
 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                     佛祖保佑        永无BUG
 *            佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
*/