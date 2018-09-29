export default function getWorkToolKindForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}工装类别表单`,
    formItems: [
      {
        value: 'kind_name',
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
      kind_id: '',
      type_id: '',
      kind_name: '',
      description: ''
    }, form),
    rules: {
      kind_name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
      type_id: [{ required: true, message: '请选择工装类型', trigger: 'blur' }]
    }
  })
}
