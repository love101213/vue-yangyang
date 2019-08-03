import { list as subjectList } from '@/api/hmmm/subjects.js'

const subject = {
    state: {
        subList: [],
        total: 0
    },
    mutations: {
        subUplate(state, options) {
            state.subList = option.subList
            state.total = option.total
        }
    },
    actions: {
        async getSubList(context) {
            const res = await subjectList()
            console.log(res)
        }
    },
    getters: {

    }
}
export default subject