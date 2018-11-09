export default function getOkForm (form = null, type = 'add', processGroupOptions, processOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}工艺流程[OK]表单`,
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
        options: type === 'edit' ? processOptions : [],
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'processNextGroup',
        label: '下一工序组',
        component: 'ex-select',
        options: processGroupOptions,
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'processNext',
        label: '下一工序',
        component: 'ex-select',
        options: type === 'edit' ? processOptions : [],
        span: 12,
        disabled: type === 'edit'
      },
      {
        value: 'standardTime',
        label: '标准工时',
        unit: '分',
        component: 'ex-input-number',
        span: 12
      },
      {
        value: 'processMinTime',
        label: '当前工序用时',
        unit: '分',
        component: 'ex-input-number',
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
        value: 'idx',
        label: '排序',
        component: 'ex-input-number',
        span: 12
      }
    ],
    formData: Object.assign({
      processFromGroup: '',
      processFrom: '',
      processNextGroup: '',
      processNext: '',
      processMinTime: 0,
      idx: 0,
      processResult: 'OK',
      strict: 0,
      standardTime: 0
    }, form),
    rules: {
    }
  })
}
