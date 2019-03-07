import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.reasontypeCode, label: item.reasontypeName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.reasontypeCode] = item.reasontypeName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllNgReasonTypes ({ commit }) {
    Api.get('BNgReasonType').then(reasontypeCodes => {
      commit('setNgReasonTypes', reasontypeCodes)
    })
  }
}

// mutations
const mutations = {
  setNgReasonTypes (state, reasontypeCodes) {
    state.all = reasontypeCodes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
