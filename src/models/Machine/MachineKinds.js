export default {
  // 模型名称
  name: 'MachineKinds',
  // 主键
  pk: 'KindId',
  // 表格列配置
  cols: [
    {field: 'kindName', title: '类别名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `设备信息`,
      // 表单元素
      formItems: [
        {value: 'kindName', label: '类别名称', span: 12, component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        kindName: '',
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        kindName: [{ required: true, message: '请输入类别名称', trigger: 'blur' }]
      }
    })
  }
}
