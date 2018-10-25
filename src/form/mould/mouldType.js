export default function getMouldTypeForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}模具类型表单`,
    formItems: [
      {
        value: 'typeName',
        label: '类型名称',
        component: 'el-input'
      },
      {
        value: 'description',
        label: '描述',
        component: 'el-input'
      }
    ],
    formData: Object.assign({
      typeName: '',
      description: ''
    }, form),
    rules: {
      typeName: [{ required: true, message: '请输入类型名称', trigger: 'blur' }]
    }
  })
}
