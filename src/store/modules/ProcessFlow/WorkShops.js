import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.wsid, label: item.wsName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.wsid] = item.wsName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllWorkShops ({ commit }) {
    Api.get('WorkShops').then(workShops => {
      commit('setWorkShops', workShops)
    })
  }
}

// mutations
const mutations = {
  setWorkShops (state, workShops) {
    state.all = workShops
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
