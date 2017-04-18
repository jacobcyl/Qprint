import template from '../../api/template'
import * as types from '../mutation-types'

// initial state
const state = {
  loading: false,
  data: [],
  error: false,
  tplid: null
}

// getters
const getters = {
  data: state => state.data,
  loading: state => state.loading,
  error: state => state.error
}

// actions
const actions = {
  getPages ({ commit }, {tplid}) {
    commit(types.PAGE_LOADING)
    template.getPages(
      tplid,
      (pages) => commit(types.PAGE_SUCCESS, { pages }),
      (error) => commit(types.PAGE_ERROR, { error })
    )
  },
  addComponent ({commit}, {pageid, component}) {
    commit(types.PAGE_ADD_COMPONENT, {
      pageid,
      component
    })
  },
  updateComponent ({commit}, {pageid, component}) {
    commit(types.PAGE_UPDATE_COMPONENT, {
      pageid,
      component
    })
  }
}

// mutations
const mutations = {
  [types.PAGE_LOADING] (state) {
    state.loading = true
  },
  [types.PAGE_SUCCESS] (state, { pages }) {
    state.loading = false
    state.data = pages
  },
  [types.PAGE_ERROR] (state, { error }) {
    state.loading = false
    state.error = error
  },
  [types.PAGE_ADD_COMPONENT] (state, { pageid, component }) {
    let index = -1
    state.data.forEach((e, i) => {
      if (e.id === pageid) index = i
    })
    index > -1 ? state.data[index].components.unshift(component) : ''
  },
  [types.PAGE_UPDATE_COMPONENT] (state, { pageid, component }) {
    state.data.forEach((e, i) => {
      if (e.id === pageid) {
        state.data[i].components.forEach((se, si) => {
          if (se.id === component.id) {
            state.data[i].components[si] = {
              ...state.data[i].components[si],
              ...component
            }
          }
        })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
