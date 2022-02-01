import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../plugins/firebase'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
      path:'/',
      component:() => import('@/Layouts/padrão'),
      meta: {
        requiresAuth: true
      },
      children:[
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: '/perfil',
          name: 'Perfil',
          component: () => import(/* webpackChunkName: "perfil" */ '../views/perfil.vue')
        },

      ]
  },
  {
      path:'/',
      component:() => import('@/Layouts/Blank'),
      children:[{
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
      }
    ]
  }
] 
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser){
      next('Login')
    } else{
      next()
    }
})

export default router
