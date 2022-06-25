import Vue from 'vue'
import App from './App.vue'

// 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 插件 Element-ui
Vue.use(ElementUI)

// 导入全局初始化样式
import './assets/index.css'
//说是解决重写路由的措施  感觉不是这个的作用
// const VueRouterPush = VueRouter.prototype.push 
// VueRouter.prototype.push = function push (to) {
//     return VueRouterPush.call(this, to).catch(err => err)
// }
// 路由整合
import VueRouter from 'vue-router'
Vue.use(VueRouter)
    // 导入对应的路由
import discovery from './views/01.discovery.vue'
import playlists from './views/02.playlists.vue'
import songs from './views/03.songs.vue'
import mvs from './views/04.mvs.vue'
import result from './views/05.result.vue'
import playlist from './views/06.playlist.vue'
import mv from './views/07.mv.vue'
import login from './views/08.login.vue'
import users from './views/09.users.vue'
const router = new VueRouter({
        routes: [{
                // 登录界面
                path: '/login',
                component: login
            }, {
                // 用户界面
                path: '/users',
                component: users
            },
            {
                path: '/',
                redirect: '/discovery'
            },
            {
                // 发现音乐
                path: '/discovery',
                component: discovery
            },
            {
                // 推荐歌单
                path: '/playlists',
                component: playlists
            },
            {
                // 推荐歌单 详情
                path: '/playlist',
                component: playlist
            },
            {
                // 最新音乐
                path: '/songs',
                component: songs
            },
            {
                // 最新音乐
                path: '/mvs',
                component: mvs
            },
            // mv详情
            {
                path: '/mv',
                component: mv
            },
            // 搜索结果页
            {
                path: '/result',
                component: result
            }
        ]
    })
    // 前置路由导航守卫：所有页面的导航都会经过这里
    // 守卫页面导航

router.beforeEach((to, from, next) => {
    const user = window.localStorage.getItem('user')
        //校验是否登录，已登录则放行
    if (to.path !== '/login') {
        if (user) {
            //已登录，允许通过
            next()
        } else {
            //没有登录，回到登录页
            next('/login')
        }
    } else {
        next()
    }

})


Vue.prototype.$bus = new Vue()
    // 在vue的原型链上挂载一个bus属性用来做兄弟组件传值

Vue.prototype.dateFormat = function(time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}



Vue.config.productionTip = false

new Vue({

    // 挂载到Vue示例上
    router,
    render: h => h(App)
}).$mount('#app')