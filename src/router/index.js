import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const editors = [
  {
    path: 'report',
    component: () => import('@/pages/ReportEditor')
  },
  {
    path: 'bom',
    component: () => import('@/pages/BomEditor')
  },
  {
    path: 'formula',
    component: () => import('@/pages/FormulaEditor')
  },
  {
    path: 'control_point',
    component: () => import('@/pages/ControlPointEditor')
  },
  {
    path: 'machine',
    component: () => import('@/pages/MachineEditor')
  },
  {
    path: 'machine_type',
    component: () => import('@/pages/MachineTypeEditor')
  },
  {
    path: 'machine_model',
    component: () => import('@/pages/MachineModelEditor')
  },
  {
    path: 'workTool_type',
    component: () => import('@/pages/WorkToolTypeEditor')
  },
  {
    path: 'workTool_model',
    component: () => import('@/pages/WorkToolModelEditor')
  },
  {
    path: 'mould',
    component: () => import('@/pages/MouldEditor')
  },
  {
    path: 'mould_type',
    component: () => import('@/pages/MouldTypeEditor')
  },
  {
    path: 'mould_model',
    component: () => import('@/pages/MouldModelEditor')
  },
  {
    path: 'mould_kindsBind',
    component: () => import('@/pages/MachineModelKindsBindEditor')
  }
]

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/HelloWorld')
    },
    {
      path: '/editors',
      component: () => import('@/pages/editors'),
      children: editors
    },
    ...editors.map(route => {
      return {
        path: `/${route.path}`,
        component: route.component
      }
    })
  ]
})
