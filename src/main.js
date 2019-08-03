// 看代码的顺序：
// src/Main.js --> router/index.js --> store/index.js(就是一个骨架代码，细节都通过store.registerModule划分到每个模块当中了) --> utils/request.js --> api(返回一个promise对象) --> components(多个页面之间公共的组件) --> module-hmmm --> 开始自己coding
//全屏效果：http://www.jq22.com/webqd2471

//整个网站的需求文档：http://czpm.itcast.cn/%E9%BB%91%E9%A9%AC%E9%9D%A2%E9%9D%A2/V2.0/#g=1&p=%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86

//导入Vue
import Vue from 'vue'
//重置样式
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
//导入element ui
import Element, { Main } from 'element-ui'
//导入element ui的样式
import 'element-ui/lib/theme-chalk/index.css'
//导入全局样式
//@代表的含义是src目录
// 参考build/webpack.base.config.js38行
import '@/styles/index.scss' // global css
//导入根组件
import App from './App'
//导入路由
import router from './router'
//导入全局vuex数据
import store from './store'
//界面语言的国际化
//http://kazupon.github.io/vue-i18n/zh/installation.html#npm
import i18n from './lang' // Internationalization
//导入图标
import './icons' // icon
//Vue全局异常捕获
//一栋大厦出事了，普通员工不用去管，直接找保安就行了，errorHandler的作用就是保安
//Vue全局配置 errorHandler可以进行全局错误收集,我们可以根据这个特性对前端异常做这样的处理：业务错误直接写在业务里；代码错误、ajax请求异常等错误可以进行全局捕获然后抛出，不至于前端页面挂掉
//https://cn.vuejs.org/v2/api/#errorHandler
import './errorLog' // error log

// font-awesome字体图标库
import 'font-awesome/css/font-awesome.css'
/*
 * 注册 - 业务模块
 */

//将组件分为多个目录，一个一级导航一个目录，便于代码的维护（我们这个项目为了大家写起来方便，好几个一级导航全部放到hm-mmm上面了） 这块在看完了store/index.js代码之后再深入的分析这块的代码
import dashboard from '@/module-dashboard/index.js' // 基础面板
import manage from '@/module-manage/index.js' // 用户管理
import hmmm from '@/module-hmmm/index.js' // 黑马面面
//Vue.use的作用：可以在里面注册一堆的组件，然后，只要使用Vue.use就可以加载一堆
Vue.use(dashboard, store)
Vue.use(manage, store)
Vue.use(hmmm, store)

/*
 * 注册 - 组件
 */

// 饿了么
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

//注册全局的过滤器
//import *会将export let a = 1,export let b = 2导出的作为一个对象赋值给filters变量
//通过如下代码理解Object.keys的意思
// var obj = {
//   'name':'itcast',
//   age:20
// }

// Object.keys(obj).forEach(key=>console.log(key))

import * as filters from './filters' // global filters
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
