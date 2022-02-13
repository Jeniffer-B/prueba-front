import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateProfile from '../views/CreateProfile.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'CreateProfile',
    component: CreateProfile
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import( '../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
