export default function getMouldKindsBindForm (form = null, type = 'add', MouldKindsoptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}设备模具类别绑定`,
    formItems: [
      {
        value: 'mould_kind_id',
        label: '模具类别',
        component: 'ex-select',
        options: MouldKindsoptions,
        span: 12
      },
      {
        value: 'qty',
        label: '数量',
        component: 'el-input',
        span: 12
      },
      {
        value: 'parameter',
        label: '参数',
        component: 'el-input',
        span: 12
      },
      {
        value: 'description',
        label: '说明',
        component: 'el-input',
        span: 12
      }
    ],
    formData: Object.assign({
      machine_kind_id: '',
      mould_kind_id: '',
      qty: 0,
      parameter: '',
      description: '',
      input_time: ''
    }, form),
    rules: {
      qty: [{ required: true, message: '请输入数量', trigger: 'blur' }]
    }

  })
}
