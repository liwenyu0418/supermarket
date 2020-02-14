// 1、接收封装好的axios全局地址文件
import $http from "@/utils/request.js";
// 引用qs模块
import qs from "qs"

//2、配置并导出
// 用户列表页
// export const listAccounts = () => $http.get('/account/list', {
//     params: ''
// })
export function listAccounts(data) {
    return $http.get('/account/list', {
        params: data
    }).then((data) => {
        return data.data
    })
}

// 用户添加页,res是成功时传回的参数，相当于resolve;reject是失败的参数
export function addAccount(res) {
    return $http.post('/account/add', qs.stringify(res)).then(res => res.data)
}

// 用户删除
// export const delAccount = (data) => $http.get('/account/del', { params: data }).then(data => data.data)
export function delAccount(id) {
    return $http.get('/account/del', {
        params: {
            id: id
        }
    }).then(data => data.data)
}
// 用户修改
export function editAccount(data) {
    return $http.post('/account/edit', qs.stringify(data)).then(data => data.data)
}
// 用户搜索
export function searchAccount(data) {
    return $http.post('/account/search', qs.stringify(data)).then(data => data.data)
}
// 用户分页
export function pageAccount(data) {
    return $http.post('/account/page', qs.stringify(data)).then(data => data.data)
}


//3、导出

//export default listAccounts;//只导出一个，如果是多个就不写default
// 配置加导出：export const listAccounts=(data)=>$http.get('/account/list',data).then(data => data.data)