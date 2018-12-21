export default {
  // 模型名称
  name: 'WorkGroupClasses',
  // 主键
  pk: 'cid',
  // 表格列配置
  cols: [
    {field: 'classCode', title: '班别编号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
    {field: 'className', title: '班别名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
    {field: 'groupCode', title: '工序组', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: true},
    {field: 'dayStart', title: '开始日期', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'timeStart', title: '开始时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'dayEnd', title: '结束日期', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'timeEnd', title: '结束时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `${type === 'add' ? '添加' : '编辑'}工序组班别`,
      // 表单元素
      formItems: [
        {value: 'classCode', label: '班别编号', component: 'el-input', disabled: type === 'edit'},
        {value: 'className', label: '班别名称', component: 'el-input'},
        {value: 'groupCode', label: '工序组', component: 'ex-select', options: opts.groupCode, disabled: true},
        // {value: 'dayStart', label: '开始日期', span: 12, component: 'ex-select', options: [{value: 0, label: '今日'}, {value: 1, label: '次日'}]},
        {value: 'timeStart', label: '开始时间', span: 12, component: 'el-time-select', pickerOptions: {start: '00:00', step: '01:00', end: '23:00'}},
        // {value: 'dayEnd', label: '结束日期', span: 12, component: 'ex-select', options: [{value: 0, label: '今日'}, {value: 1, label: '次日'}]},
        {value: 'timeEnd', label: '结束时间', span: 12, component: 'el-time-select', pickerOptions: {start: '00:00', step: '01:00', end: '23:00'}}
      ],
      // 表单内容
      formData: Object.assign({
        classCode: '',
        className: '',
        groupCode: '',
        dayStart: 0,
        timeStart: '',
        dayEnd: 0,
        timeEnd: ''
      }, form),
      // 表单校验细则
      rules: {
        classCode: [{ required: true, message: '请输入班别编号', trigger: 'blur' }],
        className: [{ required: true, message: '请输入班别名称', trigger: 'blur' }]
      }
    })
  }
}
