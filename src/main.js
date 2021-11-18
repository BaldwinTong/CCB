import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import service from './axios/index';
import "./assets/iconfont/iconfont.css";
Vue.prototype.$http = service;
Vue.use(ElementUI);
import resetMessage from './utils/resetMessage';
Vue.prototype.$mess = resetMessage;
require('./excel/Blob.js')
require('./excel/Export2Excel.js')

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')