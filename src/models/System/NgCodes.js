export default {
  // 模型名称
  name: 'NgCodes',
  // 主键
  pk: 'ngId',
  // 表格列配置
  cols: [
    {width: 60, titleAlign: 'center', columnAlign: 'center', type: 'selection'},
    {field: 'ngCode', title: '现象代码', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'ngName', title: '现象描述', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'typeCode', title: '类型代码', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'execProc', title: '是否处理', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'qty', title: '数量', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ]
}
