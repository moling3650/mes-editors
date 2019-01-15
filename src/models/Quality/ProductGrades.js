import Api from '@/utils/Api'

// 表单自定义校验方法
function gradeCodeValidate (rule, gradeCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!gradeCode) {
    return callback(new Error('等级编号不能为空'))
  }
  Api.get('ProductGrades/Validate', { gradeCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('等级编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'ProductGrades',
  // 主键
  pk: 'gradeId',
  // 表格列配置
  cols: [
    {field: 'idx', title: '排序', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'gradeCode', title: '等级编号', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'gradeName', title: '等级名称', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'gradeType', title: '等级类型', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'parameter', title: '参数', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true},
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
        {value: 'gradeCode', label: '等级编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'gradeName', label: '等级名称', span: 12, component: 'el-input'},
        {value: 'gradeType', label: '等级类型', span: 12, component: 'ex-select', options: [{value: '良品'}, {value: '次品'}, {value: '不良品'}]},
        {value: 'idx', label: '排序', span: 12, component: 'ex-input-number'},
        {value: 'parameter', label: '参数', span: 12, component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        gradeCode: '',
        gradeName: '',
        gradeType: '',
        idx: 0,
        parameter: '',
        typeCode: '',
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        gradeCode: [{ required: true, type, validator: gradeCodeValidate, trigger: 'blur' }],
        gradeName: [{ required: true, message: '请输入等级名称', trigger: 'blur' }]
      }
    })
  }
}
