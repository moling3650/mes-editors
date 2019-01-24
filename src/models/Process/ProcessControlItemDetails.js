export default {
  // 模型名称
  name: 'ProcessControlItemDetails',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'controlId', title: '管控项名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'ProcessControlItems/id'},
    {field: 'ucl', title: '所属工序', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'lcl', title: '建立时间', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'groupCount', title: '备注信息', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `管控细则表单`,
      // 表单元素
      formItems: [
        {value: 'controlId', label: '管控项', span: 12, component: 'ex-select', options: opts['ProcessControlItems/id']},
        {value: 'ucl', label: '上限值', span: 12, component: 'el-input'},
        {value: 'lcl', label: '下限值', span: 24, component: 'el-input'},
        {value: 'groupCount', label: '组距', span: 24, component: 'ex-input-number'}
      ],
      // 表单内容
      formData: Object.assign({
        controlId: '',
        ucl: 0,
        lcl: 0,
        groupCount: 0
      }, form),
      // 表单校验细则
      rules: {
      }
    })
  }
}
