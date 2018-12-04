export default function getGroupClassForm (form = null, type = 'add', groupOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}班次表单`,
    formItems: [
      {
        value: 'groupCode',
        label: '所属工序组',
        component: 'ex-select',
        options: groupOptions,
        disabled: true
      },
      {
        value: 'classCode',
        label: '班次编号',
        component: 'el-input',
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'className',
        label: '班次名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'dayStart',
        label: '起始日期',
        component: 'ex-select',
        options: [{value: 0, label: '今日'}, {value: 1, label: '次日'}],
        span: 12
      },
      {
        value: 'timeStart',
        label: '起始时间',
        component: 'el-input',
        span: 12
      },
      {
        value: 'dayEnd',
        label: '结束日期',
        component: 'ex-select',
        options: [{value: 0, label: '今日'}, {value: 1, label: '次日'}],
        span: 12
      },
      {
        value: 'timeEnd',
        label: '结束时间',
        component: 'el-input',
        span: 12
      }
    ],
    formData: Object.assign({
      classCode: '',
      className: '',
      groupCode: '',
      dayStart: 0,
      timeStart: '',
      dayEnd: 0,
      timeEnd: ''
    }, form),
    rules: {
      classCode: [{ required: true, message: '请输入班次编号', trigger: 'blur' }],
      className: [{ required: true, message: '请输入班次名称', trigger: 'blur' }]
    }
  })
}
