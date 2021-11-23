const userInfo = {
    namespaced: true, // 创建命名空间
    state: { // 存储变量
        userInfo: JSON.parse(sessionStorage.getItem(`userInfo`)) || {}
    },
    mutations: { // 定义修改state方法
        setUserInfo(state, obj) {
            sessionStorage.setItem(`userInfo`, JSON.stringify(obj))
            state.userInfo = obj;
        }
    },
    actions: { // 异步调用mutations
        UpdateUserInfo(context, obj) {
            context.commit("setUserInfo", obj)
        }
    },

}
export default userInfo