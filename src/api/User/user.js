import request from "@/utils/request.js";

/**
 * 获取博客
 * @param params
 * @returns {AxiosPromise}
 */
export function blog_by_uid(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/blog/blog_by_uid",
        method: "post",
        data: params //注意：如果是get请求请使用 params: params
    });
}



/**
 * 查找博客
 * @param params
 * @returns {AxiosPromise}
 */
export function select_by_title2(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,ss
        url: "/blog/select_by_title2",
        method: "post",
        data: params //注意：如果是get请求请使用 params: params
    });
}


/**
 * 删除博客
 * @param params
 * @returns {AxiosPromise}
 */
export function delete_blog(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/blog/delete_blog",
        method: "post",
        data: params //注意：如果是get请求请使用 params: params
    });
}

/**
 * 获取某一博客
 * @param params
 * @returns {AxiosPromise}
 */
export function blog_by_bid(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/blog/blog_by_bid",
        method: "get",
        params: params //注意：如果是get请求请使用 params: params
    });
}


export function update_by_bid(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/blog/update_blog",
        method: "post",
        data: params //注意：如果是get请求请使用 params: params
    });
}