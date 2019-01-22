import Api from '@/utils/Api'

// 表单自定义校验方法
function matCodeValidate (rule, matCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!matCode) {
    return callback(new Error('物料编号不能为空'))
  }
  Api.get('Materials/Validate', { matCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('物料编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'Materials',
  // 主键
  pk: 'matId',
  // 表格列配置
  cols: [
    {field: 'matCode', title: '物料编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'matName', title: '物料名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'codeRule', title: '编码规则', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'packingStyle', title: '包装方式', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'unit', title: '单位', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'maxQty', title: '最大数量', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'inputDate', title: '写入日期', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'validDate', title: '有效天数', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'state', title: '状态', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'enable', title: '是否启用', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'mbm', title: '最小批次', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'lvl', title: '级别', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'wipValid', title: '线边仓有效期', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'stationValid', title: '工位仓有效时间', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `物料信息`,
      // 表单元素
      formItems: [
        {value: 'matCode', label: '物料编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'matName', label: '物料名称', span: 12, component: 'el-input'},
        {value: 'codeRule', label: '编码规则', span: 12, component: 'el-input'},
        {value: 'packingStyle', label: '包装类型', span: 12, component: 'el-input'},
        {value: 'unit', label: '单位', span: 12, component: 'el-input'},
        {value: 'state', label: '状态', span: 12, component: 'ex-select', options: [{value: 0, label: '停用'}, {value: 1, label: '正常'}]},
        {value: 'enable', label: '是否启用', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'mbm', label: '最小批次', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'wipValid', label: '线边仓有效期', span: 12, component: 'ex-input-number'},
        {value: 'stationValid', label: '工位仓有效时间', span: 12, component: 'ex-input-number'},
        {value: 'lvl', label: '级别', span: 12, component: 'el-input'},
        {value: 'maxQty', label: '最大数量', span: 12, component: 'ex-input-number'},
        {value: 'validDate', label: '有效天数', span: 12, component: 'ex-input-number'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        matCode: '',
        matName: '',
        codeRule: '',
        packingStyle: '',
        unit: '',
        maxQty: 0,
        validDate: 0,
        state: 0,
        enable: 0,
        mbm: 0,
        lvl: 0,
        wipValid: 0,
        stationValid: 0,
        description: ''
      }, form),
      // 表单校验细则
      rules: {
        matCode: [{ required: true, type, validator: matCodeValidate, trigger: 'blur' }],
        matName: [{ required: true, message: '请输入物料名称', trigger: 'blur' }]
      }
    })
  }
}
