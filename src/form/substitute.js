import apis from '@/apis'

export default function getBomDetailForm (form = null, type = 'add', matType = 1) {
  if (!matType) {
    return void console.error('必须先设置matType')
  }
  const apiType = matType ? 'fetchMaterialOptions' : 'fetchProductOptions'
  return apis[apiType]().then(options => {
    return {
      title: `${type === 'add' ? '新建' : '编辑'}替代料`,
      formItems: [
        {
          value: 'bom_code',
          label: 'BOM编号',
          component: 'el-input',
          disabled: true
        },
        {
          value: 'mat_code',
          label: '物料',
          component: 'ex-select',
          options,
          disabled: true
        },
        {
          value: 'Substitute_mat_code',
          label: '替代料',
          component: 'ex-select',
          options
        }
      ],
      formData: Object.assign({
        bom_code: '',
        mat_code: '',
        Substitute_mat_code: ''
      }, form),
      rules: {
        bom_code: [{ required: true, trigger: 'blur' }],
        mat_code: [{ required: true, trigger: 'blur' }],
        Substitute_mat_code: [{ required: true, message: '请选择替代料', trigger: 'blur' }]
      }
    }
  })
}
