import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.typeId, label: item.typeName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.typeId] = item.typeName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllDriveTypes ({ commit }) {
    Api.get('DriveTypes').then(driveTypes => {
      commit('setDriveTypes', driveTypes)
    })
  }
}

// mutations
const mutations = {
  setDriveTypes (state, driveTypes) {
    state.all = driveTypes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
