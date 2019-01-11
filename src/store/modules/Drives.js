import Api from '@/utils/Api'

const state = {
  all: []
}

// getters
const getters = {
  options: state => state.all.map(item => ({ value: item.driveCode, label: item.driveName })),
  dict: state => {
    const _dict = {}
    state.all.forEach(item => {
      _dict[item.driveCode] = item.driveName
    })
    return _dict
  }
}

// actions
const actions = {
  getAllDrives ({ commit }) {
    Api.get('Drives').then(drives => {
      commit('setDrives', drives)
    })
  }
}

// mutations
const mutations = {
  setDrives (state, drives) {
    state.all = drives
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
