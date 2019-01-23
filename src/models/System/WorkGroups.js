import Api from '@/utils/Api'

// 表单自定义校验方法
function groupCodeValidate (rule, groupCode, callback) {
  if (rule.type === 'edit') {
    return callback()
  }
  if (!groupCode) {
    return callback(new Error('工序组编号不能为空'))
  }
  Api.get('WorkGroups/Validate', { groupCode }).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('工序组编号已存在'))
    }
  })
}

export default {
  // 模型名称
  name: 'WorkGroups',
  // 主键
  pk: 'id',
  // 表格列配置
  cols: [
    {field: 'groupCode', title: '工序组编号', width: 150, titleAlign: 'left', columnAlign: 'left', isResize: true, isEdit: true},
    {field: 'groupName', title: '工序组名称', width: 150, titleAlign: 'left', columnAlign: 'left'},
    {field: 'wsid', title: '车间名称', width: 150, titleAlign: 'left', columnAlign: 'left', formatter: ['WorkShops/wsid']},
    {field: 'timeIncrement', title: '位移时间（小时）', width: 150, titleAlign: 'left', columnAlign: 'left'},
    {field: 'description', title: '说明', width: 450, titleAlign: 'left', columnAlign: 'left', isResize: true}
  ],
  // 表单配置
  getForm (form = null, type = 'add', opts) {
    return Promise.resolve({
      // 表单标题
      title: `工序组维护`,
      // 表单元素
      formItems: [
        {value: 'groupCode', label: '工序组编号', span: 12, component: 'el-input', disabled: type === 'edit'},
        {value: 'groupName', label: '工序组名称', span: 12, component: 'el-input'},
        {value: 'wsid', label: '车间名称', span: 12, component: 'ex-select', options: opts['WorkShops/wsid']},
        {value: 'idx', label: '排序', span: 12, component: 'ex-input-number'},
        {value: 'timeIncrement', label: '位移时间', span: 12, component: 'ex-input-number'},
        {value: 'description', label: '说明', component: 'el-input'}
      ],
      // 表单内容
      formData: Object.assign({
        groupCode: '',
        groupName: '',
        wsid: 0,
        description: '',
        idx: 0,
        timeIncrement: 0
      }, form),
      // 表单校验细则
      rules: {
        groupCode: [{ required: true, type, validator: groupCodeValidate, trigger: 'blur' }],
        groupName: [{ required: true, message: '请输入工序组名称', trigger: 'blur' }]
      }
    })
  }
}
