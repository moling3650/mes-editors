export default function getMouldTypeForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}模具类型表单`,
    formItems: [
      {
        value: 'type_name',
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
      type_id: '',
      type_name: '',
      description: ''
    }, form),
    rules: {
      type_name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }]
    }
  })
}
