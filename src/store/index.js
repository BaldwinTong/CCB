import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import token from "./modules/token";
import userInfo from './modules/userInfo';

export default new Vuex.Store({
    modules: {
        token,
        userInfo
    }
})