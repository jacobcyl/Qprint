import * as types from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allTemplates: state => state.all
}

// actions
const actions = {
  getAllTemplates ({ commit }) {
    template.getAll(templates => {
      commit(types.GET_TEMPLATES, { templates })
    })
  }
}

// mutations
const mutations = {
  [types.GET_TEMPLATES] (state, { templates }) {
    state.all = templates
  },

  [types.ADD_TO_CART] (state, { id }) {
    state.all.find(p => p.id === id).inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
