export default {
  // 模型名称
  name: 'DataTranslations',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'tableName', title: '表格名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'fieldName', title: '字段名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'value', title: 'value值', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'label', title: '显示值', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'description', title: '说明', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `${type === 'add' ? '添加' : '编辑'}转译字典`,
      // 表单元素
      formItems: [
        {value: 'tableName', label: '表格名称', component: 'el-input'},
        {value: 'fieldName', label: '字段名称', component: 'el-input'},
        {value: 'value', label: 'value值', component: 'ex-input-number'},
        {value: 'label', label: '显示值', component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}

      ],
      // 表单内容
      formData: Object.assign({
        tableName: '',
        fieldName: '',
        value: 0,
        label: '',
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        tableName: [{ required: true, message: '请输入表格名称', trigger: 'blur' }],
        fieldName: [{ required: true, message: '请输入字段名称', trigger: 'blur' }],
        label: [{ required: true, message: '请输入label值', trigger: 'blur' }]
      }
    })
  }
}
