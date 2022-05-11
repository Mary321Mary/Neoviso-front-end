import * as socketio from '../plugins/socketio'

const state = {
    user: '',
    role: ''
}
const getters = {
    getUser: state => state.user,
    getRole: state => state.role
}
const actions = {
    async fetchUser ({ commit }) {
        let res = await window.axios.get(`users/me`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
            }
        })
        socketio.sendEvent({
            type: 'user',
            data: {
                id: res.data.id
            }
        });
        socketio.addEventListener({
            type: 'user',
            callback: (data) => {
                commit('updateRole', data.role)
            }
        });
        let results = res.data.username
        commit('updateUser', results)
    }
}
const mutations = {
    updateUser: (state, results) => {
        state.user = results
        console.log('updateUser')
        console.log(state.user)
    },
    updateRole: (state, results) => {
        state.role = results
        console.log('updateRole')
        console.log(state.role)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
