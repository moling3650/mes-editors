export default function getProcessControlItemForm (form = null, type = 'add', processOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}管控项表单`,
    formItems: [
      {
        value: 'processCode',
        label: '所属工序',
        component: 'ex-select',
        options: processOptions,
        disabled: true
      },
      {
        value: 'controlName',
        label: '管控项名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'inputTime',
        label: '建立时间',
        component: 'el-input',
        disabled: true,
        span: 12
      },
      {
        value: 'description',
        label: '备注信息',
        component: 'el-input',
        span: 24
      }
    ],
    formData: Object.assign({
      controlName: '',
      processCode: '',
      inputTime: '',
      discription: ''
    }, form),
    rules: {
      controlName: [{ required: true, message: '请输入管控项名称', trigger: 'blur' }]
    }
  })
}
