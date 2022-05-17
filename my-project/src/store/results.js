import * as socketio from '../plugins/socketio'

const state = {
    id: '',
    user: '',
    role: ''
}
const getters = {
    getUserId: state => state.id,
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
        commit('updateUserId', res.data.id)
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
    },
    updateUserId: (state, results) => {
        state.id = results
        console.log('updateUserId')
        console.log(state.id)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
