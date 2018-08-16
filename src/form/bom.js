import apis from '@/apis'

function checkBomCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('Bom编号不能为空'))
  }
  apis.validateBomCode(value).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('Bom编号已存在'))
    }
  })
}

export default {
  title: 'BOM表单',
  formItems: [
    {
      value: 'bom_code',
      label: 'BOM编号',
      component: 'el-input'
    },
    {
      value: 'version_code',
      label: '版本',
      component: 'el-input'
    },
    {
      value: 'product_code',
      label: '产品',
      component: 'ex-select',
      options: []
    },
    {
      value: 'base_qty',
      label: '耗料基数',
      component: 'el-input-number'
    },
    {
      value: 'designator',
      label: '标志符',
      component: 'el-input'
    },
    {
      value: 'discription',
      label: '描述',
      component: 'el-input'
    },
    {
      value: 'enable',
      label: '是否启用',
      component: 'el-switch',
      activeValue: 1,
      inactiveValue: 0
    },
    {
      value: 'is_split',
      label: '是否拆分',
      component: 'el-switch',
      activeValue: 1,
      inactiveValue: 0
    }
  ],
  formData: {
    bom_code: '',
    version_code: '',
    product_code: '',
    base_qty: 1,
    designator: '',
    discription: '',
    enable: 1,
    is_split: 1
  },
  rules: {
    bom_code: [{ required: true, validator: checkBomCode, trigger: 'blur' }],
    version_code: [],
    product_code: [{ required: true, message: '请选择产品', trigger: 'blur' }],
    base_qty: [],
    designator: [],
    discription: [],
    enable: [],
    is_split: []
  }
}
