export default function getRepairLoginForm (form = null) {
  return Promise.resolve({
    title: `维修登录`,
    width: '350px',
    formItems: [
      {
        value: 'empCode',
        label: '用户编号',
        component: 'el-input',
        span: 22
      },
      {
        value: 'password',
        label: '密  码',
        type: 'password',
        component: 'el-input',
        span: 22
      }
    ],
    formData: Object.assign({
      empCode: '',
      password: ''
    }, form),
    rules: {
      empCode: [{ required: true, message: '用户编号不能为空', trigger: 'blur' }],
      password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
    }
  })
}
