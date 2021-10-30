import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routerList = [];

function importAll(r) {
    r.keys().forEach((key) => routerList.push(r(key).default))
    console.log(r.keys());
}

importAll(require.context('./', false, /\.routes\.js/));
const routes = [...routerList, {
    path: '/',
    name: 'home',
    redirect: "home",
    component: Home,
    children: [

    ]
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router