import store from '@/store'
import Api from '@/utils/Api'

function checkBusinessCode (rule, value, callback) {
  console.log(rule)
  if (rule.type === 'edit') {
    return callback()
  }
  if (!value) {
    return callback(new Error('请选择业务'))
  }
  const { machineCode, businessCode } = rule.form
  Api.get('MachineStandardPoints/Validate', { machineCode, businessCode }).then(valid => {
    if (valid) {
      return callback()
    } else {
      return callback(new Error('该业务已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'MachineStandardPoints',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'machineCode', title: '设备编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'businessCode', title: '业务编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'businessName', title: '业务名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'pointId', title: '数据点', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'MachineDataPoints/pointId'},
    {field: 'taskDriveCode', title: '驱动名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'Drives/driveCode'},
    {field: 'runAt', title: '运行方式', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'parameter', title: '参数设置', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'triggerType', title: '触发类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'triggerCondition', title: '触发条件', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    const triggerType = (form && form.triggerType) ? 1 : 0
    return Promise.resolve({
      // 表单标题
      title: `设备过程点位表单`,
      // 表单元素
      formItems: [
        {value: 'machineCode', label: '设备编号', span: 24, component: 'el-input', disabled: true},
        {value: 'businessCode', label: '业务', span: 12, component: 'ex-select', disabled: true, options: store.getters['Drives/options']},
        {value: 'runAt', label: '运行方式', span: 12, component: 'ex-select', options: [{value: 0, label: '客户端'}, {value: 1, label: '服务器'}]},
        {value: 'pointId', label: '数据点', span: 12, component: 'ex-select', options: store.getters['MachineDataPoints/options']},
        {value: 'taskDriveCode', label: '任务驱动', span: 12, component: 'ex-select', options: store.getters['Drives/options']},
        {value: 'triggerType', label: '触发类型', span: 12, component: 'ex-select', options: [{value: 0, label: '按时间'}, {value: 1, label: '按次数'}]},
        {value: 'triggerCondition', label: '触发条件', span: 12, component: 'ex-input-number', unit: ['秒', '次'][triggerType]},
        {value: 'parameter', label: '参数设置', span: 12, component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        machineCode: '',
        businessCode: '',
        businessName: '',
        runAt: 0,
        pointId: '',
        taskDriveCode: '',
        triggerType: 0,
        triggerCondition: 0,
        parameter: ''
      }, form),
      // 表单校验细则
      rules: {
        businessCode: [{ required: true, type, validator: checkBusinessCode, trigger: 'change' }]
      }
    })
  }
}
