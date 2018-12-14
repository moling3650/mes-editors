export default function getProductForm (form = null, type = 'add', modelOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}成品表单`,
    formItems: [
      {
        value: 'productCode',
        label: '成品编号',
        component: 'el-input',
        disabled: type !== 'add',
        span: 12
      },
      {
        value: 'productName',
        label: '成品名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'versionCode',
        label: '版本编号',
        component: 'el-input',
        span: 12
      },
      {
        value: 'cmn',
        label: '客户料号',
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
        value: 'maxQty',
        label: '最大值',
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
        value: 'spt',
        label: '标准生产用时',
        component: 'ex-input-number',
        span: 12
      },
      {
        value: 'modelCode',
        label: '成品型号',
        component: 'el-input',
        span: 12
      },
      {
        value: 'mbm',
        label: '是否拆分',
        component: 'ex-select',
        options: [{value: 0, label: '否'}, {value: 1, label: '是'}],
        span: 12
      },
      {
        value: 'printBind',
        label: '是否打印',
        component: 'ex-select',
        options: [{value: 0, label: '否'}, {value: 1, label: '是'}],
        span: 12
      },
      {
        value: 'wipValid',
        label: 'wip有效时间',
        component: 'el-input',
        span: 12
      },
      {
        value: 'stationValid',
        label: '工位有效时间',
        component: 'el-input',
        span: 12
      },
      {
        value: 'manageType',
        label: '管理类型',
        component: 'ex-select',
        options: [{value: 1, label: '配方管理'}, {value: 2, label: 'BOM管理'}],
        span: 12
      },
      {
        value: 'lvl',
        label: '排序',
        component: 'el-input',
        span: 12
      },
      {
        value: 'description',
        label: '说明',
        component: 'el-input',
        span: 24
      }
    ],
    formData: Object.assign({
      productCode: '',
      productName: '',
      versionCode: '',
      cmn: '',
      codeRule: '',
      maxQty: 0,
      unit: '',
      mbm: '',
      printBind: '',
      spt: 0,
      modelCode: '',
      wipValid: 0,
      stationValid: 0,
      manageType: '',
      lvl: '',
      inputTime: '',
      description: ''
    }, form),
    rules: {
      productCode: [{ required: true, message: '请输入成品编号', trigger: 'blur' }],
      productName: [{ required: true, message: '请输入成品名称', trigger: 'blur' }]
    }
  })
}
