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

export default function getControlItemDetailForm (form = null, type = 'add', controlOptions) {
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
        value: 'groupCount',
        label: '组距',
        component: 'ex-input-number',
        span: 12
      }
    ],
    formData: Object.assign({
      controlId: '',
      ucl: 0,
      lcl: 0,
      groupCount: 0
    }, form),
    rules: {
      controlId: [{ required: true, type, validator: checkControl, trigger: 'change' }]
    }
  })
}
