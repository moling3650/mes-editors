import Api from '@/utils/Api'

// 表单自定义校验方法
function empCodeValidate (rule, empCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!empCode) {
    return callback(new Error('员工编号不能为空'))
  }
  Api.get('Employees/Validate', { empCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('员工编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'Employees',
  // 主键
  pk: 'empCode',
  // 表格列配置
  cols: [
    {field: 'empCode', title: '员工编号', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'empName', title: '员工名称', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'password', title: '登录密码', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'phoneNum', title: '联系电话', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'address', title: '联系地址', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'sex', title: '性别', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'departCode', title: '部门名称', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: ['Departments/departCode']},
    {field: 'isStaff', title: '用户类型', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'entryDate', title: '入职时间', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'enable', title: '状态', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `员工信息`,
      // 表单元素
      formItems: [
        {value: 'empCode', label: '员工编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'empName', label: '员工名称', span: 12, component: 'el-input'},
        {value: 'password', label: '登录密码', span: 12, component: 'el-input'},
        {value: 'phoneNum', label: '联系电话', span: 12, component: 'el-input'},
        {value: 'sex', label: '性别', span: 12, component: 'ex-select', options: [{value: 0, label: '女'}, {value: 1, label: '男'}]},
        {value: 'departCode', label: '部门名称', span: 12, component: 'ex-select', options: opts['Departments/departCode']},
        {value: 'isStaff', label: '用户类型', span: 12, component: 'ex-select', options: [{value: 0, label: '一般用户'}, {value: 1, label: '管理员用户'}]},
        {value: 'entryDate', label: '入职日期', span: 12, component: 'el-date-picker'},
        {value: 'enable', label: '状态', span: 12, component: 'ex-select', options: [{value: 0, label: '停用'}, {value: 1, label: '正常'}]},
        {value: 'address', label: '联系地址', component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        empCode: '',
        empName: '',
        password: '',
        phoneNum: '',
        address: '',
        sex: 0,
        departCode: '',
        isStaff: 0,
        entryDate: '',
        enable: 0,
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        empCode: [{ required: true, type, validator: empCodeValidate, trigger: 'blur' }],
        empName: [{ required: true, message: '请输入员工名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
      }
    })
  }
}
