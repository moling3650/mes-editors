export default function getSubstituteForm (form = null, type = 'add', options) {
  if (!options) {
    return void console.error('必须先设置物料的Options')
  }
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}替代料`,
    formItems: [
      {
        value: 'bomCode',
        label: 'BOM编号',
        component: 'el-input',
        disabled: true
      },
      {
        value: 'matCode',
        label: '物料',
        component: 'ex-select',
        options,
        disabled: true
      },
      {
        value: 'substituteMatCode',
        label: '替代料',
        component: 'ex-select',
        options
      }
    ],
    formData: Object.assign({
      bomCode: '',
      matCode: '',
      substituteMatCode: ''
    }, form),
    rules: {
      bomCode: [{ required: true, trigger: 'blur' }],
      matCode: [{ required: true, trigger: 'blur' }],
      substituteMatCode: [{ required: true, message: '请选择替代料', trigger: 'blur' }]
    }
  })
}
