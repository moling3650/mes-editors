import apis from '@/apis'

function checkMouldCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('模具编号不能为空'))
  }
  apis.validataMouldCode(value).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('模具编号已存在'))
    }
  })
}

export default function getMouldForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}模具表单`,
    formItems: [
      {
        value: 'mould_code',
        label: '模具编号',
        component: 'el-input',
        span: 12
      },
      {
        value: 'mould_name',
        label: '模具名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'supplier',
        label: '供应商',
        component: 'el-input',
        span: 12
      },
      {
        value: 'state',
        label: '状态',
        component: 'ex-select',
        options: [{value: -1, label: '报废'}, {value: 0, label: '禁用'}, {value: 1, label: '启用'}, {value: 2, label: '已使用'}, {value: 3, label: '保养'}, {value: 4, label: '维修'}],
        span: 12
      },
      {
        value: 'description',
        label: '说明',
        component: 'el-input',
        span: 12
      }
    ],
    formData: Object.assign({
      mould_code: '',
      mould_name: '',
      state: 0,
      input_time: '',
      supplier: '',
      model_code: '',
      description: ''
    }, form),
    rules: {
      mould_code: [{ required: true, validator: checkMouldCode, trigger: 'blur' }]
    }
  })
}
