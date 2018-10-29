import apis from '@/apis'

function checkModelCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('型号编号不能为空'))
  }
  if (rule.type === 'edit') {
    return callback()
  }
  apis.validataWorkToolModelCode(value).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('型号编号已存在'))
    }
  })
}

export default function getWorkToolModelForm (form = null, type = 'add', options) {
  if (!options) {
    return void console.error('缺少工装类别的Options')
  }
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}工装型号表单`,
    formItems: [
      {
        value: 'modelCode',
        label: '型号编号',
        component: 'el-input',
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'manufacturer',
        label: '制造商',
        component: 'el-input',
        span: 12
      },
      {
        value: 'madeIn',
        label: '产地',
        component: 'el-input',
        span: 12
      },
      {
        value: 'description',
        label: '描述',
        component: 'el-input',
        span: 12
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
