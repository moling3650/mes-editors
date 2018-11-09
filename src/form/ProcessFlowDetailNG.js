export default function getNGForm (form = null, type = 'add', processGroupOptions, disposalOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}工艺流程[NG]表单`,
    formItems: [
      {
        value: 'flowCode',
        label: '工艺代码',
        component: 'el-input',
        disabled: true,
        span: 24
      },
      {
        value: 'processFromGroup',
        label: '当前工序组',
        component: 'ex-select',
        options: processGroupOptions,
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'processFrom',
        label: '当前工序',
        component: 'ex-select',
        options: [],
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'disposalCode',
        label: '处置代码',
        component: 'ex-select',
        options: disposalOptions,
        span: 12
      },
      {
        value: 'strict',
        label: '控制类型',
        component: 'ex-select',
        options: [{value: 0, label: '宽松'}, {value: 1, label: '严格'}],
        span: 12
      },
      {
        value: 'standardTime',
        label: '标准工时',
        unit: '分',
        component: 'ex-input-number',
        span: 12
      }
    ],
    formData: Object.assign({
      processFromGroup: '',
      processFrom: '',
      disposalCode: '',
      processResult: 'NG',
      strict: 0,
      standardTime: 0
    }, form),
    rules: {
    }
  })
}
