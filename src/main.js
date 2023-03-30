import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/Index'
import "font-awesome/css/font-awesome.min.css"
import axios from "axios"
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI)
Vue.use(mavonEditor)
    //导入自定义模块
import {
    getCurDate,
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
} from './common.js'

Vue.config.productionTip = false
    //设置 axios请求url基础部分
axios.defaults.baseURL = "http://localhost:8080"
    //将axios挂载到vue
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$getCurDate = getCurDate;
Vue.prototype.$setSessionStorage = setSessionStorage;
Vue.prototype.$getSessionStorage = getSessionStorage;
Vue.prototype.$removeSessionStorage = removeSessionStorage;
Vue.prototype.$setLocalStorage = setLocalStorage;
Vue.prototype.$getLocalStorage = getLocalStorage;
Vue.prototype.$removeLocalStorage = removeLocalStorage;

new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')

//router.beforeEach(function(to, from, next) {
//    if (to.meta.needLogin) {
//        //页面是否登录
//        if (localStorage.getItem("token")) {
//            //本地存储中是否有token(uid)数据
//            next(); //表示已经登录
//        } else {
//            //next可以传递一个路由对象作为参数 表示需要跳转到的页面
//            next({
//                name: "login"
//            });
//        }
//    } else {
//        //表示不需要登录
//        next(); //继续往后走
//    }
//});