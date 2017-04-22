import pageApi from '../../api/pageApi'
import * as types from '../mutation-types'

// initial state
const state = {
  loading: false,
  data: [],
  error: false,
  tplid: null,
  addPage: {
    loading: false,
    data: null,
    error: false
  },
  currPage: '' // 默认当前页为空字符串，若遇到空字符串表明当前未选中任何页面
}

// getters
const getters = {
  data: state => state.data,
  loading: state => state.loading,
  error: state => state.error,
  addPageLoading: state => state.addPage.loading,
  addPageData: state => state.addPage.data,
  addPageError: state => state.addPage.error,
  currPage: state => state.currPage
}

// actions
const actions = {
  addPage ({ commit }, {tplId, page}) {
    commit(types.PAGE_ADD_LOADING)
    pageApi.addPage(
      tplId,
      page,
      (page) => commit(types.PAGE_ADD_SUCCESS, { page }),
      (error) => commit(types.PAGE_ADD_ERROR, { error })
    )
  },
  getPages ({ commit }, tplid) {
    commit(types.PAGE_LOADING)
    pageApi.getPages(
      tplid,
      (pages) => commit(types.PAGE_SUCCESS, { pages }),
      (error) => commit(types.PAGE_ERROR, { error })
    )
  },
  switchPage ({ commit }, pageId) {
    commit(types.PAGE_SWITCH, pageId)
  }
}

// mutations
const mutations = {
  [types.PAGE_LOADING] (state) {
    state.loading = true
    state.error = false
  },
  [types.PAGE_SUCCESS] (state, { pages }) {
    state.loading = false
    state.data = pages
    state.error = false
    if (pages.length > 0) {
      state.currPage = pages[0].id
    }
  },
  [types.PAGE_ERROR] (state, { error }) {
    state.loading = false
    state.error = error
  },
  // add page
  [types.PAGE_ADD_LOADING] (state) {
    state.addPage.loading = true
    state.addPage.data = null
    state.addPage.error = false
  },
  [types.PAGE_ADD_SUCCESS] (state, { page }) {
    state.addPage.loading = false
    state.addPage.data = page
    state.data.push(page)
    state.currPage = page.id
    state.addPage.error = false
  },
  [types.PAGE_ADD_ERROR] (state, { error }) {
    state.addPage.loading = false
    state.addPage.data = null
    state.addPage.error = error
  },

  // switch page
  [types.PAGE_SWITCH] (state, pageId) {
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
