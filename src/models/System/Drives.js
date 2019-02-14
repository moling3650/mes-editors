import Api from '@/utils/Api'

// 表单自定义校验方法
function driveCodeValidate (rule, driveCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!driveCode) {
    return callback(new Error('驱动编号不能为空'))
  }
  Api.get('Drives/Validate', { driveCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('驱动编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'Drives',
  // 主键
  pk: 'driveId',
  // 表格列配置
  cols: [
    {field: 'driveCode', title: '驱动编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'driveName', title: '驱动名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'fileName', title: '文件名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'isPublic', title: '是否公用', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'enable', title: '状态', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'property', title: '属性', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `驱动信息`,
      // 表单元素
      formItems: [
        {value: 'driveCode', label: '驱动编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'driveName', label: '驱动名称', span: 12, component: 'el-input'},
        {value: 'fileName', label: '文件名称', span: 12, component: 'el-input'},
        {value: 'description', label: '说明', span: 22, component: 'el-input'},
        {value: 'isPublic', label: '是否公用', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'enable', label: '状态', span: 12, component: 'ex-select', options: [{value: 0, label: '停用'}, {value: 1, label: '正常'}]},
        {value: 'property', label: '属性', span: 12, component: 'ex-select', options: [{value: 0, label: '前工步'}, {value: 1, label: '后工步'}]}
      ],
      // 表单内容
      formData: Object.assign({
        driveCode: '',
        driveName: '',
        fileName: '',
        description: '',
        isPublic: 0,
        enable: 0,
        property: 0
      }, form),
      // 表单校验细则
      rules: {
        driveCode: [{ required: true, type, validator: driveCodeValidate, trigger: 'blur' }],
        driveName: [{ required: true, message: '请输入驱动名称', trigger: 'blur' }]
      }
    })
  }
}
