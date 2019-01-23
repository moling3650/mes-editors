import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.lineId, label: item.lineName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.lineId] = item.lineName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllLines ({ commit }) {
    Api.get('Lines').then(lines => {
      commit('setLines', lines)
    })
  }
}

// mutations
const mutations = {
  setLines (state, lines) {
    state.all = lines
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
