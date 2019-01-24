import Api from '@/utils/Api'

// 表单自定义校验方法
function stationCodeValidate (rule, stationCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!stationCode) {
    return callback(new Error('工位编号不能为空'))
  }
  Api.get('StationLists/Validate', { stationCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('工位编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'StationLists',
  // 主键
  pk: 'stationid',
  // 表格列配置
  cols: [
    {field: 'stationCode', title: '工位编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'stationName', title: '工位名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    // {field: 'processCode', title: '所属工序', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'lineId', title: '线别名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'Lines/lineId'},
    {field: 'ipAddress', title: 'IP地址', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'macAddress', title: 'MAC地址', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'isFormal', title: '是否正式工位', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
    // {field: 'discription', title: '备注信息', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `工序信息`,
      // 表单元素
      formItems: [
        {value: 'stationCode', label: '工位编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'stationName', label: '工位名称', span: 12, component: 'el-input'},
        {value: 'lineId', label: '线别名称', span: 12, component: 'ex-select', options: opts['Lines/lineId']},
        {value: 'ipAddress', label: 'IP地址', span: 12, component: 'el-input'},
        {value: 'macAddress', label: 'MAC地址', span: 12, component: 'el-input'},
        {value: 'isFormal', label: '是否正式工位', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'description', label: '备注信息', span: 24, component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        stationCode: '',
        stationName: '',
        lineId: '',
        ipAddress: '',
        macAddress: '',
        isFormal: '',
        discription: ''
      }, form),
      // 表单校验细则
      rules: {
        stationCode: [{ required: true, type, validator: stationCodeValidate, trigger: 'blur' }],
        stationName: [{ required: true, message: '请输入工位名称', trigger: 'blur' }]
      }
    })
  }
}
