export default function getMachinePropertyForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}类别属性表单`,
    formItems: [
      {
        value: 'ppt_name',
        label: '属性名称',
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
      ppt_id: '',
      kind_id: '',
      ppt_name: '',
      description: ''
    }, form),
    rules: {
      ppt_name: [{ required: true, message: '请输入属性名称', trigger: 'blur' }],
      kind_id: [{ required: true, message: '请选择设备类别', trigger: 'blur' }]
    }
  })
}
