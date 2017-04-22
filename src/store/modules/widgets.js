import widgetApi from '../../api/widgetApi'
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
  data: state => state.data,
  error: state => state.error
}

// actions
const actions = {
  getAll ({commit}, tplId) {
    commit(types.WIDGET_LIST_LOADING)
    widgetApi.getAll(
      tplId,
      (widgets) => commit(types.WIDGET_LIST_SUCCESS, {widgets}),
      (error) => commit(types.WIDGET_LIST_ERROR, {error})
    )
  },
  add ({commit}, {tplId, widget}) {
    commit(types.WIDGET_ADD_LOADING)
    widgetApi.add(
      tplId,
      widget,
      (widget) => commit(types.WIDGET_ADD_SUCCESS, {widget}),
      (error) => commit(types.WIDGET_ADD_ERROR, {error})
    )
  },
  update ({commit}, {tplId, widget}) {
    commit(types.WIDGET_UPDATE_LOADING)
    widgetApi.update(
      tplId,
      widget,
      (widget) => commit(types.WIDGET_UPDATE_SUCCESS, {widget}),
      (error) => commit(types.WIDGET_UPDATE_ERROR, {error})
    )
  }
}

// mutations
const mutations = {
  [types.WIDGET_LIST_LOADING] (state) {
    state.loading = true
    state.data = []
    state.error = false
  },
  [types.WIDGET_LIST_SUCCESS] (state, {widgets}) {
    state.loading = false
    state.data = widgets
    state.error = false
  },
  [types.WIDGET_LIST_ERROR] (state, {error}) {
    state.loading = false
    state.data = []
    state.error = error
  },

  [types.WIDGET_ADD_LOADING] (state) {
  },
  [types.WIDGET_ADD_SUCCESS] (state, {widget}) {
    state.data.push(widget)
  },
  [types.WIDGET_ADD_ERROR] (state) {
  },

  [types.WIDGET_UPDATE_LOADING] (state) {
  },
  [types.WIDGET_UPDATE_SUCCESS] (state, {widget}) {
    state.data.forEach((e, i) => {
      if (e.id === widget.id) {
        state.data[i] = {
          ...state.data[i],
          ...widget
        }
      }
    })
  },
  [types.WIDGET_UPDATE_ERROR] (state) {
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
