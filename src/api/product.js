// 1、接收封装好的axios
import $http from "@/utils/request.js";
// 引入qs模块
import qs from 'qs'

// 2、配置并导出
// 商品列表页
export function listProduct(data) {
    return $http.get('/product/list', data).then(data => data.data)
}

// 商品增加页
export function addProduct(data) {
    return $http.post('/product/add', qs.stringify(data)).then(data => data.data)
}

// 商品增加页图片上传接口
// $http.defaults.baseURL 是从全局axios配置中，拿到baseURL配置，defaults是$http的一个属性，condele.dir($http)可以打印出来看，后面拼接的是图片上传接口地址     http://172.16.14.211:666/product/upload
export const uploadApi = $http.defaults.baseURL + '/product/upload'
// 照片回填时，服务器文件加载的地址
export const uploadDir = $http.defaults.baseURL + '/upload/product/'

// 商品回填页
export function editProduct(data) {
    return $http.post('/product/edit', qs.stringify(data)).then(data => data.data)
}

// 商品删除页
export function delProduct(id) {
    return $http.get('/product/del', {
        params: {
            id: id
        }
    }).then(data => data.data)
}

