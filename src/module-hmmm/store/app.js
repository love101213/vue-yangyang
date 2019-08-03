const app = {
    state: {
        name: '',
        baseList: [],
        baseCount: 0,
    },
    mutations: {
        SET_NAME: (state, name) => {
            state.name = name
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
        async getBaseList() {
            // const {data:res} = await 
        }
    }
}

export default app