import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewUser from './components/NewUser.vue'
import Questionnaire from './components/Questionnaire.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new_user',
      name: 'newUser',
      component: NewUser
    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: Questionnaire
    }
    //{
    //  path: '/about',
    //  name: 'about',
    //  // route level code-splitting
    //  // this generates a separate chunk (about.[hash].js) for this route
    //  // which is lazy-loaded when the route is visited.
    //  component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    //}
  ]
})
