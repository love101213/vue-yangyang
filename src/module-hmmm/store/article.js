import { list as articlesList } from '@/api/hmmm/articles.js'
import { remove as removeList } from '@/api/hmmm/articles.js'
const articleApp = {
    state: {
        articleList: [],
        articleCount: 0,
    },
    mutations: {
        articleUpdate(state, option) {
            state.articleList = option.articleList
            state.articleCount = option.articleCount
        },
        handleSizeChange(state, options) {
            console.log(state)



        },
        handleCurrentChange(state, options) {

            console.log(state)

        },
        delList(state, id) {
            const index = state.articleList.findIndex(x => x.id == id)
            state.articleList.splice(index, 1)
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


        },
        // async deleteItem(context, id) {
        //     const res = await removeList({ id })
        //     console.log(res)
        //         // const delId = 
        //     context.commit('delList', )

        // }
        // handleSizeChange(context) {
        //     console.log(context)

        // },
        // handleCurrentChange(context) {
        //     console.log(context)

        // }

    },
    getters: {}
}
export default articleApp