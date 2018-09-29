export default function getMouldPropertyForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}模具类别属性表单`,
    formItems: [
      {
        value: 'ppt_name',
        label: '属性名称',
        component: 'el-input',
        span: 22
      },
      {
        value: 'ppt_type',
        label: '属性类型',
        component: 'ex-select',
        options: [{value: 0, label: '一般属性'}, {value: 1, label: '匹配属性'}],
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
      ppt_type: '',
      ppt_name: '',
      description: ''
    }, form),
    rules: {
      ppt_name: [{ required: true, message: '请输入属性名称', trigger: 'blur' }],
      kind_id: [{ required: true, message: '请选择模具类别', trigger: 'blur' }]
    }
  })
}
