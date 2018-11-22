import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const editors = [
  {
    path: 'bom',
    component: () => import('@/pages/Bom/BomEditor')
  },
  {
    path: 'control_point',
    component: () => import('@/pages/ControlPointEditor')
  },
  {
    path: 'machine',
    component: () => import('@/pages/Machine/Machine')
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
    path: 'processFlowDetail',
    component: () => import('@/pages/Process/ProcessFlowDetailEditor')
  },
  {
    path: 'processControlItemDetail',
    component: () => import('@/pages/Process/ProcessControlItemDetailEditor')
  },
  {
    path: 'processStep',
    component: () => import('@/pages/Process/ProcessStepEditor')
  },
  {
    path: 'processFlow',
    component: () => import('@/pages/Process/processFlow')
  },
  {
    path: 'workOrder',
    component: () => import('@/pages/workOrder/workOrder')
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
