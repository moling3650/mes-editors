import Vue from 'vue'
import ElementUI from 'element-ui'
import VTree from 'vue-tree-halower'
import App from '@/App'
import router from '@/router'
import DialogForm from '@/components/DialogForm'
import ExSelect from '@/components/ExSelect'
import ExInputNumber from '@/components/ExInputNumber'
import ExSelectButtonGroup from '@/components/ExSelectButtonGroup'
import ExPropsCard from '@/components/ExPropsCard'
import ExTreeCard from '@/components/ExTreeCard'
import ExItemCard from '@/components/ExItemCard'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-tree-halower/dist/halower-tree.min.css' // 你可以自定义树的样式

Vue.use(ElementUI)
Vue.use(VTree)
Vue.use(DialogForm)
Vue.use(ExSelect)
Vue.use(ExInputNumber)
Vue.use(ExSelectButtonGroup)
Vue.use(ExPropsCard)
Vue.use(ExTreeCard)
Vue.use(ExItemCard)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
