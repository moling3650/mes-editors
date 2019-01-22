import Api from '@/utils/Api'

// 表单自定义校验方法
function productCodeValidate (rule, productCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!productCode) {
    return callback(new Error('成品编号不能为空'))
  }
  Api.get('Products/Validate', { productCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('成品编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'Products',
  // 主键
  pk: 'productId',
  // 表格列配置
  cols: [
    {field: 'productCode', title: '成品编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'productName', title: '成品名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'versionCode', title: '版本编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'cmn', title: '客户料号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'codeRule', title: '条码规则', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'maxQty', title: '最大值', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'unit', title: '单位', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'mbm', title: '是否拆分', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'printBind', title: '是否打印', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'spt', title: '标准生产用时', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'modelCode', title: '型号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: true},
    {field: 'wipValid', title: 'wip有效时间', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'stationValid', title: '工位有效时间', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'manageType', title: '管理类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'lvl', title: '排序', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'inputTime', title: '录入时间', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `部门信息`,
      // 表单元素
      formItems: [
        {value: 'productCode', label: '成品编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'productName', label: '成品名称', span: 12, component: 'el-input'},
        {value: 'versionCode', label: '版本', span: 12, component: 'el-input'},
        {value: 'cmn', label: '客户料号', span: 12, component: 'el-input'},
        {value: 'codeRule', label: '编码规则', span: 12, component: 'el-input'},
        {value: 'maxQty', label: '最大值', span: 12, component: 'el-input'},
        {value: 'unit', label: '单位', span: 12, component: 'el-input'},
        {value: 'spt', label: '标准生产用时', span: 12, component: 'ex-input-number'},
        {value: 'mbm', label: '是否拆分', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'printBind', label: '是否打印', span: 12, component: 'ex-select', options: [{value: 0, label: '否'}, {value: 1, label: '是'}]},
        {value: 'wipValid', label: 'wip有效时间', span: 12, component: 'ex-input-number'},
        {value: 'stationValid', label: '工位有效时间', span: 12, component: 'ex-input-number'},
        {value: 'modelCode', label: '成品型号', span: 12, component: 'ex-select', options: opts.modelCode},
        {value: 'manageType', label: '管理类型', span: 12, component: 'ex-select', options: [{value: 1, label: '配方管理'}, {value: 2, label: 'BOM管理'}]},
        {value: 'lvl', label: '排序', span: 12, component: 'el-input'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
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
      // 表单校验细则
      rules: {
        productCode: [{ required: true, type, validator: productCodeValidate, trigger: 'blur' }],
        productName: [{ required: true, message: '请输入成品名称', trigger: 'blur' }]
      }
    })
  }
}
