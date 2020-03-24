import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    set_token (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    del_token (state) {
      state.token = ''
      localStorage.removeItem('token')
    }
  }
})
