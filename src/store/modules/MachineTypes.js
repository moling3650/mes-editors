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
  getAllMachineTypes ({ commit }) {
    Api.get('MachineTypes').then(machineTypes => {
      commit('setMachineTypes', machineTypes)
    })
  }
}

// mutations
const mutations = {
  setMachineTypes (state, machineTypes) {
    state.all = machineTypes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
