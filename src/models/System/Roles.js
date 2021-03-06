import Api from '@/utils/Api'

// 表单自定义校验方法
function roleIdValidate (rule, roleId, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!roleId) {
    return callback(new Error('角色编号不能为空'))
  }
  Api.get('Roles/Validate', { roleId }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('角色编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'Roles',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'roleId', title: '角色编号', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'roleName', title: '角色名称', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add') {
    return Promise.resolve({
      // 表单标题
      title: `角色维护`,
      // 表单元素
      formItems: [
        {value: 'roleId', label: '角色编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'roleName', label: '角色名称', span: 12, component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        roleId: '',
        roleName: '',
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        roleId: [{ required: true, type, validator: roleIdValidate, trigger: 'blur' }],
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
    })
  }
}
