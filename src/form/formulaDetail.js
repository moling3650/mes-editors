export default function getFormulaDetailForm (form = null, type = 'add', options) {
  if (!options) {
    return void console.error('缺少物料的Options')
  }
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}配方明细`,
    formItems: [
      {
        value: 'formulaCode',
        label: '配方编号',
        component: 'el-input',
        disabled: true
      },
      {
        value: 'formulaItem',
        label: '配方项',
        component: 'el-input'
      },
      {
        value: 'materialCode',
        label: '物料',
        component: 'ex-select',
        options,
        disabled: type === 'edit'
      },
      {
        value: 'feedIdx',
        label: '加料顺序',
        component: 'el-input-number'
      },
      {
        value: 'feedQty',
        label: '加料数量',
        component: 'ex-input-number'
      },
      {
        value: 'deviate',
        label: '允许误差',
        component: 'ex-input-number'
      }
    ],
    formData: Object.assign({
      formulaCode: '',
      formulaItem: '',
      materialCode: '',
      feedIdx: 1,
      feedQty: 1,
      deviate: 0
    }, form),
    rules: {
      formulaCode: [{ required: true, message: '请输入配方编号', trigger: 'blur' }],
      formulaItem: [{ required: true, message: '请输入配方项', trigger: 'blur' }],
      materialCode: [{ required: true, message: '请选择物料', trigger: 'blur' }]
    }
  })
}
