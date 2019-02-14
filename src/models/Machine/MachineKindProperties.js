export default {
  // 模型名称
  name: 'MachineKindProperties',
  // 主键
  pk: 'pptId',
  // 表格列配置
  cols: [
    {field: 'pptType', title: '属性类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'pptName', title: '属性名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `设备信息`,
      // 表单元素
      formItems: [
        {value: 'pptName', label: '属性名称', span: 12, component: 'el-input'},
        {value: 'pptType', label: '属性类型', span: 12, component: 'ex-select', options: [{value: 0, label: '一般属性'}, {value: 1, label: '匹配属性'}]},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        pptName: '',
        pptType: 0,
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        pptName: [{ required: true, message: '请输入属性名称', trigger: 'blur' }]
      }
    })
  }
}
