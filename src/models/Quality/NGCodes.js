import Api from '@/utils/Api'

// 表单自定义校验方法
function ngCodeValidate (rule, ngCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!ngCode) {
    return callback(new Error('不良代码不能为空'))
  }
  Api.get('NgCodes/Validate', { ngCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('不良代码已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'NGCodes',
  // 主键
  pk: 'ngId',
  // 表格列配置
  cols: [
    {field: 'idx', title: '排序', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'ngCode', title: '不良代码', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'ngName', title: '不良名称', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'typeCode', title: '不良类型', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'NgTypes/typeCode'},
    {field: 'execProc', title: '执行处理', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'decription', title: '说明', width: 100, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    console.log(opts)
    return Promise.resolve({
      // 表单标题
      title: `不良现象维护`,
      // 表单元素
      formItems: [
        {value: 'ngCode', label: '不良代码', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'ngName', label: '不良名称', span: 12, component: 'el-input'},
        {value: 'typeCode', label: '不良类型', span: 12, component: 'ex-select', options: opts['NgTypes/typeCode']},
        {value: 'execProc', label: '执行处理', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'idx', label: '排序', span: 12, component: 'ex-input-number'},
        {value: 'decription', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        idx: 0,
        productType: '',
        ngCode: '',
        ngName: '',
        typeCode: '',
        execProc: 0,
        decription: ''
      }, form),
      // 表单校验细则
      rules: {
        ngCode: [{ required: true, type, validator: ngCodeValidate, trigger: 'blur' }],
        ngName: [{ required: true, message: '请输入不良名称', trigger: 'blur' }]
      }
    })
  }
}
