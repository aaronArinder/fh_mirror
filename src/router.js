import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function lazyLoad (view) {
  return () => import(`@/views/${view}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: lazyLoad('Login')
    },
    {
      path: '/about',
      name: 'about',
      component: lazyLoad('About')
    },
    {
      path: '/login',
      name: 'login',
      component: lazyLoad('Login')
    },
    {
      path: '/profile',
      name: 'profile',
      component: lazyLoad('Profile')
    },
    {
      path: '/register',
      name: 'register',
      component: lazyLoad('Register')
    },
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
