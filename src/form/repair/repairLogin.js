export default function getRepairLoginForm (form = null) {
  return Promise.resolve({
    title: `维修登录`,
    width: '350px',
    formItems: [
      {
        value: 'user_code',
        label: '用户编号',
        component: 'el-input',
        span: 22
      },
      {
        value: 'user_pwd',
        label: '密  码',
        type: 'password',
        component: 'el-input',
        span: 22
      }
    ],
    formData: Object.assign({
      user_code: '',
      user_pwd: ''
    }, form),
    rules: {
      user_code: [{ required: true, message: '用户编号不能为空', trigger: 'blur' }],
      user_pwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
    }
  })
}
