import { list as articlesList } from '@/api/hmmm/articles.js'
const articleApp = {
    state: {
        articleList: [],
        articleCount: 0,
    },
    mutations: {
        articleUpdate(state, option) {
            state.articleList = option.articleList
            state.articleCount = option.articleCount
        }
    },
    actions: {
        async getArticle(context) {
            // console.log(context)

            const { data: res } = await articlesList()
            console.log(res)
            const articleList = res.items
            const articleCount = res.counts
            context.commit('articleUpdate', { articleList, articleCount })


        }

    },
    getters: {}
}
export default articleApp