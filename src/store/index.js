import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import WorkShops from './modules/ProcessFlow/WorkShops'
import WorkGroups from './modules/ProcessFlow/WorkGroups'
import Drives from './modules/Drives'
import DriveTypes from './modules/DriveTypes'
import Materials from './modules/Materials'
import Departments from './modules/Departments'
import NgTypes from './modules/NgTypes'
import ProductModels from './modules/ProductModels'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters: {
    opts (state, getters) {
      return {
        wsid: getters['WorkShops/options'],
        groupCode: getters['WorkGroups/options'],
        driveCode: getters['Drives/options'],
        typeId: getters['DriveTypes/options'],
        matCode: getters['Materials/options'],
        departCode: getters['Departments/options'],
        typeCode: getters['NgTypes/options'],
        modelCode: getters['ProductModels/options']
      }
    },
    dictMap (state, getters) {
      return {
        wsid: getters['WorkShops/dict'],
        groupCode: getters['WorkGroups/dict'],
        driveCode: getters['Drives/dict'],
        typeId: getters['DriveTypes/dict'],
        matCode: getters['Materials/dict'],
        departCode: getters['Departments/dict'],
        typeCode: getters['NgTypes/dict'],
        modelCode: getters['ProductModels/dict']
      }
    }
  },
  modules: {
    products,
    WorkShops,
    WorkGroups,
    Drives,
    DriveTypes,
    Materials,
    Departments,
    NgTypes,
    ProductModels
  },
  strict: debug
})
