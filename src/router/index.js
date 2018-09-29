import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/HelloWorld')
    },
    {
      path: '/editors/report',
      component: () => import('@/pages/ReportEditor')
    },
    {
      path: '/editors/bom',
      component: () => import('@/pages/BomEditor')
    },
    {
      path: '/editors/formula',
      component: () => import('@/pages/FormulaEditor')
    },
    {
      path: '/editors/control_point',
      component: () => import('@/pages/ControlPointEditor')
    },
    {
      path: '/editors/machine',
      component: () => import('@/pages/MachineEditor')
    },
    {
      path: '/editors/machine_type',
      component: () => import('@/pages/MachineTypeEditor')
    },
    {
      path: '/editors/machine_model',
      component: () => import('@/pages/MachineModelEditor')
    },
    {
      path: '/editors/workTool_type',
      component: () => import('@/pages/WorkToolTypeEditor')
    },
    {
      path: '/editors/workTool_model',
      component: () => import('@/pages/WorkToolModelEditor')
    },
    {
      path: '/editors/mould_type',
      component: () => import('@/pages/MouldTypeEditor')
    },
    {
      path: '/editors/mould_model',
      component: () => import('@/pages/MouldModelEditor')
    }

  ]
})
