export default function getBomDetailForm (form = null, type = 'add', options) {
  if (!options) {
    return void console.error('缺少物料的Options')
  }

  const material = form.mat_code ? options.find(o => o.value === form.mat_code) : null
  const unit = material ? material.unit : ''
  return Promise.resolve({
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
        value: 'base_qty',
        label: '消耗基数',
        component: 'ex-input-number',
        span: 12,
        disabled: true,
        unit
      },
      {
        value: 'qty',
        label: '消耗数量',
        component: 'ex-input-number',
        span: 12,
        unit
      },
      {
        value: 'wastage',
        label: '损耗率',
        component: 'ex-input-number',
        unit: '%'
      },
      {
        value: 'enable_Substitute',
        label: '能否替代',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0,
        span: 8
      },
      {
        value: 'enable_beyond',
        label: '能否超越',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0,
        span: 8
      },
      {
        value: 'be_ctrl',
        label: '是否可控',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0,
        span: 8
      }
    ],
    formData: Object.assign({
      bom_code: '',
      mat_type: '',
      mat_code: '',
      qty: 1,
      base_qty: 1,
      wastage: 0,
      enable_Substitute: 1,
      enable_beyond: 1,
      be_ctrl: 1
    }, form),
    rules: {
      bom_code: [{ required: true, trigger: 'blur' }],
      mat_type: [{ required: true, trigger: 'blur' }],
      mat_code: [{ required: true, trigger: 'blur' }],
      qty: [{ required: true, trigger: 'blur' }]
    }
  })
}
