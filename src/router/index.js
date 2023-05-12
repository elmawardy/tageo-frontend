import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Register from '../views/register'
import VerifyUser from '../views/VerifyUser'
import Home from '../views/Home'
import Main from '../views/layouts/Main'
import Groups from '../views/Groups'
import GroupCreate from '../views/GroupCreate'
import Profile from '../views/Profile'
import PostPage from '../components/PostPage'

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
        {path:'post/:id',component: PostPage},
        {path:'u/:id',component: Profile},
        {path:'groupcreate',component: GroupCreate},
      ]
    }
  ]
  
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router