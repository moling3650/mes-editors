import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.matCode, label: item.matName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.matCode] = item.matName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllMaterials ({ commit }) {
    Api.get('Materials').then(materials => {
      commit('setMaterials', materials)
    })
  }
}

// mutations
const mutations = {
  setMaterials (state, materials) {
    state.all = materials
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
