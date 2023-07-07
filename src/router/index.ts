import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndexView from '../views/IndexView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView
    },
    {
      path: '/link',
      name: 'link',
      component: HomeView
    },
    {
      path:"/login",
      name:"login",
      component: () => import('../views/LoginView.vue')
    },
    {
      path:"/signup",
      name:"register",
      component: () => import('../views/SignView.vue')
    },
    {
      path:"/verify",
      name:"verify",
      component: () => import('../views/VerifyView.vue')
    }
  ]
})

export default router
