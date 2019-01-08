export default function getMenuGroupForm (form = null, type = 'add') {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}分组表单`,
    formItems: [
      {
        value: 'menuName',
        label: '菜单名称',
        component: 'el-input'
      },
      {
        value: 'menuType',
        label: '权限管理',
        component: 'ex-select',
        options: [{value: 0, label: 'web页'}, {value: 1, label: '客户端'}],
        span: 12
      }
    ],
    formData: Object.assign({
      menuName: '',
      menuType: ''
    }, form),
    rules: {
      menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
    }
  })
}
