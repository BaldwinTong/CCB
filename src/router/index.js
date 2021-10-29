import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routerList = [];
function importAll(r) {
  r.keys().forEach((key) => routerList.push(r(key).default))
}

importAll(require.context('./', false, /\.routes\.js/));
const routes = [...routerList, { path: '/', name: 'home', component: Home }]


/**
 * 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]
 */


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
