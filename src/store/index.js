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
import ProcessTypes from './modules/ProcessTypes'
import Lines from './modules/Lines'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters: {
    opts (state, getters) {
      return {
        'WorkShops/wsid': getters['WorkShops/options'],
        'WorkGroups/groupCode': getters['WorkGroups/options'],
        'Drives/driveCode': getters['Drives/options'],
        'DriveTypes/typeId': getters['DriveTypes/options'],
        'Materials/matCode': getters['Materials/options'],
        'Departments/departCode': getters['Departments/options'],
        'NgTypes/typeCode': getters['NgTypes/options'],
        'ProductModels/modelCode': getters['ProductModels/options'],
        'ProcessTypes/typeId': getters['ProcessTypes/options'],
        'products/productCode': getters['products/options'],
        'Lines/lineId': getters['Lines/options']
      }
    },
    dictMap (state, getters) {
      return {
        'WorkShops/wsid': getters['WorkShops/dict'],
        'WorkGroups/groupCode': getters['WorkGroups/dict'],
        'Drives/driveCode': getters['Drives/dict'],
        'DriveTypes/typeId': getters['DriveTypes/dict'],
        'Materials/matCode': getters['Materials/dict'],
        'Departments/departCode': getters['Departments/dict'],
        'NgTypes/typeCode': getters['NgTypes/dict'],
        'ProductModels/modelCode': getters['ProductModels/dict'],
        'ProcessTypes/typeId': getters['ProcessTypes/dict'],
        'products/productCode': getters['products/dict'],
        'Lines/lineId': getters['Lines/dict']
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
    ProductModels,
    ProcessTypes,
    Lines
  },
  strict: debug
})
