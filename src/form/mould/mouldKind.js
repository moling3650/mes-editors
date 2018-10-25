export default function getMouldKindForm (form = null, type = 'add', options) {
  if (!options) {
    return void console.error('缺少模具类型的Options')
  }
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}模具类别表单`,
    formItems: [
      {
        value: 'typeId',
        label: '模具类型',
        component: 'ex-select',
        span: 22,
        options,
        disabled: true
      },
      {
        value: 'kindName',
        label: '类别名称',
        component: 'el-input',
        span: 22
      },
      {
        value: 'description',
        label: '描述',
        component: 'el-input',
        span: 22
      }
    ],
    formData: Object.assign({
      typeId: '',
      kindId: '',
      kindName: '',
      description: ''
    }, form),
    rules: {
      kindName: [{ required: true, message: '请输入类别名称', trigger: 'blur' }]
    }
  })
}
