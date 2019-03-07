import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.ngCode, label: item.ngName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.ngCode] = item.ngName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllNgCodes ({ commit }) {
    Api.get('NgCodes').then(ngCodes => {
      commit('setNgCodes', ngCodes)
    })
  }
}

// mutations
const mutations = {
  setNgCodes (state, ngCodes) {
    state.all = ngCodes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
