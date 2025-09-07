export default {
    namespaced: true,
    state: {
        id: localStorage.getItem('userId') || 0,
        name: ''
    },
    mutations: {
        updateId(state, id) {
            state.id = id
            localStorage.setItem('userId', id)
        },
        updateName(state, name) {
            state.name = name
        }
    }
}
