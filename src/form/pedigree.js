export default function getPedigreeForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}谱系表单`,
    formItems: [
      {
        value: 'pedigreeCode',
        label: '谱系编号',
        component: 'el-input',
        disabled: type !== 'add',
        span: 11
      },
      {
        value: 'pedigreeName',
        label: '谱系名称',
        component: 'el-input',
        span: 11
      },
      {
        value: 'description',
        label: '描述',
        component: 'el-input',
        span: 22
      }
    ],
    formData: Object.assign({
      pedigreeCode: '',
      pedigreeName: '',
      description: '',
      productTypeId: ''
    }, form),
    rules: {
      pedigreeCode: [{ required: true, message: '请输入谱系编号', trigger: 'blur' }],
      pedigreeName: [{ required: true, message: '请输入谱系名称', trigger: 'blur' }]
    }
  })
}
