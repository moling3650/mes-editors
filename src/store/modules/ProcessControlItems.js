import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.id, label: item.controlName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.id] = item.controlName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllProcessControlItems ({ commit }) {
    Api.get('ProcessControlItems').then(processControlItems => {
      commit('setProcessControlItems', processControlItems)
    })
  }
}

// mutations
const mutations = {
  setProcessControlItems (state, processControlItems) {
    state.all = processControlItems
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
