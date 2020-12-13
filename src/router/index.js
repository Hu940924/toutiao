import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/router/login'
import Layout from '@/router/layout'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [...Login, ...Layout],
})

export default router
