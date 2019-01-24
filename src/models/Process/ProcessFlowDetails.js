export default {
  // 模型名称
  name: 'ProcessFlowDetails',
  // 主键
  pk: 'pid',
  // 表格列配置
  cols: [
    {field: 'flowCode', title: '工艺代码', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'processFromGroup', title: '当前工序组', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'processFrom', title: '当前工序', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'processResult', title: '结果', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'processNextGroup', title: '下一工序组', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'processNext', title: '下一工序', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'disposalCode', title: '处置代码', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'processMinTime', title: '标准工时(分)', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'strict', title: '控制类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'standardTime', title: '标准用时', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `工艺流程[OK]表单`,
      // 表单元素
      formItems: [
        {value: 'flowCode', label: '工艺代码', span: 24, component: 'el-input', disabled: true},
        {value: 'processFromGroup', label: '当前工序组别', span: 12, component: 'el-input'},
        {value: 'processFrom', label: '当前工序', span: 12, component: 'el-input'},
        {value: 'processNextGroup', label: '下一工序组', span: 12, component: 'el-input'},
        {value: 'processNext', label: '下一工序', span: 12, component: 'el-input'},
        {value: 'standardTime', label: '标准用时', span: 12, component: 'ex-input-number'},
        {value: 'processMinTime', label: '当前工序用时', span: 12, component: 'ex-input-number'},
        {value: 'strict', label: '控制类型', span: 12, component: 'ex-select', options: [{value: 0, label: '宽松'}, {value: 1, label: '严格'}]},
        {value: 'idx', label: '排序', span: 12, component: 'ex-input-number'}
      ],
      // 表单内容
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
      // 表单校验细则
      rules: {
      }
    })
  }
}
