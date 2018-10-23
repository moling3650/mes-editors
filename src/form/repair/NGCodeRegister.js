function checkNumber (rule, value, callback) {
  console.log(value)
  if (!value && value !== 0) {
    return callback(new Error('登记数量不能为空'))
  } else if (value <= 0) {
    return callback(new Error('登记数量必须大于0'))
  } else {
    return callback()
  }
}

export default function getNGCodeRegisterForm (form = null) {
  return Promise.resolve({
    title: `不良现象-登记`,
    width: '500px',
    formItems: [
      {
        value: 'type_name',
        label: '不良类型',
        component: 'el-input',
        disabled: true,
        span: 24
      },
      {
        value: 'ng_name',
        label: '现象描述',
        component: 'el-input',
        disabled: true,
        span: 24
      },
      {
        value: 'number',
        label: '数量',
        component: 'ex-input-number',
        span: 24
      }
    ],
    formData: Object.assign({
      type_name: '',
      ng_name: '',
      number: 0
    }, form),
    rules: {
      number: [{ required: true, validator: checkNumber, trigger: 'blur' }]
    }
  })
}
