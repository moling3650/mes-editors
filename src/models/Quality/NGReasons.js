import Api from '@/utils/Api'

// 表单自定义校验方法
function reasonCodeValidate (rule, reasonCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!reasonCode) {
    return callback(new Error('不良原因编号不能为空'))
  }
  Api.get('NGReasons/Validate', { reasonCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('不良原因编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'NGReasons',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'reasonCode', title: '不良原因编号', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'reasonName', title: '不良原因名称', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    console.log(opts)
    return Promise.resolve({
      // 表单标题
      title: `不良原因维护`,
      // 表单元素
      formItems: [
        {value: 'reasonCode', label: '原因编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'reasonName', label: '原因名称', span: 12, component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        reasonCode: '',
        reasonName: '',
        typeCode: '',
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        reasonCode: [{ required: true, type, validator: reasonCodeValidate, trigger: 'blur' }],
        reasonName: [{ required: true, message: '请输入不良原因名称', trigger: 'blur' }]
      }
    })
  }
}
