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

export default function getMachineForm (form = null, type = 'add', Departmentoptions, WsCodeoptions) {
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
      },
      {
        value: 'simple_name',
        label: '简称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'state',
        label: '状态',
        component: 'ex-select',
        options: [{value: 0, label: '禁用'}, {value: 1, label: '启用'}],
        span: 12
      },
      {
        value: 'arrivaldate',
        label: '到货日期',
        component: 'el-date-picker',
        span: 12
      },
      {
        value: 'userdepartment',
        label: '部门',
        component: 'ex-select',
        options: Departmentoptions,
        span: 12
      },
      {
        value: 'ws_code',
        label: '车间',
        component: 'ex-select',
        options: WsCodeoptions,
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
      machine_code: '',
      machine_name: '',
      state: 0,
      simple_name: '',
      manufacturer: '',
      arrivaldate: '',
      userdepartment: '',
      ws_code: '',
      description: ''
    }, form),
    rules: {
      machine_code: type === 'edit' ? [{ required: true, trigger: 'blur' }] : [{ required: true, validator: checkMachineCode, trigger: 'blur' }]
    }
  })
}
