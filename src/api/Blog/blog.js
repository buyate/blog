import request from "@/utils/request.js";

/**
 * 获取博客
 * @param params
 * @returns {AxiosPromise}
 */
export function add_blog(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "blog/add_blog",
        method: "post",
        data: params //注意：如果是get请求请使用 params: params
    });
}