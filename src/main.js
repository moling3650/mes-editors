import Vue from 'vue'
import ElementUI from 'element-ui'
import App from '@/App'
import router from '@/router'
import DialogForm from '@/components/DialogForm'
import ExSelect from '@/components/ExSelect'
import ExInputNumber from '@/components/ExInputNumber'
import ExSelectButtonGroup from '@/components/ExSelectButtonGroup'
import ExPropsCard from '@/components/ExPropsCard'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(DialogForm)
Vue.use(ExSelect)
Vue.use(ExInputNumber)
Vue.use(ExSelectButtonGroup)
Vue.use(ExPropsCard)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
