import template from '../../api/template'
import * as types from '../mutation-types'

// initial state
const state = {
  loading: false,
  data: null,
  error: false,
  canvasWidth: 200
}

// getters
const getters = {
  data: state => state.data,
  loading: state => state.loading,
  error: state => state.error,
  canvasWidth: state => state.canvasWidth
}

// actions
const actions = {
  getTemplate ({ commit }, id) {
    commit(types.TEMPLATE_LOADING)
    template.get(
      id,
      (templates) => commit(types.TEMPLATE_SUCCESS, { templates }),
      (error) => commit(types.TEMPLATE_ERROR, { error })
    )
  }
}

// mutations
const mutations = {
  [types.TEMPLATE_LOADING] (state) {
    state.loading = true
  },
  [types.TEMPLATE_SUCCESS] (state, { templates }) {
    state.loading = false
    state.data = templates
  },
  [types.TEMPLATE_ERROR] (state, { error }) {
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
