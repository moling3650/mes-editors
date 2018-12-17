export default function getMaterialForm (form = null, type = 'add', materialTypeOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}物料表单`,
    formItems: [
      {
        value: 'typeId',
        label: '所属类型',
        component: 'ex-select',
        options: materialTypeOptions,
        disabled: true
      },
      {
        value: 'matCode',
        label: '物料编号',
        component: 'el-input',
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'matName',
        label: '物料名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'codeRule',
        label: '编码规则',
        component: 'el-input',
        span: 12
      },
      {
        value: 'packingStyle',
        label: '包装类型',
        component: 'el-input',
        span: 12
      },
      {
        value: 'unit',
        label: '单位',
        component: 'el-input',
        span: 12
      },
      {
        value: 'state',
        label: '状态',
        component: 'ex-select',
        options: [{value: 0, label: '停用'}, {value: 1, label: '正常'}],
        span: 12
      },
      {
        value: 'enable',
        label: '是否启用',
        component: 'ex-select',
        options: [{value: 0, label: '否'}, {value: 1, label: '是'}],
        span: 12
      },
      {
        value: 'mbm',
        label: '最小批次',
        component: 'ex-select',
        options: [{value: 0, label: '否'}, {value: 1, label: '是'}],
        span: 12
      },
      {
        value: 'wipValid',
        label: '线边仓有效期',
        component: 'el-input',
        span: 12
      },
      {
        value: 'stationValid',
        label: '工位仓有效期',
        component: 'el-input',
        span: 12
      },
      {
        value: 'lvl',
        label: '级别',
        component: 'ex-input-number',
        span: 12
      },
      {
        value: 'maxQty',
        label: '最大数量',
        component: 'ex-input-number',
        span: 12
      },
      {
        value: 'validDate',
        label: '有效天数',
        component: 'ex-input-number',
        span: 12
      },
      {
        value: 'description',
        label: '说明',
        component: 'el-input'
      }
    ],
    formData: Object.assign({
      matCode: '',
      matName: '',
      codeRule: '',
      packingStyle: '',
      unit: '',
      maxQty: 0,
      validDate: 0,
      state: 0,
      enable: 0,
      mbm: 0,
      lvl: 0,
      wipValid: 0,
      stationValid: 0,
      description: ''
    }, form),
    rules: {
      matCode: [{ required: true, message: '请输入物料编号', trigger: 'blur' }],
      matName: [{ required: true, message: '请输入物料名称', trigger: 'blur' }]
    }
  })
}
