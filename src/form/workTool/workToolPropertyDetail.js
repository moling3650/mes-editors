export default function getWorkToolPropertyDetailForm (form = null, type = 'add') {
  if (form && form.ppt_condition === null) {
    form.ppt_condition = ''
  }
  if (form && form.ppt_max === null) {
    form.ppt_max = 0
  }
  if (form && form.ppt_min === null) {
    form.ppt_min = 0
  }
  let pptValRules = [{
    required: true,
    message: '请输入标准值',
    trigger: 'blur'
  }]
  if (form.ppt_type === 1 && form.ppt_condition === 'between') {
    pptValRules = [{ required: false }]
  } else if (form.ppt_type === 1) {
    pptValRules = [{
      required: true,
      pattern: /^\d+(\.\d+)?$/,
      transform: value => value && value.trim(),
      message: '请输入数字',
      trigger: 'blur'
    }]
  }

  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}工装属性明细表单`,
    formItems: [
      {
        value: 'ppt_name',
        label: '属性名称',
        component: 'el-input',
        disabled: true,
        span: 12
      },
      {
        value: 'ppt_type',
        label: '属性类型',
        component: 'ex-select',
        options: [{value: 0, label: '一般属性'}, {value: 1, label: '匹配属性'}],
        disabled: true,
        span: 12
      },
      {
        value: 'ppt_condition',
        label: '匹配条件',
        component: 'ex-select',
        placeholder: '请选择匹配条件',
        options: [{value: '>'}, {value: '>='}, {value: '<'}, {value: '<='}, {value: '='}, {value: '<>'}, {value: 'between'}],
        disabled: form.ppt_type === 0
      },
      {
        value: 'ppt_val',
        label: '标准值',
        component: 'el-input',
        disabled: !!(form.ppt_type === 1 && form.ppt_condition === 'between')
      },
      {
        value: 'ppt_min',
        label: '最小值',
        component: 'ex-input-number',
        disabled: !!(form.ppt_type === 0 || (form.ppt_type === 1 && form.ppt_condition !== 'between')),
        span: 12
      },
      {
        value: 'ppt_max',
        label: '最大值',
        component: 'ex-input-number',
        disabled: !!(form.ppt_type === 0 || (form.ppt_type === 1 && form.ppt_condition !== 'between')),
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
      ppt_id: '',
      workTool_code: '',
      ppt_name: '',
      ppt_val: '',
      ppt_type: 0,
      ppt_max: 0,
      ppt_min: 0,
      ppt_condition: '',
      enable: 1
    }, form),
    rules: {
      ppt_condition: [{ required: !!(form && form.ppt_type === 1), message: '请选择匹配条件', trigger: 'blur' }],
      ppt_val: pptValRules,
      ppt_max: [{ required: (form && form.ppt_condition === 'between') }],
      ppt_min: [{ required: (form && form.ppt_condition === 'between') }]
    }
  })
}
