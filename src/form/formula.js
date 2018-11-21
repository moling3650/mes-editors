import Api from '@/utils/Api'

function checkFormulaCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('配方编号不能为空'))
  }
  if (rule.type === 'edit') {
    return callback()
  }
  Api.get('Formulas/Validate', { formulaCode: value }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('配方编号已存在'))
    }
  })
}

export default function getFormulaForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}配方`,
    formItems: [
      {
        value: 'bomCode',
        label: 'BOM编号',
        component: 'el-input',
        disabled: true
      },
      {
        value: 'formulaCode',
        label: '配方编号',
        component: 'el-input',
        disabled: type !== 'add',
        span: 12
      },
      {
        value: 'formulaName',
        label: '配方名称',
        component: 'el-input',
        disabled: type === 'view',
        span: 12
      },
      {
        value: 'baseQty',
        label: '耗料基数',
        component: 'ex-input-number',
        disabled: type === 'view'
      },
      {
        value: 'designator',
        label: '标志符',
        component: 'el-input',
        disabled: type === 'view',
        span: 12
      },
      {
        value: 'description',
        label: '描述',
        component: 'el-input',
        disabled: type === 'view',
        span: 12
      },
      {
        value: 'enable',
        label: '是否启用',
        component: 'el-switch',
        disabled: type === 'view',
        activeValue: 1,
        inactiveValue: 0
      }
    ],
    formData: Object.assign({
      bomCode: '',
      formulaCode: '',
      formulaName: '',
      baseQty: 1,
      designator: '',
      description: '',
      enable: 1
    }, form),
    rules: {
      bomCode: [{ required: true, message: '请输入BOM编号', trigger: 'blur' }],
      formulaCode: [{ required: true, type, validator: checkFormulaCode, trigger: 'blur' }],
      formulaName: [{ required: true, message: '请输入配方名称', trigger: 'blur' }]
    }
  })
}
