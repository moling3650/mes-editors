import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.typeId, label: item.typeName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.typeId] = item.typeName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllPointTypes ({ commit }) {
    Api.get('PointTypes').then(pointTypes => {
      commit('setPointTypes', pointTypes)
    })
  }
}

// mutations
const mutations = {
  setPointTypes (state, pointTypes) {
    state.all = pointTypes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
