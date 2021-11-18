import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../router';
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
            config.headers.Authorization = 'Bearer ' + token
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
        console.log(err);
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    ElementUI.MessageBox.confirm('登录失效, 请重新登录！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning'
                    }).then(() => {
                        localStorage.removeItem('TOKEN');
                        router.replace('/login');
                    })
                    break;
                case 403:
                    ElementUI.Message({
                        type: 'error',
                        message: '没有权限'
                    });
                    break;
                default:
                    break;
            }
        } else {
            ElementUI.Message({
                type: 'error',
                message: '网络连接失败，请刷新再试一次！'
            });
        }
        return Promise.reject(err)
    }
);

export default service