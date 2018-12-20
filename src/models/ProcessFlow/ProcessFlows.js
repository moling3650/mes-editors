import Api from '@/utils/Api'

// 表单自定义校验方法
function flowCodeValidate (rule, flowCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!flowCode) {
    return callback(new Error('工艺流程编号不能为空'))
  }
  Api.get('ProcessFlows/Validate', { flowCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('工艺流程编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'ProcessFlows',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'flowCode', title: '流程编号', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
    {field: 'flowName', title: '流程名称', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
    {field: 'versionCode', title: '版本号', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'productCode', title: '成品名称', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'bomCode', title: 'BOM编号', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'state', title: '状态', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true},
    {field: 'createDate', title: '创建时间', width: 250, titleAlign: 'center', columnAlign: 'center', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `流程维护`,
      // 表单元素
      formItems: [
        {value: 'flowCode', label: '流程编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'flowName', label: '流程名称', span: 12, component: 'el-input'},
        {value: 'versionCode', label: '版本号', span: 12, component: 'el-input'},
        {value: 'productCode', label: '成品名称', span: 12, component: 'ex-select', options: opts.wsid},
        {value: 'state', label: '状态', span: 12, component: 'ex-select', options: opts.wsid},
        {value: 'bomCode', label: '说明', component: 'ex-select', options: opts.wsid}
      ],
      // 表单内容
      formData: Object.assign({
        flowCode: '',
        flowName: '',
        versionCode: '',
        productCode: '',
        createDate: new Date(),
        state: 0,
        bomCode: ''
      }, form),
      // 表单校验细则
      rules: {
        flowCode: [{ required: true, type, validator: flowCodeValidate, trigger: 'blur' }],
        flowName: [{ required: true, message: '请输入流程名称', trigger: 'blur' }]
      }
    })
  }
}
