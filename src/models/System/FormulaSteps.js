import Api from '@/utils/Api'

// 表单自定义校验方法
function stepCodeValidate (rule, stepCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!stepCode) {
    return callback(new Error('配方步骤编号不能为空'))
  }
  Api.get('FormulaSteps/Validate', { stepCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('配方步骤编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'FormulaSteps',
  // 主键
  pk: 'stepId',
  // 表格列配置
  cols: [
    {field: 'idx', title: '排序', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'stepCode', title: '步骤编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'stepName', title: '步骤名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'stepType', title: '步骤类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'ctrlType', title: '控制类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'typeId', title: 'BOM编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'driveCode', title: '状态', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'consumePercent', title: '消耗比列', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'consumeType', title: '消耗类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'parameter', title: '参数', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'isRecord', title: '是否记录', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'matCode', title: '物料编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'unit', title: '单位', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'format', title: '格式', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'timeOut', title: '响应时间', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'allowReuse', title: '重复利用', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'autorun', title: '自动运行', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'autoRestart', title: '自动重启', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'triger', title: '触发事件', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'parameter2', title: '触发参数', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `配方步骤维护`,
      // 表单元素
      formItems: [
        {value: 'idx', label: '顺序编号', span: 12, component: 'ex-input-number'},
        {value: 'stepCode', label: '步骤编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'stepName', label: '步骤名称', span: 12, component: 'el-input'},
        {value: 'stepType', label: '步骤类型', span: 12, component: 'ex-select', options: [{value: '人'}, {value: '机'}, {value: '料'}, {value: '法'}, {value: '环'}, {value: '判断'}, {value: '驱动'}]},
        {value: 'ctrlType', label: '控制类型', span: 12, component: 'ex-select', options: [{value: 1, label: '自动消耗'}, {value: 2, label: '手动消耗'}, {value: 3, label: '装料并手动消耗'}, {value: 4, label: '只判断掩码'}]},
        {value: 'typeId', label: '驱动类型', span: 12, component: 'ex-select', options: opts.typeId},
        {value: 'driveCode', label: '驱动名称', span: 12, component: 'ex-select', options: opts.driveId},
        {value: 'consumePercent', label: '耗料比例', span: 12, component: 'ex-input-number'},
        {value: 'consumeType', label: '消耗类型', span: 12, component: 'ex-select', options: [{value: 1, label: '平均消耗'}, {value: 2, label: '顺序消耗'}]},
        {value: 'parameter', label: '参数', span: 12, component: 'el-input'},
        {value: 'isRecord', label: '是否记录', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'matCode', label: '物料编号', span: 12, component: 'ex-select', options: opts.matId},
        {value: 'unit', label: '单位', span: 12, component: 'el-input'},
        {value: 'format', label: '格式', span: 12, component: 'el-input'},
        {value: 'timeOut', label: '响应时间', span: 12, component: 'ex-select', options: opts.wsid},
        {value: 'allowReuse', label: '重复利用', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'autorun', label: '自动运行', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'autoRestart', label: '自动重启', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'triger', label: '触发事件', span: 12, component: 'el-input'},
        {value: 'parameter2', label: '触发参数', span: 12, component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        stepCode: '',
        stepName: '',
        stepType: '',
        ctrlType: 1,
        typeId: '',
        driveCode: '',
        parameter: '',
        idx: 0,
        isRecord: 0,
        consumePercent: 0,
        matCode: '',
        consumeType: '',
        unit: '',
        format: '',
        timeOut: 0,
        allowReuse: 0,
        autorun: 0,
        autoRestart: 0,
        triger: '',
        parameter2: ''
      }, form),
      // 表单校验细则
      rules: {
        stepCode: [{ required: true, type, validator: stepCodeValidate, trigger: 'blur' }],
        stepName: [{ required: true, message: '请输入步骤名称', trigger: 'blur' }]
      }
    })
  }
}
