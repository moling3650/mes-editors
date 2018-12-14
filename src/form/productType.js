export default function getProductTypeForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}成品类型表单`,
    formItems: [
      {
        value: 'typeCode',
        label: '类型编号',
        component: 'el-input',
        disabled: type !== 'add',
        span: 11
      },
      {
        value: 'typeName',
        label: '类型名称',
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
      description: ''
    }, form),
    rules: {
      typeCode: [{ required: true, message: '请输入类型编号', trigger: 'blur' }],
      typeName: [{ required: true, message: '请输入类型名称', trigger: 'blur' }]
    }
  })
}
