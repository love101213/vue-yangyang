import { list as baseListQuestion } from '@/api/hmmm/questions.js'
const app = {
    state: {
        name: '',
        baseList: [],
        baseCount: 0,
        restaurants: [],
        state: '',
        timeout: null
    },
    mutations: {
        SET_NAME: (state, name) => {
            state.name = name
        },
        updateList(state, option) {

            state.baseList = option.baseList
            state.baseCount = option.baseCount
        },
        delListItem(state, step) {
            const index = state.baseList.findIndex(x => x.id === step)
            state.baseList.splice(index, 1)
        }
    },
    actions: {
        setName({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                commit('SET_NAME', username)
                resolve()
            })
        },
        async getBaseList(context) {
            const { data: res } = await baseListQuestion()
            console.log(res)
            const baseList = res.items
            const baseCount = res.counts
            context.commit('updateList', { baseList, baseCount })
        }
    }
}

export default app