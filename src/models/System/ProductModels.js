import Api from '@/utils/Api'

// 表单自定义校验方法
function modelCodeValidate (rule, modelCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!modelCode) {
    return callback(new Error('型号编号不能为空'))
  }
  Api.get('ProductModels/Validate', { modelCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('型号编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'ProductModels',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'modelCode', title: '型号编号', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'modelName', title: '型号名称', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add') {
    return Promise.resolve({
      // 表单标题
      title: `型号维护`,
      // 表单元素
      formItems: [
        {value: 'modelCode', label: '型号编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'modelName', label: '型号名称', span: 12, component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        modelCode: '',
        modelName: '',
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        modelCode: [{ required: true, type, validator: modelCodeValidate, trigger: 'blur' }],
        modelName: [{ required: true, message: '请输入型号名称', trigger: 'blur' }]
      }
    })
  }
}
