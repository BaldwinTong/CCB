let list = {
    namespaced: true, // 创建命名空间
    state: { // 存储变量
        categoryList: []
    },
    mutations: { // 定义修改state方法
        getList(state, token) {
            state.categoryList = token
        }
    },
    actions: { // 异步调用mutations

    },

}
export default list