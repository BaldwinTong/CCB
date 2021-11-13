const token = {
    namespaced: true, // 创建命名空间
    state: { // 存储变量
        TOKEN: ''
    },
    mutations: { // 定义修改state方法
        setToken(state,token) {
            state.TOKEN = token
        }
    },
    actions: { // 异步调用mutations

    },

}
export default token