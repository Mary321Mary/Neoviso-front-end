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
        commit('updateUser', res.data.username)
    }
}
const mutations = {
    updateUser: (state, results) => {
        state.user = results
    },
    updateRole: (state, results) => {
        state.role = results
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
