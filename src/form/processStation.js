export default function getProcessStationForm (form = null, type = 'add', lineOptions, processOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}工位表单`,
    formItems: [
      {
        value: 'processCode',
        label: '所属工序',
        component: 'ex-select',
        options: processOptions,
        disabled: true
      },
      {
        value: 'stationCode',
        label: '工位编号',
        component: 'el-input',
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'stationName',
        label: '工位名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'lineId',
        label: '线别名称',
        component: 'ex-select',
        options: lineOptions,
        span: 12
      },
      {
        value: 'ipAddress',
        label: 'IP地址',
        component: 'el-input',
        span: 12
      },
      {
        value: 'macAddress',
        label: 'MAC地址',
        component: 'el-input',
        span: 12
      },
      {
        value: 'isFormal',
        label: '是否正式工位',
        component: 'ex-select',
        options: [{value: 0, label: '否'}, {value: 1, label: '是'}],
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
      stationCode: '',
      stationName: '',
      processCode: '',
      lineId: '',
      ipAddress: '',
      macAddress: '',
      isFormal: '',
      discription: ''
    }, form),
    rules: {
      stationCode: [{ required: true, message: '请输入工位编号', trigger: 'blur' }],
      stationName: [{ required: true, message: '请输入工位名称', trigger: 'blur' }]
    }
  })
}
