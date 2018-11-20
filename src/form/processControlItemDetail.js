import Api from '@/utils/Api'

function checkControl (rule, value, callback) {
  console.log(rule)
  if (rule.type === 'edit') {
    return callback()
  }
  if (!value) {
    return callback(new Error('请选择业务'))
  }
  const { controlId, pid } = rule.form
  console.log(pid)
  Api.get('ProcessControlItemDetails/Validate', { controlId, pid }).then(valid => {
    if (valid) {
      return callback()
    } else {
      return callback(new Error('该管控项已存在'))
    }
  })
}

export default function getControlItemDetailForm (form = null, type = 'add', driveOptions, controlOptions) {
  const triggerType = (form && form.triggerType) ? 1 : 0
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}管控细则表单`,
    formItems: [
      {
        value: 'controlId',
        label: '管控项',
        component: 'ex-select',
        options: controlOptions,
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
        value: 'parameter',
        label: '参数',
        component: 'el-input',
        span: 12
      },
      {
        value: 'ucl',
        label: '上限值',
        component: 'el-input',
        span: 12
      },
      {
        value: 'lcl',
        label: '下限值',
        component: 'el-input',
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
        component: 'ex-input-number',
        unit: ['秒', '次'][triggerType],
        span: 12
      },
      {
        value: 'groupCount',
        label: '组距',
        component: 'ex-input-number',
        span: 12
      },
      {
        value: 'toMonitor',
        label: '是否监视',
        component: 'ex-select',
        options: [{value: 0, label: '否'}, {value: 1, label: '是'}],
        span: 12
      }
    ],
    formData: Object.assign({
      controlId: '',
      triggerType: 0,
      triggerCondition: 0,
      parameter: '',
      ucl: 0,
      lcl: 0,
      groupCount: 0,
      driveCode: '',
      toMonitor: 0
    }, form),
    rules: {
      controlId: [{ required: true, type, validator: checkControl, trigger: 'change' }]
    }
  })
}
