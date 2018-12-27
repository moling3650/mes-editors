import Api from '@/utils/Api'

// 表单自定义校验方法
function wsCodeValidate (rule, wsCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!wsCode) {
    return callback(new Error('车间编号不能为空'))
  }
  Api.get('Workshops/Validate', { wsCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('车间编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'Workshops',
  // 主键
  pk: 'wsid',
  // 表格列配置
  cols: [
    {field: 'wsCode', title: '车间编号', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'wsName', title: '车间名称', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add') {
    return Promise.resolve({
      // 表单标题
      title: `车间管理`,
      // 表单元素
      formItems: [
        {value: 'wsCode', label: '车间编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'wsName', label: '车间名称', span: 12, component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        wsCode: '',
        wsName: '',
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        wsCode: [{ required: true, type, validator: wsCodeValidate, trigger: 'blur' }],
        wsName: [{ required: true, message: '请输入车间名称', trigger: 'blur' }]
      }
    })
  }
}
