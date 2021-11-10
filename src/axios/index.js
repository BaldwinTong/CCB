import axios from 'axios';
const service = axios.create({
    timeout: 5000,
    // baseURL:'http://test.com/api'
})
//添加请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
    }
);

service.interceptors.response.use(
    res=>{
        return res
    },
    err=>{
        return Promise.reject(err)
    }
);

export default service
