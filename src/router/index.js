//导入vue和vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载导入路由
const Cart =()=> import('views/cart/Cart.vue')
const Home =()=> import('views/home/Home.vue')
const Category =()=> import('views/category/Category.vue')
const Profile =()=> import('views/profile/Profile.vue')
const Detail =()=> import('views/detail/Detail.vue')
// 安装
Vue.use(VueRouter)

//定义实例
const routes = [
    {
        path:'',
        redirect: '/home'
    },
    {
        path:'/home',
        component: Home
    },
    {
       path:'/cart',
       component: Cart
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail/:iid',  //动态路由
        component: Detail
    }
    

]



const router = new VueRouter({
    routes,
    mode: 'history'
})
export default router


