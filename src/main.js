import Vue from 'vue'
import ElementUI from 'element-ui'
import App from '@/App'
import router from '@/router'
import DialogForm from '@/components/DialogForm'
import ExSelect from '@/components/ExSelect'
import ExInputNumber from '@/components/ExInputNumber'
import ExSelectButtonGroup from '@/components/ExSelectButtonGroup'
import ExPropsCard from '@/components/ExPropsCard'
import ExTreeCard from '@/components/ExTreeCard'
import ExItemCard from '@/components/ExItemCard'
import ExTableOperation from '@/components/ExTableOperation'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-tree-halower/dist/halower-tree.min.css'
import VTree from 'vue-tree-halower'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

library.add(fas, far, fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.component('VTree', VTree)
Vue.use(ElementUI)
Vue.use(DialogForm)
Vue.use(ExSelect)
Vue.use(ExInputNumber)
Vue.use(ExSelectButtonGroup)
Vue.use(ExPropsCard)
Vue.use(ExTreeCard)
Vue.use(ExItemCard)
Vue.use(ExTableOperation)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
