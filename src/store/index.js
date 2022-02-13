import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newUserProfile: {}
  },
  mutations: {
    ADD_USER (state, newUser) {
      newUser.infoWork = {}
      state.newUserProfile = newUser
    },
    ADD_INFO_WORK_USER(state, workProfile) {
      state.newUserProfile.infoWork = workProfile
    }
    
  },
  actions: {
    registeredUser ({ commit }, newUser) {
      commit('ADD_USER', newUser)
    },
    completeProfile({commit}, workProfile){
      commit('ADD_INFO_WORK_USER', workProfile)
    }
  }
})
