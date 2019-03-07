import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const editors = [
  {
    path: 'bom',
    component: () => import('@/pages/Bom/BomEditor')
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
    path: 'processStepDetail',
    component: () => import('@/pages/Process/processFlow')
  },
  {
    path: 'workOrder',
    component: () => import('@/pages/workOrder/workOrder')
  },
  {
    path: 'processGroup',
    component: () => import('@/pages/Process/ProcessGroup')
  },
  {
    path: 'process',
    component: () => import('@/pages/Process/Process')
  },
  {
    path: 'product',
    component: () => import('@/pages/ProductEditor')
  },
  {
    path: 'material',
    component: () => import('@/pages/Material')
  },
  {
    path: 'depart',
    component: () => import('@/pages/System/DepartmentEditor')
  },
  {
    path: 'employee',
    component: () => import('@/pages/System/EmployeesEditor')
  },
  {
    path: 'module',
    component: () => import('@/pages/System/ModuleEditor')
  },
  {
    path: 'role',
    component: () => import('@/pages/System/RoleEditor')
  },
  {
    path: 'workshop',
    component: () => import('@/pages/System/WorkshopEditor')
  },
  {
    path: 'line',
    component: () => import('@/pages/System/LineEditor')
  },
  {
    path: 'processType',
    component: () => import('@/pages/System/ProcessTypeEditor')
  },
  {
    path: 'workGroup',
    component: () => import('@/pages/System/WorkGroupEditor')
  },
  {
    path: 'workGroupClass',
    component: () => import('@/pages/System/WorkGroupClassEditor')
  },
  {
    path: 'WorkCalendar',
    component: () => import('@/pages/System/WorkCalendarEditor')
  },
  {
    path: 'materialType',
    component: () => import('@/pages/System/MaterialTypeEditor')
  },
  {
    path: 'processFlow',
    component: () => import('@/pages/Product/ProcessFlowEditor')
  },
  {
    path: 'productModel',
    component: () => import('@/pages/System/ProductModelEditor')
  },
  {
    path: 'dataTranslation',
    component: () => import('@/pages/System/DataTranslationEditor')
  },
  {
    path: 'userRole',
    component: () => import('@/pages/System/UserRoleEditor')
  },
  {
    path: 'menu',
    component: () => import('@/pages/MenuEditor')
  },
  {
    path: 'rolePower',
    component: () => import('@/pages/System/RolePowerEdiror')
  },
  {
    path: 'ngCode',
    component: () => import('@/pages/Quality/NGCodeEditor')
  },
  {
    path: 'ngType',
    component: () => import('@/pages/Quality/NGTypeEditor')
  },
  {
    path: 'ngReason',
    component: () => import('@/pages/Quality/NGReasonEditor')
  },
  {
    path: 'productGrade',
    component: () => import('@/pages/Quality/ProductGradeEditor')
  },
  {
    path: 'newMachine',
    component: () => import('@/pages/NewMachine/Machine')
  },
  {
    path: 'register',
    component: () => import('@/pages/Product/RegistrationEditor')
  },
  {
    path: 'repair',
    component: () => import('@/pages/Product/Repair')
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
    }),
    {
      path: '/reports/production',
      component: () => import('@/pages/Reports/Production')
    },
    {
      path: '/reports/machine',
      component: () => import('@/pages/Reports/Machine')
    }
  ]
})
