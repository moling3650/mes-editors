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

export default function getBomForm (form = null, type = 'add') {
  return apis.fetchProducts().then(products => {
    const options = products.map(p => {
      return {
        value: p.product_code,
        label: p.product_name
      }
    })
    return {
      title: `${type === 'add' ? '新建' : '编辑'}BOM表单`,
      formItems: [
        {
          value: 'bom_code',
          label: 'BOM编号',
          component: 'el-input',
          disabled: type === 'edit'
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
          options,
          disabled: !!(form && form.product_code)
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
      formData: Object.assign({
        bom_code: '',
        version_code: '',
        product_code: '',
        base_qty: 1,
        designator: '',
        discription: '',
        enable: 1,
        is_split: 1
      }, form),
      rules: {
        bom_code: type === 'edit' ? [{ required: true, trigger: 'blur' }] : [{ required: true, validator: checkBomCode, trigger: 'blur' }],
        version_code: [{ required: true, pattern: /^[A-Za-z0-9]+$/, transform: value => value.trim(), message: '请输入数字', trigger: 'blur' }],
        product_code: [{ required: true, message: '请选择产品', trigger: 'blur' }],
        base_qty: [],
        designator: [],
        discription: [],
        enable: [],
        is_split: []
      }
    }
  })
}
