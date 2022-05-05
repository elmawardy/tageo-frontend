import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Register from '../views/register'
import VerifyUser from '../views/VerifyUser'
import Home from '../views/Home'
import Main from '../views/layouts/Main'
import Groups from '../views/Groups'

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
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {path:'home',component: Home,alias:['/']},
        {path:'groups',component: Groups},
      ]
    }
  ]
  
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router