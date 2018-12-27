export default {
  // 模型名称
  name: 'Modules',
  // 主键
  pk: 'moduleCode',
  // 表格列配置
  cols: [
    {field: 'moduleName', title: '模块名称', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'url', title: '模块URL', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'moduleType', title: '权限', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 250, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `模块管理`,
      // 表单元素
      formItems: [
        {value: 'moduleName', label: '模块名称', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'moduleType', label: '权限', span: 12, component: 'ex-select', options: [{value: 0, label: 'WEB页'}, {value: 1, label: '客户端'}]},
        {value: 'url', label: '模块URL', component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        moduleName: '',
        url: '',
        description: '',
        moduleType: 0
      }, form),
      // 表单校验细则
      rules: {
        moduleName: [{ required: true, message: '请输入模块名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入模块URL', trigger: 'blur' }]
      }
    })
  }
}
