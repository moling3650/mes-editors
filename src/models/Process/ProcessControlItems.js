export default {
  // 模型名称
  name: 'ProcessControlItems',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'controlName', title: '管控项名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'processCode', title: '所属工序', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'inputTime', title: '建立时间', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '备注信息', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `工序信息`,
      // 表单元素
      formItems: [
        {value: 'processCode', label: '所属工序', span: 12, component: 'el-input', disabled: true},
        {value: 'controlName', label: '管控项名称', span: 12, component: 'el-input'},
        {value: 'description', label: '备注信息', span: 24, component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        controlName: '',
        processCode: '',
        inputTime: '',
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        controlName: [{ required: true, message: '请输入管控项名称', trigger: 'blur' }]
      }
    })
  }
}
