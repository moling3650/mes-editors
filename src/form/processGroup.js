export default function getProcessGroupForm (form = null, type = 'add', workshopOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}工序组表单`,
    formItems: [
      {
        value: 'groupCode',
        label: '工序组编号',
        component: 'el-input',
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'groupName',
        label: '工序组名称',
        component: 'el-input',
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'wsid',
        label: '生产车间',
        component: 'ex-select',
        options: workshopOptions,
        span: 12
      },
      {
        value: 'idx',
        label: '工序组排序',
        component: 'ex-input-number',
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
      groupCode: '',
      groupName: '',
      wsid: '',
      description: '',
      idx: ''
    }, form),
    rules: {
      groupCode: [{ required: true, message: '请输入工序组编号', trigger: 'blur' }],
      groupName: [{ required: true, message: '请输入工序组名称', trigger: 'blur' }]
    }
  })
}
