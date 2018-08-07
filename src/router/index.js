import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/editors/report',
      component: () => import('@/pages/ReportEditor')
    },
    {
      path: '/editors/bom',
      component: () => import('@/pages/BomEditor')
    }
  ]
})
