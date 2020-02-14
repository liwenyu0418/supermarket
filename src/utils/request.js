// 企业级封装axios

// 1、安装好axios模块后，引入axios
import axios from "axios";
//2、配置axios到全局，做一个公共的请求地址
const axiosInstance = axios.create({
    // 公共的请求地址
    baseURL: 'http://172.16.14.211:666',//学校ip
    // baseURL: 'http://192.168.0.105:666',//宿舍ip
    // 请求超时时间
    timeout: 3000
})
// 3、导出
export default axiosInstance;