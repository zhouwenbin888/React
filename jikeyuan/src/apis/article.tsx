import { dataitem } from "@/pages/Article";
import { article, article2 } from "@/pages/Publish";
import { request } from "@/utils";
//登录请求
export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET',
    })
}
export function subArticleAPI(formdata: article) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data: formdata
    })
}
export function upArticleAPI(formdata: article2) {
    return request({
        url: `/mp/articles/${formdata.id}?draft=false`,
        method: 'PUT',
        data: formdata
    })
}
export function getArticleAPI(params: dataitem) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}
export function delArticleAPI(id: string) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE',
    })
}
export function getArticleIdAPI(id: string) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'GET'
    })
}