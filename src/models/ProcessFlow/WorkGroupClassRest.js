export default {
  // 模型名称
  name: 'WorkGroupClassRest',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'classId', title: '班别ID', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'startHour', title: '开始时间（时）', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'endHour', title: '结束时间（时）', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'description', title: '说明', width: 200, titleAlign: 'center', columnAlign: 'center', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `${type === 'add' ? '添加' : '编辑'}班别休息时间`,
      width: '350px',
      // 表单元素
      formItems: [
        {value: 'startHour', label: '开始（时）', component: 'el-input'},
        {value: 'endHour', label: '结束（时）', component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        classId: '',
        startHour: 0,
        endHour: 0,
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        startHour: [{ required: true, message: '请输入开始时间', trigger: 'blur' }],
        endHour: [{ required: true, message: '请输入结束时间', trigger: 'blur' }]
      }
    })
  }
}
