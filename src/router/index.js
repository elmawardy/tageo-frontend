import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Register from '../views/register'
import VerifyUser from '../views/VerifyUser'

Vue.use(VueRouter)

const routes = [
    {
      path: '/signin',
      alias:['/login','/signin'],
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      alias:['/register','/signup'],
      name: 'Register',
      component: Register
    },
    {
      path: '/verify_user',
      alias:['/verify_user'],
      name: 'VerifyUser',
      component: VerifyUser
    }
  ]
  
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router