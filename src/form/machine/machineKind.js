export default function getMachineKindForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}设备类别表单`,
    formItems: [
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
      kindName: '',
      description: ''
    }, form),
    rules: {
      kindName: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
      typeId: [{ required: true, message: '请选择设备类型', trigger: 'blur' }]
    }
  })
}
