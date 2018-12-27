export default {
  // 模型名称
  name: 'MaterialTypes',
  // 主键
  pk: 'typeId',
  // 表格列配置
  cols: [
    {field: 'typeName', title: '类型名称', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'description', title: '说明', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `物料类型管理`,
      // 表单元素
      formItems: [
        {value: 'typeName', label: '类型名称', span: 12, component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        typeName: '',
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        typeName: [{ required: true, message: '请输入类型名称', trigger: 'blur' }]
      }
    })
  }
}
