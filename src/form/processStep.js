export default function getProcessStepForm (form = null, type = 'add', driveTypesOptions = [], drivesOptions = [], matOptions = []) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}后工序步骤表单`,
    formItems: [
      {
        value: 'processCode',
        label: '工序编号',
        component: 'el-input',
        disabled: true,
        span: 24
      },
      {
        value: 'stepCode',
        label: '步骤编号',
        component: 'el-input',
        span: 12
      },
      {
        value: 'stepName',
        label: '步骤名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'stepType',
        label: '步骤类型',
        component: 'ex-select',
        options: [{value: '人'}, {value: '机'}, {value: '料'}, {value: '法'}, {value: '环'}, {value: '判断'}, {value: '驱动'}],
        span: 12
      },
      {
        value: 'ctrlType',
        label: '控制类型',
        component: 'ex-select',
        options: [{value: 1, label: '自动消耗'}, {value: 2, label: '手动消耗'}, {value: 3, label: '装料并手动消耗'}, {value: 4, label: '只判断掩码'}],
        span: 12
      },
      {
        value: 'typeId',
        label: '驱动类型',
        component: 'ex-select',
        options: driveTypesOptions,
        span: 12
      },
      {
        value: 'driveCode',
        label: '驱动名称',
        component: 'ex-select',
        options: type === 'edit' ? drivesOptions : [],
        span: 12
      },
      {
        value: 'consumePercent',
        label: '耗料比例',
        component: 'ex-input-number',
        span: 12
      },
      {
        value: 'consumeType',
        label: '消耗类型',
        component: 'ex-select',
        options: [{value: 1, label: '平均消耗'}, {value: 2, label: '顺序消耗'}],
        span: 12
      },
      {
        value: 'parameter',
        label: '参数',
        component: 'el-input',
        span: 12
      },
      {
        value: 'idx',
        label: '顺序编号',
        component: 'ex-input-number',
        span: 12
      },
      {
        value: 'isRecord',
        label: '是否记录',
        component: 'ex-select',
        options: [{value: 0, label: '否'}, {value: 1, label: '是'}],
        span: 12
      },
      {
        value: 'matCode',
        label: '物料编号',
        component: 'ex-select',
        options: matOptions,
        span: 12
      },
      {
        value: 'unit',
        label: '单位',
        component: 'el-input',
        span: 12
      },
      {
        value: 'format',
        label: '格式',
        component: 'el-input',
        span: 12
      },
      {
        value: 'timeOut',
        label: '响应时间',
        component: 'el-input',
        span: 12
      },
      {
        value: 'allowReuse',
        label: '重复利用',
        component: 'ex-select',
        options: [{value: 0, label: '否'}, {value: 1, label: '是'}],
        span: 12
      },
      {
        value: 'autorun',
        label: '自动运行',
        component: 'ex-select',
        options: [{value: 0, label: '否'}, {value: 1, label: '是'}],
        span: 12
      },
      {
        value: 'autoRestart',
        label: '自动重启',
        component: 'ex-select',
        options: [{value: 0, label: '否'}, {value: 1, label: '是'}],
        span: 12
      },
      {
        value: 'triger',
        label: '触发事件',
        component: 'el-input',
        span: 12
      },
      {
        value: 'parameter2',
        label: '触发参数',
        component: 'el-input',
        span: 12
      }
    ],
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
    rules: {
      // typeId: [{ required: true, type, validator: checkTypeId, trigger: 'change' }]
    }
  })
}
