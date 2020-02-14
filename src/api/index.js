// 1、接收封装好的axios全局地址文件
import $http from "@/utils/request.js";
// 引用qs模块
import qs from "qs"

// 配置并导出接口
// 登录接口
export function doLogin(data) {
    return $http.post('/login', qs.stringify(data))
        .then((data) => {
            return data.data
        })
}

// 注销接口
export function doLogout(data) {
    return $http.post('/logout', qs.stringify(data))
        .then((data) => {
            return data.data
        })
}