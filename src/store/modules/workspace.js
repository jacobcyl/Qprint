import templateApi from '../../api/template'
import * as types from '../mutation-types'

// initial state
const state = {
  loading: false,
  data: [],
  error: false,
  adding: false,
  addingError: false
}

// getters
const getters = {
  loading: state => state.loading,
  templates: state => state.data,
  error: state => state.error,
  adding: state => state.adding,
  addingError: state => state.addingError
}

// actions
const actions = {
  getAllTemplates ({ commit }) {
    commit(types.TEMPLATE_LIST_LOADING)
    templateApi.getAll(
      (templates) => commit(types.TEMPLATE_LIST_SUCCESS, { templates }),
      (error) => commit(types.TEMPLATE_LIST_ERROR, { error })
    )
  },
  addTemplate ({commit}, tpl) {
    commit(types.TEMPLATE_ADD_LOADING)
    templateApi.addTemplate(
      tpl,
      (template) => commit(types.TEMPLATE_ADD_SUCCESS, { template }),
      (error) => commit(types.TEMPLATE_ADD_ERROR, { error })
    )
  }
}

// mutations
const mutations = {
  [types.TEMPLATE_LIST_LOADING] (state) {
    state.loading = true
    state.error = false
  },
  [types.TEMPLATE_LIST_SUCCESS] (state, { templates }) {
    state.loading = false
    state.data = templates
  },
  [types.TEMPLATE_LIST_ERROR] (state, { error }) {
    state.loading = false
    state.error = error
  },
  [types.TEMPLATE_ADD_LOADING] (state) {
    state.adding = true
    state.addingError = false
  },
  [types.TEMPLATE_ADD_SUCCESS] (state, { template }) {
    state.data.unshift(template)
    state.adding = false
  },
  [types.TEMPLATE_ADD_ERROR] (state, { error }) {
    state.addingError = error
    state.adding = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
