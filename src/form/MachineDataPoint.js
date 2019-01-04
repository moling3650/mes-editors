export default function getMachineDataPointForm (form = null, type = 'add', pointTypeOptions, drivesOptions = []) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}设备数据点表单`,
    formItems: [
      {
        value: 'dataPointName',
        label: '数据点名称',
        component: 'el-input',
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'pointType',
        label: '采集类型',
        component: 'ex-select',
        options: pointTypeOptions,
        span: 12
      },
      {
        value: 'driveType',
        label: '驱动类型',
        component: 'ex-select',
        options: [{value: 1, label: '数据驱动'}, {value: 2, label: '业务驱动'}],
        span: 12
      },
      {
        value: 'dcDriveCode',
        label: '驱动',
        component: 'ex-select',
        options: type === 'edit' ? drivesOptions : [],
        span: 12
      },
      {
        value: 'parameter',
        label: '参数设置',
        component: 'el-input',
        span: 12
      },
      {
        value: 'rate',
        label: '频率设置',
        component: 'ex-input-number',
        span: 12
      },
      {
        value: 'dcType',
        label: '驱动类型',
        component: 'ex-select',
        options: [{value: 0, label: '总线'}, {value: 1, label: '独立'}],
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
      dataPointName: '',
      pointType: '',
      dcDriveCode: '',
      parameter: '',
      dcType: '',
      rate: 0,
      description: '',
      driveType: ''
    }, form),
    rules: {
      dataPointName: [{ required: true, message: '请输入数据点名称', trigger: 'blur' }]
    }
  })
}
