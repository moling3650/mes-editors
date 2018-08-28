import apis from '@/apis'

function checkFormulaCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('配方编号不能为空'))
  }
  apis.validateFormulaCode(value).then(valid => {
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
        value: 'bom_code',
        label: 'BOM编号',
        component: 'el-input',
        disabled: true
      },
      {
        value: 'formula_code',
        label: '配方编号',
        component: 'el-input',
        disabled: type !== 'add',
        span: 12
      },
      {
        value: 'formula_name',
        label: '配方名称',
        component: 'el-input',
        disabled: type === 'view',
        span: 12
      },
      {
        value: 'base_qty',
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
      bom_code: '',
      formula_code: '',
      formula_name: '',
      base_qty: 1,
      designator: '',
      description: '',
      enable: 1
    }, form),
    rules: {
      bom_code: [{ required: true, message: '请输入BOM编号', trigger: 'blur' }],
      formula_code: type === 'edit' ? [{ required: true }] : [{ required: true, validator: checkFormulaCode, trigger: 'blur' }],
      formula_name: [{ required: true, message: '请输入配方名称', trigger: 'blur' }]
    }
  })
}
