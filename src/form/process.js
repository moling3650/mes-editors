export default function getProcessForm (form = null, type = 'add', groupOptions, processTypeOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}工序表单`,
    formItems: [
      {
        value: 'groupCode',
        label: '所属工序组',
        component: 'ex-select',
        options: groupOptions,
        disabled: true
      },
      {
        value: 'processCode',
        label: '工序编号',
        component: 'el-input',
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'processName',
        label: '工序名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'typeId',
        label: '工序类型',
        component: 'ex-select',
        options: processTypeOptions,
        span: 12
      },
      {
        value: 'sectionName',
        label: '工段名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'routeType',
        label: '工段类型',
        component: 'ex-select',
        options: [{value: '首工站'}, {value: '中间站'}, {value: '尾工站'}],
        span: 12
      },
      {
        value: 'allowPack',
        label: '允许打包',
        component: 'ex-select',
        options: [{value: 0, label: '否'}, {value: 1, label: '是'}],
        span: 12
      },
      {
        value: 'idx',
        label: '工序排序',
        component: 'el-input',
        span: 12
      },
      {
        value: 'taskMode',
        label: '任务方式',
        component: 'ex-select',
        options: [{value: 0, label: '工单'}, {value: 1, label: '派工单'}],
        span: 12
      },
      {
        value: 'productionMode',
        label: '上产方式',
        component: 'ex-select',
        options: [{value: 0, label: '批次生产'}, {value: 1, label: '连续生产'}],
        span: 12
      }
    ],
    formData: Object.assign({
      processCode: '',
      processName: '',
      groupCode: '',
      typeId: 0,
      sectionName: '',
      routeType: '',
      allowPack: '',
      idx: 0,
      taskMode: '',
      productionMode: ''
    }, form),
    rules: {
      processCode: [{ required: true, message: '请输入工序编号', trigger: 'blur' }],
      processName: [{ required: true, message: '请输入工序名称', trigger: 'blur' }]
    }
  })
}
