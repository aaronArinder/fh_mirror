import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    howdy: 'grill',
  },
  mutations: {
    setHowdy(state, value) {
      state.howdy = value;
    }
  },
  actions: {
    updateHowdy(state, value) {
      this.commit('setHowdy', value);
    },
  }
})
