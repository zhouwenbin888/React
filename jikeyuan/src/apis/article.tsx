import { dataitem } from "@/pages/Article";
import { article } from "@/pages/Publish";
import { request } from "@/utils";
//登录请求
export function getChannelAPI(){
   return request({
        url:'/channels',
        method:'GET',
    })
}
export function subArticleAPI(formdata:article){
    return request({
         url:'/mp/articles?draft=false',
         method:'POST',
         data:formdata
     })
 }
 export function getArticleAPI(params:dataitem){
    return request({
         url:'/mp/articles',
         method:'GET',
         params
     })
 }