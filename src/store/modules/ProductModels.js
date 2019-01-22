import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.modelCode, label: item.modelName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.modelCode] = item.modelName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllProductModels ({ commit }) {
    Api.get('ProductModels').then(productModels => {
      commit('setProductModels', productModels)
    })
  }
}

// mutations
const mutations = {
  setProductModels (state, productModels) {
    state.all = productModels
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
