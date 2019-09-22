import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
console.log("Vuetify", Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
});