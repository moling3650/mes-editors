export default {
  // 模型名称
  name: 'FailLogs',
  // 主键
  pk: 'fid',
  // 表格列配置
  cols: [
    {width: 60, titleAlign: 'center', columnAlign: 'center', type: 'selection'},
    {field: 'sfc', title: '批次号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'orderNo', title: '工单编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'fromProcess', title: '来源工序', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'fromStation', title: '来源工位', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'qty', title: '数量', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ]
}
