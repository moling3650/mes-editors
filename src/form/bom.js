import request from '@/utils/request'

function checkBomCode (rule, value, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!value) {
    return callback(new Error('Bom编号不能为空'))
  }
  request({
    method: 'get',
    url: 'Boms/Validate',
    params: {
      bomCode: value
    }
  }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('Bom编号已存在'))
    }
  })
}

export default function getBomForm (form = null, type = 'add', options) {
  if (!options) {
    return void console.error('缺少产品的Options')
  }
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}BOM表单`,
    formItems: [
      {
        value: 'bomCode',
        label: 'BOM编号',
        component: 'el-input',
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'versionCode',
        label: '版本',
        component: 'el-input',
        span: 12
      },
      {
        value: 'productCode',
        label: '产品',
        component: 'ex-select',
        options,
        disabled: !!(form && form.productCode)
      },
      {
        value: 'designator',
        label: '标识符',
        component: 'el-input',
        span: 12
      },
      {
        value: 'discription',
        label: '描述',
        component: 'el-input',
        span: 12
      },
      {
        value: 'enable',
        label: '是否启用',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0
      },
      {
        value: 'isSplit',
        label: '是否拆分',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0
      }
    ],
    formData: Object.assign({
      bomCode: '',
      versionCode: '',
      productCode: '',
      baseQty: 1,
      designator: '',
      discription: '',
      enable: 1,
      isSplit: 1
    }, form),
    rules: {
      bomCode: [{ required: true, type, validator: checkBomCode, trigger: 'blur' }],
      versionCode: [{ required: true, pattern: /^[A-Za-z0-9]+$/, transform: value => value.trim(), message: '请输入英文或数字', trigger: 'blur' }],
      productCode: [{ required: true, message: '请选择产品', trigger: 'blur' }]
    }
  })
}
