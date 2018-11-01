export default function getMachineStandardPointForm (form = null, type = 'add', businessOptions, pointOptions, driveOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}设备标准数据点表单`,
    formItems: [
      {
        value: 'machineCode',
        label: '设备编号',
        component: 'el-input',
        disabled: true,
        span: 24
      },
      {
        value: 'businessCode',
        label: '业务',
        component: 'ex-select',
        options: businessOptions,
        span: 12
      },
      {
        value: 'runAt',
        label: '业务',
        component: 'ex-select',
        options: [{value: 0, label: '客户端'}, {value: 1, label: '服务器'}],
        span: 12
      },
      {
        value: 'pointId',
        label: '数据点',
        component: 'ex-select',
        options: pointOptions,
        span: 12
      },
      {
        value: 'driveCode',
        label: '驱动',
        component: 'ex-select',
        options: driveOptions,
        span: 12
      },
      {
        value: 'triggerType',
        label: '触发类型',
        component: 'ex-select',
        options: [{value: 0, label: '按时间'}, {value: 1, label: '按次数'}],
        span: 12
      },
      {
        value: 'triggerCondition',
        label: '触发条件',
        component: 'ex-select',
        options: [{value: 0, label: '秒'}, {value: 1, label: '次'}],
        span: 12
      },
      {
        value: 'parameter',
        label: '参数',
        component: 'el-input',
        span: 12
      }
    ],
    formData: Object.assign({
      machineCode: '',
      businessCode: '',
      businessName: '',
      runAt: 0,
      pointId: '',
      driveCode: '',
      triggerType: 0,
      triggerCondition: 0,
      parameter: ''
    }, form),
    rules: {
      businessCode: [{ required: true, message: '请选择业务', trigger: 'blur' }]
    }
  })
}
