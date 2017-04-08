import template from '../../api/template'
import * as types from '../mutation-types'

// initial state
const state = {
  loading: false,
  data: [],
  error: false
}

// getters
const getters = {
  loading: state => state.loading,
  templates: state => state.data,
  error: state => state.error
}

// actions
const actions = {
  getAllTemplates ({ commit }) {
    commit(types.TEMPLATE_LIST_LOADING)
    template.getAll(
      (templates) => commit(types.TEMPLATE_LIST_SUCCESS, { templates }),
      (error) => commit(types.TEMPLATE_LIST_ERROR, { error })
    )
  }
}

// mutations
const mutations = {
  [types.TEMPLATE_LIST_LOADING] (state) {
    state.loading = true
  },
  [types.TEMPLATE_LIST_SUCCESS] (state, { templates }) {
    state.loading = false
    state.data = templates
  },
  [types.TEMPLATE_LIST_ERROR] (state, { error }) {
    state.loading = false
    state.error = error
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
