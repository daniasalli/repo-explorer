import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    organization: '',
    repo: undefined

  },
  getters: {
    getRepo: state => {
      return state.repo
    }
  },
  mutations: {
    updateRepo (state, payload) {
      const newState = state
      newState.repo = payload
    }
  },
  actions: {
    updateRepo: ({ commit }, payload) => {
      commit('updateRepo', payload)
    }
  }
})
