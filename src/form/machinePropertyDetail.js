export default function getMachinePropertyDetailForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}设备属性明细表单`,
    formItems: [
      {
        value: 'ppt_name',
        label: '属性名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'ppt_val',
        label: '属性值',
        component: 'el-input',
        span: 12
      }
    ],
    formData: Object.assign({
      ppt_id: '',
      machine_code: '',
      ppt_name: '',
      ppt_val: ''
    }, form),
    rules: {
      ppt_name: [{ required: true, message: '请输入属性名称', trigger: 'blur' }],
      ppt_val: [{ required: true, message: '请输入属性值', trigger: 'blur' }]
    }
  })
}
