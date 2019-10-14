import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

Vue.use(Vuex)

/**
 * The almighty state object.
 *
 * @todo Figure out a smarter way to get reactivity for forms than having some dummy placeholders.
 *
 * @name state
 * @type {Object}
 *
 * @property {Object} forms forms, with array defaults to ensure reactivity.
 * @property {Array} forms.intake_form The intake form: gated by login, currently primary form.
 * @property {Array} forms.new_user_form The form required for registering new users.
 *
 * @property {Boolean} loggedIn Represents whether a user has successfully logged in. Currently
 *   used for some hide/show logic.
 *
 */
export default new Vuex.Store({
  state: {
    forms: {
      intake_form: [],
      new_user_form: [],
    },
    loggedIn: false,
  },
  mutations: {

    /**
     * General form updater: puts forms on state.forms[formName] for any formName.
     *
     * @param {Object} state Represents internal state that form will be placed on.
     * @param {String} formName Name of the form.
     * @param {Array} form The form from DB.
     */
    updateForm (state, { formName, form }) {
      const stateForm = state.forms[formName];
      state.forms[formName] = stateForm.concat(form);
    },
    /**
     * Tracks whether the user is logged in; currently only used for some hide/show logic in
     *   App.vue. We're going to use JWTs and go sessionless; so, this will change accordingly.
     *
     * @param {Object} state Represents internal state.
     * @param {Boolean} value Whether a login attempt was successful. NB: state.loggedIn defaults
     *   to false.
     */
    updateLogin (state, value) {
      state.loggedIn = value;
    },
  },
  actions: {

    /**
     * Login action.
     *
     * @param {Object} state Represents internal state
     * @param {Object} {payload} An object with `username` and `password` values
     *
     * @todo base64 encode `payload`
     */
    async login (state, { payload }) {
      try {
        const axiosParams = {
          url: '/login',
          method: 'post',
          payload,
        };

        const success = await axiosHandler(axiosParams);
        this.commit('updateLogin', success);
        // redirect to profile page
        if (success) router.push('/profile');
      } catch (err) {
        console.log('err from store login', err);
      }
    },

    /**
     * Action for registering new users.
     *
     * @param {Object} state Represents internal state.
     * @param {Object} {payload} Contains answers to the new user form, including username
     *   and password.
     *
     * @todo base64 encode `payload`'s values that could have funny chars.
     * @todo Abstract the common axios parts to axiosHandler() or something else
     */
    async registerNewUser (state, { payload }) {
      try {
        const axiosParams = {
          url: '/register',
          method: 'post',
          payload,
        };

        const success = await axiosHandler(axiosParams);
        // log for successes: no modal system yet
        console.log(`new user registered :: ${success}`);
      } catch (err) {
        console.log('err from store login', err);
      }

    },

    /**
     * The general action for getting forms.
     *
     * @param {Object} state Represents internal state.
     * @param {String} formName Name of the desired form: MUST match associated mat view's name.
     *
     * @todo Abstract the common axios parts to axiosHandler() or something else
     */
    async getForm (state, { payload: { formName } }) {
      try {
        const axiosParams = { url: `/forms/${formName}`, method: 'get' };
        const { data } = await axiosHandler(axiosParams);
        this.commit('updateForm', { formName, form: data[formName] });
      } catch (err) {
        console.log('err from getForm', err);
      }
    },
  }
})


/**
 * General axios handler. This will eventually be a standalone service. It can make any kind of
 * request (e.g., GET, POST), passing along a payload (or not, if it's a GET). Currently only GET
 * and POST is supported.
 *
 * @param {String} url The url to request.
 * @param {The type of request: e.g., GET, POST, PUT, etc.} method The type of request to make:
 *   e.g., GET, POST.
 * @param {Object} payload Data to send over (optional).
 * @returns {Object|Array|String|Boolean} For GETs, data returned by the server; otherwise, true
 *   if it was a POST that 200'd, and false otherwise.
 */
async function axiosHandler ({ url, method, payload }) {
  try {
    const data = await axios[method](url, { payload });
    if (method === 'get') {
      return data;
    } else if (method === 'post' && data.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('err from axiosHandler', err)
  }
};
