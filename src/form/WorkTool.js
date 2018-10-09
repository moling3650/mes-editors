import apis from '@/apis'

function checkWorkToolCode (rule, value, callback) {
  if (!value) {
    return callback(new Error('工装编号不能为空'))
  }
  apis.validataWorkToolCode(value).then(valid => {
    if (valid) {
      callback()
    } else {
      callback(new Error('工装编号已存在'))
    }
  })
}

export default function getWorkToolForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}工装表单`,
    formItems: [
      {
        value: 'workTool_code',
        label: '工装编号',
        component: 'el-input',
        span: 12
      },
      {
        value: 'workTool_name',
        label: '工装名称',
        component: 'el-input',
        span: 12
      },
      {
        value: 'supplier',
        label: '供应商',
        component: 'el-input',
        span: 12
      },
      {
        value: 'state',
        label: '状态',
        component: 'ex-select',
        options: [{value: -1, label: '报废'}, {value: 0, label: '禁用'}, {value: 1, label: '启用'}, {value: 2, label: '已使用'}, {value: 3, label: '保养'}, {value: 4, label: '维修'}],
        span: 12
      },
      {
        value: 'storage_room',
        label: '库房',
        component: 'el-input',
        span: 12
      },
      {
        value: 'store_place',
        label: '存放位置',
        component: 'el-input',
        span: 12
      },
      {
        value: 'use_place',
        label: '使用位置',
        component: 'el-input',
        span: 12
      },
      {
        value: 'description',
        label: '说明',
        component: 'el-input',
        span: 12
      }
    ],
    formData: Object.assign({
      workTool_code: '',
      workTool_name: '',
      state: 0,
      supplier: '',
      model_code: '',
      storage_room: '',
      store_place: '',
      use_place: '',
      description: ''
    }, form),
    rules: {
      workTool_code: type === 'edit' ? [{ required: true, trigger: 'blur' }] : [{ required: true, validator: checkWorkToolCode, trigger: 'blur' }]
    }
  })
}
