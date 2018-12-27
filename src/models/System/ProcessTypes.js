import Api from '@/utils/Api'

// 表单自定义校验方法
function typeCodeValidate (rule, typeCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!typeCode) {
    return callback(new Error('工序类型编号不能为空'))
  }
  Api.get('ProcessTypes/Validate', { typeCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('工序类型编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'ProcessTypes',
  // 主键
  pk: 'typeId',
  // 表格列配置
  cols: [
    {field: 'typeCode', title: '类型编号', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'typeName', title: '类型名称', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add') {
    return Promise.resolve({
      // 表单标题
      title: `工序类型维护`,
      // 表单元素
      formItems: [
        {value: 'typeCode', label: '类型编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'typeName', label: '类型名称', span: 12, component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        typeCode: '',
        typeName: '',
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        typeCode: [{ required: true, type, validator: typeCodeValidate, trigger: 'blur' }],
        typeName: [{ required: true, message: '请输入工序类型名称', trigger: 'blur' }]
      }
    })
  }
}
