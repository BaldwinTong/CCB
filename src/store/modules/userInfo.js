const userInfo = {
    namespaced: true, // 创建命名空间
    state: { // 存储变量
        userInfo: {}
    },
    mutations: { // 定义修改state方法
        setUserInfo(state, obj) {
            state.userInfo = obj
        }
    },
    actions: { // 异步调用mutations
        actionsUserInfo: ({ commit }, obj) => {
            commit("setUserInfo", obj)
        }
    },

}
export default userInfo