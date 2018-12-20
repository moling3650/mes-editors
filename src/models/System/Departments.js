import Api from '@/utils/Api'

// 表单自定义校验方法
function departCodeValidate (rule, departCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!departCode) {
    return callback(new Error('部门编号不能为空'))
  }
  Api.get('Departments/Validate', { departCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('部门编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'Departments',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'departCode', title: '部门编号', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
    {field: 'departName', title: '部门名称', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
    {field: 'description', title: '说明', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add') {
    return Promise.resolve({
      // 表单标题
      title: `部门信息`,
      // 表单元素
      formItems: [
        {value: 'departCode', label: '部门编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'departName', label: '部门名称', span: 12, component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        departCode: '',
        departName: '',
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        departCode: [{ required: true, type, validator: departCodeValidate, trigger: 'blur' }],
        departName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }]
      }
    })
  }
}
