export default {
  // 模型名称
  name: 'PFailDetail',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {width: 60, titleAlign: 'center', columnAlign: 'center', type: 'selection'},
    {field: 'ngCode', title: '现象代码', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'ngCode', title: '现象名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'NgCodes/ngCode'},
    {field: 'qty', title: '数量', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'reasonCode', title: '原因', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'NgReasons/reasonCode'},
    {field: 'reasontypeCode', title: '原因类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'NgReasonTypes/reasontypeCode'}
  ]
}
