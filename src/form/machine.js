import apis from '@/apis'

function checkMachineCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('设备编号不能为空'))
  }
  apis.validataMachineCode(value).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('设备编号已存在'))
    }
  })
}

export default function getMachineForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}设备表单`,
    formItems: [
      {
        value: 'machine_code',
        label: '设备编号',
        component: 'el-input',
        span: 12
      },
      {
        value: 'machine_name',
        label: '设备名称',
        component: 'el-input',
        span: 12
      }
    ],
    formData: Object.assign({
      machine_code: '',
      machine_name: ''
    }, form),
    rules: {
      machine_code: [{ required: true, validator: checkMachineCode, trigger: 'blur' }]
    }
  })
}
