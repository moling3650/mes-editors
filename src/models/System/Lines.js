import Api from '@/utils/Api'

// 表单自定义校验方法
function lineCodeValidate (rule, lineCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!lineCode) {
    return callback(new Error('线别编号不能为空'))
  }
  Api.get('Lines/Validate', { lineCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('线别编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'Lines',
  // 主键
  pk: 'lineId',
  // 表格列配置
  cols: [
    {field: 'lineCode', title: '线别编号', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
    {field: 'lineName', title: '线别名称', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'wsid', title: '车间名称', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'description', title: '说明', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `线别维护`,
      // 表单元素
      formItems: [
        {value: 'lineCode', label: '线别编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'lineName', label: '线别名称', span: 12, component: 'el-input'},
        {value: 'wsid', label: '车间名称', span: 12, component: 'ex-select', options: opts.wsid},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        lineCode: '',
        lineName: '',
        wsid: 0,
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        lineCode: [{ required: true, type, validator: lineCodeValidate, trigger: 'blur' }],
        lineName: [{ required: true, message: '请输入线别名称', trigger: 'blur' }]
      }
    })
  }
}
