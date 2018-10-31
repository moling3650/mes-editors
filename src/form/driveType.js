export default function getDriveTypeForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}驱动类型表单`,
    formItems: [
      {
        value: 'typeCode',
        label: '类别编号',
        component: 'el-input',
        disabled: type !== 'add',
        span: 11
      },
      {
        value: 'typeName',
        label: '类别名称',
        component: 'el-input',
        span: 11
      },
      {
        value: 'description',
        label: '描述',
        component: 'el-input',
        span: 22
      }
    ],
    formData: Object.assign({
      typeCode: '',
      typeName: '',
      description: '',
      driveClass: ''
    }, form),
    rules: {
      typeCode: [{ required: true, message: '请输入驱动类型编号', trigger: 'blur' }],
      typeName: [{ required: true, message: '请输入驱动类型名称', trigger: 'blur' }]
    }
  })
}
