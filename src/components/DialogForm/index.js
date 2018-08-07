import DialogForm from './DialogForm'
import showForm from './showForm'

export default Vue => {
  Vue.component(DialogForm.name, DialogForm)
  Vue.prototype.$showForm = showForm
}
