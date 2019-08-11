import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import '@/scss/main.scss'
// themes!
//import 'vue-material/dist/theme/black-green-light.css'

Vue.config.productionTip = false

Vue.use(VueMaterial)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
