export default function getMouldPropertyDetailForm (form = null, type = 'add') {
  if (form && form.pptCondition === null) {
    form.pptCondition = ''
  }
  if (form && form.pptMax === null) {
    form.pptMax = 0
  }
  if (form && form.pptMin === null) {
    form.pptMin = 0
  }
  let pptValRules = [{
    required: true,
    message: '请输入标准值',
    trigger: 'blur'
  }]
  if (form.pptType === 1 && form.pptCondition === 'between') {
    pptValRules = [{ required: false }]
  } else if (form.pptType === 1) {
    pptValRules = [{
      required: true,
      pattern: /^\d+(\.\d+)?$/,
      transform: value => value && value.trim(),
      message: '请输入数字',
      trigger: 'blur'
    }]
  }

  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}模具属性明细表单`,
    formItems: [
      {
        value: 'pptName',
        label: '属性名称',
        component: 'el-input',
        disabled: true,
        span: 12
      },
      {
        value: 'pptType',
        label: '属性类型',
        component: 'ex-select',
        options: [{value: 0, label: '一般属性'}, {value: 1, label: '匹配属性'}],
        disabled: true,
        span: 12
      },
      {
        value: 'pptCondition',
        label: '匹配条件',
        component: 'ex-select',
        placeholder: '请选择匹配条件',
        options: [{value: '>'}, {value: '>='}, {value: '<'}, {value: '<='}, {value: '='}, {value: '<>'}, {value: 'between'}],
        disabled: form.pptType === 0
      },
      {
        value: 'pptVal',
        label: '标准值',
        component: 'el-input',
        disabled: !!(form.pptType === 1 && form.pptCondition === 'between')
      },
      {
        value: 'pptMin',
        label: '最小值',
        component: 'ex-input-number',
        disabled: !!(form.pptType === 0 || (form.pptType === 1 && form.pptCondition !== 'between')),
        span: 12
      },
      {
        value: 'pptMax',
        label: '最大值',
        component: 'ex-input-number',
        disabled: !!(form.pptType === 0 || (form.pptType === 1 && form.pptCondition !== 'between')),
        span: 12
      },
      {
        value: 'enable',
        label: '是否启用',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0,
        span: 8
      }
    ],
    formData: Object.assign({
      pptId: 0,
      mouldCode: '',
      pptName: '',
      pptVal: '',
      pptType: 0,
      pptMax: 0,
      pptMin: 0,
      pptCondition: '',
      enable: 1
    }, form),
    rules: {
      pptCondition: [{ required: !!(form && form.pptType === 1), message: '请选择匹配条件', trigger: 'blur' }],
      pptVal: pptValRules,
      pptMax: [{ required: (form && form.pptCondition === 'between') }],
      pptMin: [{ required: (form && form.pptCondition === 'between') }]
    }
  })
}
