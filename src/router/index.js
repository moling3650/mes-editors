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
    path: 'workTool',
    component: () => import('@/pages/WorkToolEditor')
  },
  {
    path: 'mould',
    component: () => import('@/pages/MouldEditor')
  },
  {
    path: 'mould_kindsBind',
    component: () => import('@/pages/MachineModelKindsBindEditor')
  },
  {
    path: 'repair_tool',
    component: () => import('@/pages/RepairToolEditor')
  },
  {
    path: 'drive',
    component: () => import('@/pages/DriveEditor')
  },
  {
    path: 'machineStandardPoint',
    component: () => import('@/pages/MachineStandardPointsEditor')
  },
  {
    path: 'machineAnalogPoint',
    component: () => import('@/pages/MachineAnalogPointEditor')
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
