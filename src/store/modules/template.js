import template from '../../api/template'
import * as types from '../mutation-types'

// initial state
const state = {
  loading: false,
  data: null,
  error: false,
  currPage: ''
}

// getters
const getters = {
  data: state => state.data,
  loading: state => state.loading,
  error: state => state.error,
  currPage: state => state.currPage
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
  },
  switchPage ({ commit }, pageId) {
    commit(types.TEMPLATE_SWITCH_PAGE, pageId)
  }
}

// mutations
const mutations = {
  [types.TEMPLATE_LOADING] (state) {
    state.loading = true
  },
  [types.TEMPLATE_SUCCESS] (state, { template }) {
    state.loading = false
    state.data = template
    state.currPage = template.pages.length > 0 ? template.pages[0].id : ''
  },
  [types.TEMPLATE_ERROR] (state, { error }) {
    state.loading = false
    state.error = error
  },
  [types.TEMPLATE_SWITCH_PAGE] (state, pageId) {
    state.currPage = pageId
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
