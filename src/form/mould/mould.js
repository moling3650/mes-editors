import Api from '@/utils/Api'

function checkMouldCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('模具编号不能为空'))
  }
  if (rule.type === 'edit') {
    return callback()
  }
  Api.get('Moulds/Validate', { mouldCode: value }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('模具编号已存在'))
    }
  })
}

export default function getMouldForm (form = null, type = 'add') {
  const formItems = [
    {
      value: 'mouldCode',
      label: '模具编号',
      component: 'el-input',
      span: 11
    },
    {
      value: 'mouldName',
      label: '模具名称',
      component: 'el-input',
      span: 11
    },
    {
      value: 'supplier',
      label: '供应商',
      component: 'el-input',
      span: 11
    },
    {
      value: 'state',
      label: '状态',
      component: 'ex-select',
      options: [
        {value: -1, label: '报废'},
        {value: 0, label: '禁用'},
        {value: 1, label: '启用'},
        {value: 2, label: '已使用'},
        {value: 3, label: '保养'},
        {value: 4, label: '维修'}
      ],
      span: 11
    },
    {
      value: 'description',
      label: '说明',
      component: 'el-input',
      span: 11
    }
  ]
  if (type === 'add') {
    formItems.unshift({
      value: 'modelCode',
      label: '型号编号',
      component: 'el-input',
      disabled: true,
      span: 22
    })
  }
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}模具表单`,
    formItems,
    formData: Object.assign({
      mouldCode: '',
      mouldName: '',
      state: 1,
      inputTime: '',
      supplier: '',
      modelCode: '',
      description: ''
    }, form),
    rules: {
      mouldCode: [{ required: true, type, validator: checkMouldCode, trigger: 'blur' }],
      mouldName: [{ required: true, message: '请输入模具名称', trigger: 'blur' }]
    }
  })
}
