import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.reasonCode, label: item.reasonName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.reasonCode] = item.reasonName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllNgReasons ({ commit }) {
    Api.get('NgReasons').then(reasonCodes => {
      commit('setNgReasons', reasonCodes)
    })
  }
}

// mutations
const mutations = {
  setNgReasons (state, reasonCodes) {
    state.all = reasonCodes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
