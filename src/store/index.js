import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import WorkShops from './modules/ProcessFlow/WorkShops'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters: {
    opts (state, getters) {
      return {
        wsid: getters['WorkShops/options']
      }
    },
    dictMap (state, getters) {
      return {
        wsid: getters['WorkShops/dict']
      }
    }
  },
  modules: {
    products,
    WorkShops
  },
  strict: debug
})
