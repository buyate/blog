import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import IndexUser from '../views/IndexUser.vue'
import Blog from '../views/Blog.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Comments from '../views/Comments.vue'
import Password from '../views/Password.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Index
    },
    {
        path: '/index',
        name: 'Index',
        component: Index
    },
    {
        path: '/blog',
        name: 'Blog',
        component: Blog
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/user',
        name: 'User',
        component: User
    },
    {
        path: '/comments',
        name: 'Comments',
        component: Comments
    },
    {
        path: '/password',
        name: 'Password',
        component: Password
    },
    {
        path: '/indexuser',
        name: 'IndexUser',
        component: IndexUser
    }
]

const router = new VueRouter({
    routes
})

export default router