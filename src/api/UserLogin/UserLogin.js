import request from "@/utils/request.js";

/**
 * 登录
 * @param params
 * @returns {AxiosPromise}
 */
export function login(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/user/login",
        method: "get",
        params: params //注意：如果是get请求请使用 params: params
    });
}
/**
 * 新增用户
 * @param params
 * @returns {AxiosPromise}
 */
export function register(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/user/register",
        method: "get",
        params: params //注意：如果是get请求请使用 params: params
    });
}

/**
 * 注销
 * @param params
 * @returns {AxiosPromise}
 */
export function login_out(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/user/login_out",
        method: "get",
        params: params //注意：如果是get请求请使用 params: params
    });
}