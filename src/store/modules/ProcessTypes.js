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
  getAllProcessTypes ({ commit }) {
    Api.get('ProcessTypes').then(processTypes => {
      commit('setProcessTypes', processTypes)
    })
  }
}

// mutations
const mutations = {
  setProcessTypes (state, processTypes) {
    state.all = processTypes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
