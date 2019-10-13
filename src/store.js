import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    forms: {},
    registration: {},
  },
  mutations: {
    setNewRegForm (state, value) {
      state.forms.newUserRegistration = value;
    }
  },
  actions: {
    async axiosPOST (state, { url, payload }) {
      try {
        const data = await axios.post(url, { payload });
      } catch (err) {
        console.log('err from axiosPOST', err)
      }

    },
    async getNewRegForm () {
      try {
        const { data: { new_user_form }} = await axios.get('/forms/new_user_form');
        this.commit('setNewRegForm', new_user_form);
      } catch (err) {
        console.log('err from getNewRegForm', err);
      }
    },
  }
})
