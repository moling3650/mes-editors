import store from '@/store'

export default {
  // 模型名称
  name: 'MachineDataPoints',
  // 主键
  pk: 'pointId',
  // 表格列配置
  cols: [
    {field: 'dataPointName', title: '数据点名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'machineCode', title: '设备编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'dcType', title: '运行方式', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'pointType', title: '采集类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'PointTypes/typeId'},
    {field: 'driveType', title: '驱动类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'DriveTypes/typeId'},
    {field: 'dcDriveCode', title: '驱动编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'Drives/driveCode'},
    {field: 'parameter', title: '参数设置', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'rate', title: '频率设置', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '备注', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `设备数据点表单`,
      // 表单元素
      formItems: [
        {value: 'dataPointName', label: '数据点名称', span: 24, component: 'el-input', disabled: type === 'edit'},
        {value: 'pointType', label: '采集类型', span: 12, component: 'ex-select', options: store.getters['PointTypes/options']},
        {value: 'driveType', label: '驱动类型', span: 12, component: 'ex-select', options: store.getters['DriveTypes/options']},
        {value: 'dcDriveCode', label: '驱动名称', span: 12, component: 'ex-select', options: store.getters['Drives/options']},
        {value: 'parameter', label: '参数设置', span: 12, component: 'el-input'},
        {value: 'rate', label: '频率设置', span: 12, component: 'ex-input-number'},
        {value: 'dcType', label: '运行方式', span: 12, component: 'ex-select', options: [{value: 0, label: '总线'}, {value: 1, label: '独立'}]},
        {value: 'description', label: '备注', span: 12, component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        dataPointName: '',
        pointType: '',
        dcDriveCode: '',
        parameter: '',
        dcType: '',
        rate: 0,
        description: '',
        driveType: ''
      }, form),
      // 表单校验细则
      rules: {
        dataPointName: [{ required: true, message: '请输入数据点名称', trigger: 'blur' }]
      }
    })
  }
}
