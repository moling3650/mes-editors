import Api from '@/utils/Api'

function checkOrderNoCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('工单编号不能为空'))
  }
  if (rule.type === 'edit') {
    return callback()
  }
  Api.get('WorkOrders/Validate', { orderNo: value }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('工单编号已存在'))
    }
  })
}

export default function getMainOrderForm (form = null, type = 'add', productOptions, flowOptions, formulaOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}工单`,
    formItems: [
      {
        value: 'orderNo',
        label: '工单编号',
        component: 'el-input',
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'state',
        label: '状态',
        component: 'ex-select',
        options: [
          {value: -1, label: '停用'},
          {value: 0, label: '初始'},
          {value: 1, label: '在制'},
          {value: 2, label: '结案'}
        ],
        span: 12
      },
      {
        value: 'parentOrder',
        label: '上级工单',
        component: 'el-input',
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'productCode',
        label: '成品名称',
        component: 'ex-select',
        options: productOptions,
        span: 12
      },
      {
        value: 'flowCode',
        label: '工艺流程',
        component: 'ex-select',
        options: flowOptions,
        span: 12
      },
      {
        value: 'formulaCode',
        label: '生产配方',
        component: 'ex-select',
        options: formulaOptions,
        span: 12
      },
      {
        value: 'qty',
        label: '工单数量',
        component: 'el-input',
        span: 12
      },
      {
        value: 'plannedTime',
        label: '计划时间',
        component: 'el-date-picker',
        span: 12
      },
      {
        value: 'co',
        label: '订单编号',
        component: 'el-input',
        span: 12
      },
      {
        value: 'empCode',
        label: '创建人',
        component: 'el-input',
        span: 12
      },
      {
        value: 'urgency',
        label: '紧急程度',
        component: 'el-input',
        span: 12
      },
      {
        value: 'property',
        label: '工单类型',
        component: 'ex-select',
        options: [{value: 0, label: '返工'}, {value: 1, label: '正常'}],
        span: 12
      },
      {
        value: 'remarks',
        label: '备注',
        component: 'el-input',
        span: 24
      }
    ],
    formData: Object.assign({
      orderNo: '',
      parentOrder: '',
      mainOrder: '',
      productCode: '',
      qty: 0,
      co: '',
      urgency: 5,
      state: 0,
      flowCode: '',
      empCode: '10086',
      property: 1,
      lvl: 0,
      formulaCode: '',
      plannedTime: '',
      remarks: ''
    }, form),
    rules: {
      orderNo: [{ required: true, type, validator: checkOrderNoCode, trigger: 'blur' }]
    }
  })
}
