import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.pointId, label: item.dataPointName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.pointId] = item.dataPointName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllMachineDataPoints ({ commit }) {
    Api.get('MachineDataPoints').then(machineDataPoints => {
      commit('setMachineDataPoints', machineDataPoints)
    })
  }
}

// mutations
const mutations = {
  setMachineDataPoints (state, machineDataPoints) {
    state.all = machineDataPoints
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
