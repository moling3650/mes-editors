export default function getMenSonGroupForm (form = null, type = 'add', mouduleOptions) {
  return Promise.resolve({
    title: `${type === 'add' ? '新建' : '编辑'}子项表单`,
    formItems: [
      {
        value: 'menuName',
        label: '菜单名称',
        component: 'el-input'
      },
      {
        value: 'moduleCode',
        label: '绑定模块',
        component: 'ex-select',
        options: mouduleOptions,
        span: 12
      },
      {
        value: 'menuSonType',
        label: '子项类型',
        component: 'ex-select',
        options: [{value: 0, label: '分组'}, {value: 1, label: '子项'}],
        span: 12
      },
      {
        value: 'menuType',
        label: '权限管理',
        component: 'ex-select',
        options: [{value: 0, label: 'web页'}, {value: 1, label: '客户端'}],
        span: 12
      },
      {
        value: 'levelCode',
        label: '等级编号',
        component: 'el-input',
        span: 12
      },
      {
        value: 'icon',
        label: '图标地址',
        component: 'el-input',
        span: 12
      },
      {
        value: 'sortVal',
        label: '排序',
        component: 'el-input',
        span: 12
      }
    ],
    formData: Object.assign({
      menuName: '',
      menuSonType: '',
      menuType: '',
      moduleCode: '',
      levelCode: '',
      icon: '',
      sortVal: ''
    }, form),
    rules: {
      menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
    }
  })
}
