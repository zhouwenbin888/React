import { logindata } from "@/pages/Login";
import { request } from "@/utils";
//登录请求
export function loginAPI(formdata:logindata){
   return request({
        url:'/authorizations',
        method:'POST',
        data:formdata
    })
}
//获取个人信息
export function getProfileAPI(){
   return request({
        url:'/user/profile',
        method:'GET',
    })
}

