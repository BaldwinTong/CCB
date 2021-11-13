import axios from 'axios';
const service = axios.create({
    timeout: 5000,
    baseURL: 'https://ccbncppc.jmbuilder.cn/api'
})
//添加请求拦截器
service.interceptors.request.use(
    config => {
        let tokenInfo = localStorage.getItem('TOKEN');
        const token = tokenInfo ? tokenInfo : null
        if (token) {
            config.headers.Authorization = 'Bearer '+token
          }
        return config
    },
    err => {
        console.log(err);
        return Promise.reject(err)
    }
);

service.interceptors.response.use(
    res => {
        return res
    },
    err => {
        return Promise.reject(err)
    }
);

export default service
