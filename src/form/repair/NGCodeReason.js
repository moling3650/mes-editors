export default function getNGCodeReasonForm (form = null, reasonOptions, reasonTypeOptions) {
  return Promise.resolve({
    title: `不良原因`,
    width: '350px',
    formItems: [
      {
        value: 'reason_code',
        label: '原因',
        component: 'ex-select',
        options: reasonOptions,
        span: 22
      },
      {
        value: 'reasontype_code',
        label: '原因类型',
        component: 'ex-select',
        options: reasonTypeOptions,
        span: 22
      }
    ],
    formData: Object.assign({
      reason_code: '',
      reasontype_code: ''
    }, form),
    rules: {
      reason_code: [{ required: true, message: '请选择不良原因', trigger: 'blur' }],
      reasontype_code: [{ required: true, message: '请选择原因类型', trigger: 'blur' }]
    }
  })
}
