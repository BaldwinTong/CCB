import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import whiteList from '../views/pages/whitelist.vue'
import farmProduct from '../views/pages/farmProduct.vue'
import productPrice from '../views/pages/productPrice.vue'
import SingleLimit from '../views/pages/SingleLimit.vue'
import transactionRecode from '../views/pages/transactionRecode.vue'
import username from '../views/pages/username.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const routerList = [];

function importAll(r) {
    r.keys().forEach((key) => routerList.push(r(key).default))
}

importAll(require.context('./', false, /\.routes\.js/));
const routes = [...routerList, {
    path: '/',
    redirect: 'login'
}, {
    path: '/Home',
    name: 'Home',
    component: Home,
    children: [{
        path: '/whiteList',
        name: 'whiteList',
        component: whiteList,
    }, {
        path: '/farmProduct',
        name: 'farmProduct',
        component: farmProduct,

    }, {
        path: '/productPrice',
        name: 'productPrice',
        component: productPrice,

    }, {
        path: '/SingleLimit',
        name: 'SingleLimit',
        component: SingleLimit,

    }, {
        path: '/transactionRecode',
        name: 'transactionRecode',
        component: transactionRecode,

    }, {
        path: '/username',
        name: 'username',
        component: username,
    }]
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router