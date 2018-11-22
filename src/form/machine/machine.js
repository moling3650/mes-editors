import Api from '@/utils/Api'

function checkMachineCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('设备编号不能为空'))
  }
  if (rule.type === 'edit') {
    return callback()
  }
  Api.get('Machines/Validate', { machineCode: value }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('设备编号已存在'))
    }
  })
}

export default function getMachineForm (form = null, type = 'add', departmentOpts, workShopOpts) {
  if (!(form && form.modelCode)) {
    throw new Error('缺少modelCode字段')
  }
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}型号${form.modelCode}的设备`,
    formItems: [
      {
        value: 'machineCode',
        label: '设备编号',
        component: 'el-input',
        span: 12
      },
      {
        value: 'machineName',
        label: '设备名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'simpleName',
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
        options: departmentOpts,
        span: 12
      },
      {
        value: 'wsCode',
        label: '车间',
        component: 'ex-select',
        options: workShopOpts,
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
      machineCode: '',
      machineName: '',
      state: 0,
      simpleName: '',
      manufacturer: '',
      arrivaldate: '',
      userdepartment: '',
      wsCode: '',
      description: ''
    }, form),
    rules: {
      machineCode: [{ required: true, type, validator: checkMachineCode, trigger: 'blur' }]
    }
  })
}
