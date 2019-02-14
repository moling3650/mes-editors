import Api from '@/utils/Api'

// 表单自定义校验方法
function machineCodeValidate (rule, machineCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!machineCode) {
    return callback(new Error('设备编号不能为空'))
  }
  Api.get('Machines/Validate', { machineCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('设备编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'Machines',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'machineCode', title: '设备编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'machineName', title: '设备名称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'simpleName', title: '设备简称', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'typeId', title: '设备类型', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'MachineTypes/typeId'},
    {field: 'state', title: '设备状态', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'useState', title: '审核状态', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'processingQty', title: '加工数量', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'manufacturer', title: '生产商', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'arrivaldate', title: '到货日期', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'expectNexttime', title: '预保养日期', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'department', title: '部门', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'Departments/departCode'},
    {field: 'wsCode', title: '车间', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, formatter: 'WorkShops/wsid'},
    {field: 'stationCode', title: '绑定工位', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'img', title: '设备图片', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true},
    {field: 'description', title: '说明', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `设备信息`,
      // 表单元素
      formItems: [
        {value: 'machineCode', label: '设备编号', span: 12, component: 'el-input'},
        {value: 'machineName', label: '设备名称', span: 12, component: 'el-input'},
        {value: 'typeId', label: '设备类型', span: 12, component: 'ex-select', options: opts['MachineTypes/typeId']},
        {value: 'simpleName', label: '设备简称', span: 12, component: 'el-input'},
        {value: 'state', label: '设备状态', span: 12, component: 'ex-select', options: [{value: 0, label: '禁用'}, {value: 1, label: '启用'}]},
        {value: 'useState', label: '审核状态', span: 12, component: 'ex-select', options: [{value: 0, label: '未审核'}, {value: 1, label: '已审核'}]},
        {value: 'manufacturer', label: '设备生产商', span: 12, component: 'el-input'},
        {value: 'arrivaldate', label: '到货日期', span: 12, component: 'el-date-picker'},
        {value: 'expectNexttime', label: '预计保养日期', span: 12, component: 'el-date-picker'},
        {value: 'department', label: '部门', span: 12, component: 'ex-select', options: opts['Departments/departCode']},
        {value: 'wsCode', label: '车间', span: 12, component: 'ex-select', options: opts['WorkShops/wsid']},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        machineCode: '',
        modelCode: '',
        machineName: '',
        simpleName: '',
        typeId: 0,
        state: 0,
        useState: 0,
        processingQty: 0,
        manufacturer: '',
        arrivaldate: '',
        expectNexttime: '',
        department: '',
        wsCode: '',
        description: '',
        img: '',
        stationCode: ''
      }, form),
      // 表单校验细则
      rules: {
        machineCode: [{ required: true, type, validator: machineCodeValidate, trigger: 'blur' }],
        machineName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }]
      }
    })
  }
}
