// 1、接收封装好的axios全局地址文件
import $http from "@/utils/request.js";
// 引用qs模块
import qs from "qs"


// 2、配置并导出接口
// 商品类型列表接口
export function listproducttype() {
    return $http.get('/productType/list')
        .then((data) => data.data)
}

// 商品分类增加
export function addproducttype(data) {
    return $http.post('/productType/add', qs.stringify(data))
        .then((data) => data.data)
}
// 商品分类修改
export function editproducttype(data) {
    return $http.post('/productType/edit', qs.stringify(data))
        .then((data) => data.data)
}
// 商品分类删除
export function delproducttype(id) {
    return $http.get('/productType/del', {
        params: {
            id: id
        }
    })
        .then((data) => data.data)
}

// 商品分类查询
export function searchproducttype(data) {
    return $http.post('/productType/search', qs.stringify(data))
        .then((data) => data.data)
}