import apis from '@/apis'

export default function getBomDetailForm (form = null, type = 'add') {
  if (!form) {
    return void console.error('必须先设置form.mat_type')
  }
  const apiType = form.mat_type ? 'fetchMaterialOptions' : 'fetchProductOptions'
  return apis[apiType]().then(options => {
    return {
      title: `${type === 'add' ? '新建' : '编辑'}BOM明细表单`,
      formItems: [
        {
          value: 'bom_code',
          label: 'BOM编号',
          component: 'el-input',
          disabled: true
        },
        {
          value: 'mat_type',
          label: '物料类型',
          component: 'ex-select',
          options: [{value: 0, label: '成品'}, {value: 1, label: '物料'}],
          disabled: true
        },
        {
          value: 'mat_code',
          label: '物料编号',
          component: 'ex-select',
          options,
          disabled: type === 'edit'
        },
        {
          value: 'qty',
          label: '耗料数量',
          component: 'el-input-number'
        },
        {
          value: 'base_qty',
          label: '耗料基数',
          component: 'el-input-number'
        },
        {
          value: 'wastage',
          label: '损耗率',
          component: 'el-input-number'
        },
        {
          value: 'enable_Substitute',
          label: '能否替代',
          component: 'el-switch',
          activeValue: 1,
          inactiveValue: 0
        },
        {
          value: 'enable_beyond',
          label: '能否超越',
          component: 'el-switch',
          activeValue: 1,
          inactiveValue: 0
        },
        {
          value: 'be_ctrl',
          label: '是否可控',
          component: 'el-switch',
          activeValue: 1,
          inactiveValue: 0
        }
      ],
      formData: Object.assign({
        bom_code: '',
        mat_type: '',
        mat_code: '',
        qty: 1,
        base_qty: 1,
        wastage: 1,
        enable_Substitute: 1,
        enable_beyond: 1,
        be_ctrl: 1
      }, form),
      rules: {
        bom_code: [{ required: true, trigger: 'blur' }],
        mat_type: [{ required: true, trigger: 'blur' }],
        mat_code: [{ required: true, trigger: 'blur' }],
        qty: [],
        base_qty: [],
        wastage: [],
        enable_Substitute: [],
        enable_beyond: [],
        be_ctrl: []
      }
    }
  })
}
