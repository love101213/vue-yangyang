//当前项目的路由分为两种类型
// 1. 静态路由 constantRouterMap
// 2. 动态路由 router.addRoutes

// 整体逻辑（大概理解一下，这块项目代码没有写完整）
// 1. 创建vue实例的时候将vue-router挂载，但这个时候vue-router挂载一些登录或不用权限的公用的页面
// 2. 当用户登录后，通过后台返回值拿到role,将role和路由表每个页面需要的权限进行比较，生成最终用户可以访问的路由表
// 3. 调用router.addRoutes(store.getters.addRoutes)添加用户可访问的路由
// https://router.vuejs.org/zh/api/#router-addroutes addRoutes动态添加更多的路由规则
// 4. 使用vuex管理路由表，根据vuex中可访问的路由渲染侧边栏组件(参考dashboard/layoutSidebarItem.vue)

import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import Layout from '@/module-dashboard/pages/layout'
import { getToken } from '@/utils/auth'

// 定义
const _import = require('./import_' + process.env.NODE_ENV)//懒加载
const whiteList = ['/login', '/authredirect'] // 白名单 无需跳转

// 配置
Vue.use(Router)

/**
 * 基础路由
 * 
 * 下面这些属性是用户自定义的，可以在访问路由的时候拿到这些值
 * 
 * 
* hidden: true                   如果设置 `hidden:true` 将不在侧边栏上显示(默认是false) 如果设置为false,并且有children,则会显示到左侧侧边栏当中 见 layoutSidebarItem.vue文件 
* alwaysShow: true                如果设置 true, 将一直显示, 不管子菜单的个数,如果未设置, 只有多于1个子菜单时才变为嵌套模式，否则不显示
*                                
* redirect: noredirect           如果设置 `redirect:noredirect` 将不在面包屑导航中显示
* name:'router-name'             该名称将用来设置 <keep-alive>
* meta : {
    roles: ['admin','editor']    根据角色控制页面权限 (可以设置多个角色)
    title: 'title'               该名称用来设置子菜单和面包屑导航
    icon: 'svg-name'             侧边栏上的小图标,
    noCache: true                页面是否缓存，默认为false，缓存
  }
**/

export const constantRouterMap = [
  {
    // 登录路由
    path: '/login',
    component: _import('dashboard/pages/login'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: _import('dashboard/pages/authredirect'),
    hidden: true
  },
  { path: '/404', component: _import('dashboard/pages/404'), hidden: true },
  { path: '/401', component: _import('dashboard/pages/401'), hidden: true },
  {
    //为什么写成path:'' 
    // 这个一般是来做多tab页，所有的一级路由都写path：''，然后组件都是Layout，这个Layout一般就是个基础的布局，包括左边栏和顶部菜单，然后实际要展示的页面写在chidren里，使用嵌套路由，这样加载哪个页面，都只是变换一个视图区域的内容，左侧菜单和顶部导航不变
    path: '',
    component: Layout,//Layout是基础骨架视图
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/pages/dashboard'),
        name: 'dashboard',
        //设置该路由在侧边栏和面包屑中展示的名字以及图标
        meta: { title: '面板', icon: 'dashboard' }
      }
    ]
  }
]

/**
 * 配置路由
 **/
let router = new Router({
  routes: constantRouterMap
})

//这块在实现路由导航守卫 防止没有登录直接进入后台
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) {
    // determine if there has token
    /* has token */
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      //有了这个判断之后，路由动态添加只会执行一次
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch('GetUserInfo')
          .then(res => {
            // 拉取user_info
            const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })
          .catch(() => {
            store.dispatch('FedLogOut').then(() => {
              Message.error('验证失败, 请重新登录')
              next({ path: '/login' })
            })
          })
      } else {
        next()
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

//路由全局后置钩子函数
router.afterEach(() => {
  NProgress.done() // finish progress bar
})

/**
 * 导出 基础路由
 **/
export default router

/**
 * 导出 业务路由
 **/
export let asyncRouterMap = [{ path: '*', redirect: '/404', hidden: true }]
