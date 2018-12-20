import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.groupCode, label: item.groupName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.groupCode] = item.groupName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllWorkGroups ({ commit }) {
    Api.get('WorkGroups').then(workGroups => {
      commit('setWorkGroups', workGroups)
    })
  }
}

// mutations
const mutations = {
  setWorkGroups (state, workGroups) {
    state.all = workGroups
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
