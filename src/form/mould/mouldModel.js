import Api from '@/utils/Api'

function checkModelCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('型号编号不能为空'))
  }
  if (rule.type === 'edit') {
    return callback()
  }
  Api.get('MouldModels/Validate', { modelCode: value }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('型号编号已存在'))
    }
  })
}

export default function getMouldModelForm (form = null, type = 'add') {
  if (!(form && form.kindId)) {
    throw new Error('缺少kindId字段')
  }
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}模具型号表单`,
    formItems: [
      {
        value: 'modelCode',
        label: '型号编号',
        component: 'el-input',
        disabled: type === 'edit',
        span: 22
      },
      {
        value: 'manufacturer',
        label: '制造商',
        component: 'el-input',
        span: 22
      },
      {
        value: 'madeIn',
        label: '产地',
        component: 'el-input',
        span: 22
      },
      {
        value: 'description',
        label: '描述',
        component: 'el-input',
        span: 22
      }
    ],
    formData: Object.assign({
      modelCode: '',
      manufacturer: '',
      madeIn: '',
      description: ''
    }, form),
    rules: {
      modelCode: [{ required: true, type, validator: checkModelCode, trigger: 'blur' }]
    }
  })
}
