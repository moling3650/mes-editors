export default function getBomDetailForm (form = null, type = 'add', options = [], unit = '') {
  if (!options) {
    return void console.error('缺少物料的Options')
  }

  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}BOM明细表单`,
    formItems: [
      {
        value: 'bomCode',
        label: 'BOM编号',
        component: 'el-input',
        disabled: true
      },
      {
        value: 'matType',
        label: '物料类型',
        component: 'ex-select',
        options: [{value: 0, label: '成品'}, {value: 1, label: '物料'}],
        disabled: type === 'edit'
      },
      {
        value: 'matCode',
        label: '物料编号',
        component: 'ex-select',
        options,
        disabled: type === 'edit'
      },
      {
        value: 'baseQty',
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
        value: 'enableSubstitute',
        label: '能否替代',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0,
        span: 8
      },
      {
        value: 'enableBeyond',
        label: '能否超越',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0,
        span: 8
      },
      {
        value: 'beCtrl',
        label: '是否可控',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0,
        span: 8
      }
    ],
    formData: Object.assign({
      bomCode: '',
      matType: 0,
      matCode: '',
      qty: 1,
      baseQty: 1,
      wastage: 0,
      enableSubstitute: 1,
      enableBeyond: 1,
      beCtrl: 1
    }, form),
    rules: {
      bomCode: [{ required: true, trigger: 'blur' }],
      matType: [{ required: true, type: 'number', trigger: 'blur' }],
      matCode: [{ required: true, trigger: 'blur' }],
      qty: [{ required: true, type: 'number', trigger: 'blur' }]
    }
  })
}
