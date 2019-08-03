// vue-router
import { asyncRouterMap } from '@/router'
import routerMaps from './router'
// vuex
import app from './store/app'
import article from './store/article'
import subject from './store/subject'

export default {
    install(module, store) {
        // 注册路由
        for (const iterator of routerMaps) {
            asyncRouterMap.push(iterator)
        }
        store.registerModule('hmmm', app)
        store.registerModule('articles', article)
        store.registerModule('subject', subject)

    }
}