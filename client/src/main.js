import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'
//import '@/scss/main.scss'
//import vuetify from '@/plugins/vuetify'
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify'


Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  router,
  store,
  vuetify: new Vuetify({}),
  render: h => h(App)
}).$mount('#app')
