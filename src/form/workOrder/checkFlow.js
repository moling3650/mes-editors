export default function getCheckFlowForm (form = null, productOptions, checkFlowOptions) {
  return Promise.resolve({
    title: `请选择工艺流程`,
    width: '350px',
    formItems: [
      {
        value: 'productCode',
        label: '成品名称',
        component: 'ex-select',
        options: productOptions,
        disabled: true
      },
      {
        value: 'flowCode',
        label: '工艺流程',
        component: 'ex-select',
        options: checkFlowOptions
      }
    ],
    formData: Object.assign({
      productCode: '',
      flowCode: ''
    }, form),
    rules: {
      flowCode: [{ required: true, message: '请选择工艺流程', trigger: 'blur' }]
    }
  })
}
