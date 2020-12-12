import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/router/login'

Vue.use(VueRouter)

const routes = [...Login]

const router = new VueRouter({
  routes,
})

export default router
