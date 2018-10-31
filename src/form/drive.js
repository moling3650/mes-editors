export default function getDriveForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}驱动表单`,
    formItems: [
      {
        value: 'driveCode',
        label: '驱动编号',
        component: 'el-input',
        disabled: type !== 'add',
        span: 11
      },
      {
        value: 'driveName',
        label: '驱动名称',
        component: 'el-input',
        span: 11
      },
      {
        value: 'fileName',
        label: '文件名称',
        component: 'el-input',
        span: 11
      },
      {
        value: 'description',
        label: '描述',
        component: 'el-input',
        span: 22
      },
      {
        value: 'isPublic',
        label: '是否公用',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0
      },
      {
        value: 'enable',
        label: '状态',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0
      },
      {
        value: 'property',
        label: '属性',
        component: 'el-switch',
        activeValue: 1,
        inactiveValue: 0
      }
    ],
    formData: Object.assign({
      driveCode: '',
      driveName: '',
      fileName: '',
      typeId: 0,
      description: '',
      isPublic: 0,
      enable: 0,
      property: 0
    }, form),
    rules: {
      driveCode: [{ required: true, message: '请输入驱动类型编号', trigger: 'blur' }],
      driveName: [{ required: true, message: '请输入驱动类型名称', trigger: 'blur' }]
    }
  })
}
