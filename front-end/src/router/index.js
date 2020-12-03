import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ManageMemories from '../views/ManageMemories.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: Home
},
  {
    path: '/manage',
    name: 'manage',
    component: ManageMemories
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
