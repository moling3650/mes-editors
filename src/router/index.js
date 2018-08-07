import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
    {
      path: '/editors/bom',
      component: () => import('@/pages/BomEditor')
    }
  ]
})
