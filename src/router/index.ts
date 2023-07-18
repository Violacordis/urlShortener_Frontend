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
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: "/login",
      name: "login",
      component: () => import('../views/LoginView.vue')
    },
    {
      path: "/resetpassword",
      name: "resetpassword",
      component: () => import('../views/ResetPasswordView.vue')
    },
    {
      path: "/signup",
      name: "register",
      component: () => import('../views/SignView.vue')
    },
    {
      path: "/verify",
      name: "verify",
      component: () => import('../views/VerifyView.vue')
    },
    {
      path: "/user",
      name: "user",
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/UserView.vue'),
    }
  ]
})
// check if a user json is in local storage before linking to link page
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else if (user && to.name === 'login' || user && to.name === 'signup' || user && to.name === 'home') {
    next({
      path: '/link',
    })
  }
  else {
    next()
  }
})
export default router
