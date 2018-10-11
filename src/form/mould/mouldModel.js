import apis from '@/apis'

function checkModelCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('型号编号不能为空'))
  }
  apis.validataMouldModelCode(value).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('型号编号已存在'))
    }
  })
}

export default function getMouldModelForm (form = null, type = 'add', options) {
  if (!options) {
    return void console.error('缺少模具类别的Options')
  }
  const formItems = [
    {
      value: 'manufacturer',
      label: '制造商',
      component: 'el-input',
      span: 11
    },
    {
      value: 'made_in',
      label: '产地',
      component: 'el-input',
      span: 11
    },
    {
      value: 'description',
      label: '描述',
      component: 'el-input',
      span: 22
    }
  ]
  if (type === 'add') {
    formItems.unshift({
      value: 'kind_id',
      label: '模具类别',
      component: 'ex-select',
      span: 22,
      options,
      disabled: true
    },
    {
      value: 'model_code',
      label: '型号编号',
      component: 'el-input',
      disabled: type === 'edit',
      span: 22
    })
  }
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}模具型号表单`,
    formItems,
    formData: Object.assign({
      kind_id: '',
      model_code: '',
      manufacturer: '',
      made_in: '',
      description: ''
    }, form),
    rules: {
      model_code: type === 'edit' ? [{ required: true, trigger: 'blur' }] : [{ required: true, validator: checkModelCode, trigger: 'blur' }]
    }
  })
}
