import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.typeCode, label: item.typeName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.typeCode] = item.typeName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllNgTypes ({ commit }) {
    Api.get('NgTypes').then(ngTypes => {
      commit('setNgTypes', ngTypes)
    })
  }
}

// mutations
const mutations = {
  setNgTypes (state, ngTypes) {
    state.all = ngTypes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
