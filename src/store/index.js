import Vue from 'vue'
import Vuex from 'vuex'
import Products from './modules/Products'
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
import ProcessControlItems from './modules/ProcessControlItems'
import MachineTypes from './modules/MachineTypes'
import PointTypes from './modules/PointTypes'
import MachineDataPoints from './modules/MachineDataPoints'
import NgCodes from './modules/NgCodes'
import NgReasons from './modules/NgReasons'
import NgReasonTypes from './modules/NgReasonTypes'

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
        'Products/productCode': getters['Products/options'],
        'Lines/lineId': getters['Lines/options'],
        'ProcessControlItems/id': getters['ProcessControlItems/options'],
        'MachineTypes/typeId': getters['MachineTypes/options'],
        'PointTypes/typeId': getters['PointTypes/options'],
        'MachineDataPoints/pointId': getters['MachineDataPoints/options'],
        'NgCodes/ngCode': getters['NgCodes/options'],
        'NgReasons/reasonCode': getters['NgReasons/options'],
        'NgReasonTypes/reasontypeCode': getters['NgReasonTypes/options']
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
        'Products/productCode': getters['Products/dict'],
        'Lines/lineId': getters['Lines/dict'],
        'ProcessControlItems/id': getters['ProcessControlItems/dict'],
        'MachineTypes/typeId': getters['MachineTypes/dict'],
        'PointTypes/typeId': getters['PointTypes/dict'],
        'MachineDataPoints/pointId': getters['MachineDataPoints/dict'],
        'NgCodes/ngCode': getters['NgCodes/dict'],
        'NgReasons/reasonCode': getters['NgReasons/dict'],
        'NgReasonTypes/reasontypeCode': getters['NgReasonTypes/dict']
      }
    }
  },
  modules: {
    Products,
    WorkShops,
    WorkGroups,
    Drives,
    DriveTypes,
    Materials,
    Departments,
    NgTypes,
    ProductModels,
    ProcessTypes,
    Lines,
    ProcessControlItems,
    MachineTypes,
    PointTypes,
    MachineDataPoints,
    NgCodes,
    NgReasons,
    NgReasonTypes
  },
  strict: debug
})
