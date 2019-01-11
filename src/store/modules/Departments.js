import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.departCode, label: item.departName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.departCode] = item.departName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllDepartments ({ commit }) {
    Api.get('Departments').then(departments => {
      commit('setDepartments', departments)
    })
  }
}

// mutations
const mutations = {
  setDepartments (state, departments) {
    state.all = departments
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
