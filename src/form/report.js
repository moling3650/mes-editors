import apis from '@/apis'

function checkReportCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('报表编号不能为空'))
  }
  apis.validateReportCode(value).then(valid => {
    if (valid.has_report) {
      return callback(new Error('该报表已存在'))
    } else if (!valid.has_object && !value.startsWith('Z_')) {
      return callback(new Error('数据库没有该表或视图'))
    }
    return callback()
  })
}

export default function getReportForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}报表表单`,
    formItems: [
      {
        value: 'report_code',
        label: '报表编号',
        component: 'el-input',
        disabled: type === 'edit'
      },
      {
        value: 'report_name',
        label: '报表名称',
        component: 'el-input'
      },
      {
        value: 'query_type',
        label: '条件必填',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0
      },
      {
        value: 'query_sql',
        label: '查询语句',
        component: 'el-input',
        activeValue: 1,
        inactiveValue: 0
      }
    ],
    formData: Object.assign({
      report_code: '',
      report_name: '',
      query_type: 1,
      query_sql: ''
    }, form),
    rules: {
      report_code: type === 'edit' ? [{ required: true }] : [{ required: true, validator: checkReportCode, trigger: 'blur' }],
      report_name: [{ required: true, message: '请输入报表名称', trigger: 'blur' }]
    }
  })
}
