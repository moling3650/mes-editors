import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import WorkShops from './modules/ProcessFlow/WorkShops'
import WorkGroups from './modules/ProcessFlow/WorkGroups'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters: {
    opts (state, getters) {
      return {
        wsid: getters['WorkShops/options'],
        groupCode: getters['WorkGroups/options']
      }
    },
    dictMap (state, getters) {
      return {
        wsid: getters['WorkShops/dict'],
        groupCode: getters['WorkGroups/dict']
      }
    }
  },
  modules: {
    products,
    WorkShops,
    WorkGroups
  },
  strict: debug
})
