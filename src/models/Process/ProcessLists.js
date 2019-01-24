import Api from '@/utils/Api'

// 表单自定义校验方法
function processCodeValidate (rule, processCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!processCode) {
    return callback(new Error('工序编号不能为空'))
  }
  Api.get('ProcessLists/Validate', { processCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('工序编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'ProcessLists',
  // 主键
  pk: 'processid',
  // 表格列配置
  cols: [
    {field: 'idx', title: '排序', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'processCode', title: '工序编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'processName', title: '工序名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'groupCode', title: '工序组编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'typeId', title: '工序类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'ProcessTypes/typeId'},
    {field: 'sectionName', title: '工段名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'routeType', title: '工段类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'allowPack', title: '允许打包', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'taskMode', title: '任务方式', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'productionMode', title: '生产方式', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `工序信息`,
      // 表单元素
      formItems: [
        {value: 'processCode', label: '工序编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'processName', label: '工序名称', span: 12, component: 'el-input'},
        {value: 'typeId', label: '工序类型', span: 12, component: 'ex-select', options: opts['ProcessTypes/typeId']},
        {value: 'sectionName', label: '工段名称', span: 12, component: 'el-input'},
        {value: 'routeType', label: '工段类型', span: 12, component: 'ex-select', options: [{value: '首工站'}, {value: '中间站'}, {value: '尾工站'}]},
        {value: 'allowPack', label: '允许打包', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'idx', label: '工序排序', span: 12, component: 'el-input'},
        {value: 'taskMode', label: '任务方式', span: 12, component: 'ex-select', options: [{value: 0, label: '工单'}, {value: 1, label: '派工单'}]},
        {value: 'productionMode', label: '生产方式', span: 12, component: 'ex-select', options: [{value: 0, label: '批次生产'}, {value: 1, label: '连续生产'}]}
      ],
      // 表单内容
      formData: Object.assign({
        processCode: '',
        processName: '',
        groupCode: '',
        typeId: 0,
        sectionName: '',
        routeType: '',
        allowPack: '',
        idx: 0,
        taskMode: '',
        productionMode: ''
      }, form),
      // 表单校验细则
      rules: {
        processCode: [{ required: true, type, validator: processCodeValidate, trigger: 'blur' }],
        processName: [{ required: true, message: '请输入工序名称', trigger: 'blur' }]
      }
    })
  }
}
