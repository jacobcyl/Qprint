import template from '../../api/template'
import * as types from '../mutation-types'

// initial state
const state = {
  loading: false,
  data: null,
  error: false
}

// getters
const getters = {
  data: state => state.data,
  loading: state => state.loading,
  error: state => state.error
}

// actions
const actions = {
  getTemplate ({ commit }, id) {
    commit(types.TEMPLATE_LOADING)
    template.get(
      id,
      (template) => commit(types.TEMPLATE_SUCCESS, { template }),
      (error) => commit(types.TEMPLATE_ERROR, { error })
    )
  }
}

// mutations
const mutations = {
  [types.TEMPLATE_LOADING] (state) {
    state.loading = true
  },
  [types.TEMPLATE_SUCCESS] (state, { template }) {
    state.loading = false
    state.error = false
    state.data = template
  },
  [types.TEMPLATE_ERROR] (state, { error }) {
    state.loading = false
    state.data = null
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
