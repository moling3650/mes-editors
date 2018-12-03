export default function getOrderDetailForm (form = null, type = 'add', productOptions, flowOptions, stateOptions, formulaOptions, workshopOptions, employeeOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}工单明细表单`,
    formItems: [
      {
        value: 'orderNo',
        label: '工单编号',
        component: 'el-input',
        disabled: type === 'edit'
      },
      {
        value: 'parentOrder',
        label: '父工单',
        component: 'el-input',
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'mainOrder',
        label: '主工单',
        component: 'el-input',
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'productCode',
        label: '成品名称',
        component: 'ex-select',
        options: productOptions,
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'flowCode',
        label: '工艺名称',
        component: 'ex-select',
        options: flowOptions,
        disabled: type === 'edit',
        span: 12
      },
      {
        value: 'qty',
        label: '订单数量',
        component: 'ex-input-number',
        span: 12
      },
      {
        value: 'cpltQty',
        label: '完成数量',
        component: 'ex-input-number',
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'co',
        label: '订单编号',
        component: 'el-input',
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'state',
        label: '订单状态',
        component: 'ex-select',
        options: stateOptions,
        span: 12
      },
      {
        value: 'urgency',
        label: '紧急程度',
        component: 'el-input',
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'workshopCode',
        label: '生产车间',
        component: 'ex-select',
        options: workshopOptions,
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'formulaCode',
        label: '生产配方',
        component: 'ex-select',
        span: 12,
        options: formulaOptions,
        disabled: type === 'edit'
      },
      {
        value: 'property',
        label: '工单类型',
        component: 'ex-select',
        span: 12,
        options: [{value: 0, label: '维修'}, {value: 1, label: '正常'}],
        disabled: type === 'edit'
      },
      {
        value: 'empCode',
        label: '创建人',
        component: 'el-input',
        span: 12,
        options: employeeOptions,
        disabled: type === 'edit'
      },
      {
        value: 'inputTime',
        label: '创建时间',
        component: 'el-input',
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'remarks',
        label: '备注信息',
        component: 'el-input'
      }
    ],
    formData: Object.assign({
      orderNo: '',
      parentOrder: '',
      productCode: '',
      qty: 0,
      cpltQty: 0,
      co: '',
      urgency: '',
      inputTime: '',
      state: 1,
      flowCode: '',
      property: 1,
      mainOrder: '',
      empCode: '',
      remarks: '',
      workshopCode: '',
      formulaCode: ''
    }, form),
    rules: {
      qty: [{ required: true, type: 'number', trigger: 'blur' }]
    }
  })
}
