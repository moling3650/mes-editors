export default function getFormulaDetailForm (form = null, type = 'add', options) {
  if (!options) {
    return void console.error('缺少物料的Options')
  }
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}配方明细`,
    formItems: [
      {
        value: 'formula_code',
        label: '配方编号',
        component: 'el-input',
        disabled: true
      },
      {
        value: 'formula_item',
        label: '配方项',
        component: 'el-input'
      },
      {
        value: 'material_code',
        label: '物料',
        component: 'ex-select',
        options,
        disabled: type === 'edit'
      },
      {
        value: 'feed_idx',
        label: '加料顺序',
        component: 'ex-input-number'
      },
      {
        value: 'feed_qty',
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
      formula_code: '',
      formula_item: '',
      material_code: '',
      feed_idx: 1,
      feed_qty: 1,
      deviate: 0
    }, form),
    rules: {
      formula_code: [{ required: true, message: '请输入配方编号', trigger: 'blur' }],
      formula_item: [{ required: true, message: '请输入配方项', trigger: 'blur' }],
      material_code: [{ required: true, message: '请选择物料', trigger: 'blur' }]
    }
  })
}
