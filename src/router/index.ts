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
      component: HomeView,
      meta: {
        requiresAuth: true
      }
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
// check if a user json is in local storage before linking to link page
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = localStorage.getItem('user')
    if (!user) {
      next({
        path: '/login',
      })
    } 
    else if (user && to.name === 'login' || to.name === 'signup' || to.name === 'home') {
      next({
        path: '/link',
      })
    }
  }
  else {
    next()
  }
})
export default router
