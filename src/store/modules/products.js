import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(p => ({ value: p.productCode, label: p.productName, unit: p.unit })),
  getProductByCode: state => code => state.all.find(p => p.productCode === code),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.productCode] = item.productName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    Api.get('Products').then(products => {
      commit('setProducts', products)
    })
  }
}

// mutations
const mutations = {
  setProducts (state, products) {
    state.all = products
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
