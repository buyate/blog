import request from "@/utils/request.js";

/**
 * 获取全部博客
 * @param params
 * @returns {AxiosPromise}
 */
export function all_blog(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/blog/all_blog",
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

/**
 * 获取某一评论
 * @param params
 * @returns {AxiosPromise}
 */
export function comment_by_bid(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/comment/all_comment_by_bid",
        method: "get",
        params: params //注意：如果是get请求请使用 params: params
    });
}

/**
 * 提交评论
 * @param params
 * @returns {AxiosPromise}
 */
export function add_comment(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/comment/add_comment",
        method: "post",
        data: params //注意：如果是get请求请使用 params: params
    });
}


/**
 * 获取博客分页
 * @param params
 * @returns {AxiosPromise}
 */
export function select_by_title1(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/blog/select_by_title1",
        method: "post",
        data: params //注意：如果是get请求请使用 params: params
    });
}