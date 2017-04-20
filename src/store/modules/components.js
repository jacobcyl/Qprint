import componentApi from '../../api/componentApi'
import historyApi from '../../api/historyApi'
import * as types from '../mutation-types'

// initial state
const state = {
  loading: false,
  data: [],
  error: false,
  addComponent: {
    loading: false,
    data: null,
    error: false
  },
  history: {
    currPageId: null,
    past: [],
    present: [],
    future: []
  },
  currPageId: null
}

// getters
const getters = {
  data: state => state.data,
  loading: state => state.loading,
  error: state => state.error,
  addComponentLoading: state => state.addComponent.loading,
  addComponentData: state => state.addComponent.data,
  addComponentError: state => state.addComponent.error,
  canUndo: state => state.history.past.length > 0,
  canRedo: state => state.history.future.length > 0
}

// actions
const actions = {
  addComponent ({ commit }, {tplId, pageId, component}) {
    commit(types.COMPONENT_ADD_LOADING)
    componentApi.addComponent(
      tplId,
      pageId,
      component,
      (component, history) => commit(types.COMPONENT_ADD_SUCCESS, { pageId, component, history }),
      (error) => commit(types.COMPONENT_ADD_ERROR, { error })
    )
  },
  getComponents ({ commit }, tplId) {
    commit(types.COMPONENT_LIST_LOADING)
    componentApi.getComponents(
      tplId,
      (components) => commit(types.COMPONENT_LIST_SUCCESS, { components }),
      (error) => commit(types.COMPONENT_LIST_ERROR, { error })
    )
  },
  updateComponent ({commit}, {tplId, pageId, component}) {
    commit(types.COMPONENT_UPDATE_LOADING)
    componentApi.updateComponent(
      tplId,
      pageId,
      component,
      (component, history) => commit(types.COMPONENT_UPDATE_SUCCESS, { pageId, component, history }),
      (error) => commit(types.COMPONENT_UPDATE_ERROR, { error })
    )
  },

  // action history
  undo ({commit}, {tplId, pageId}) {
    historyApi.undo(
      tplId,
      pageId,
      (components, history) => commit(types.COMPONENT_UNDO_SUCCESS, {components, history}),
      (error) => commit(types.COMPONENT_UNDO_ERROR, {error})
    )
  },
  redo ({commit}, {tplId, pageId}) {
    historyApi.redo(
      tplId,
      pageId,
      (components, history) => commit(types.COMPONENT_REDO_SUCCESS, {components, history}),
      (error) => commit(types.COMPONENT_REDO_ERROR, {error})
    )
  },
  initHistory ({commit}, {tplId, pageId}) {
    historyApi.initHistory(
      tplId,
      pageId,
      (history) => commit(types.COMPONENT_INIT_HISTORY, {pageId, history})
    )
  },
  flushHistory ({commit}, {pageId}) {
    historyApi.flushHistory(
      (msg) => commit(types.COMPONENT_FLUSH_HISTORY, {pageId, msg})
    )
  }
}

// mutations
const mutations = {
  // add component
  [types.COMPONENT_ADD_LOADING] (state) {
    state.addComponent.loading = true
    state.addComponent.error = false
  },
  [types.COMPONENT_ADD_SUCCESS] (state, { pageId, component, history }) {
    state.addComponent.loading = false
    state.addComponent.data = component
    state.error = false
    let inserted = false

    state.data.forEach((e, i) => {
      if (e.pageId === pageId) {
        state.data[i].components.push(component)
        inserted = true
      }
    })
    if (!inserted) {
      state.data.push({
        pageId,
        components: [component]
      })
    }

    // record the history
    state.history = history
  },
  [types.COMPONENT_ADD_ERROR] (state, { error }) {
    state.addComponent.loading = false
    state.addComponent.error = error
  },
  // get components
  [types.COMPONENT_LIST_LOADING] (state) {
    state.loading = true
    state.data = null
    state.error = false
  },
  [types.COMPONENT_LIST_SUCCESS] (state, { components }) {
    state.loading = false
    state.data = components
    state.error = false

    // 初始化history
    state.history = {
      past: [],
      present: state.data,
      future: []
    }
  },
  [types.COMPONENT_LIST_ERROR] (state, { error }) {
    state.loading = false
    state.data = null
    state.error = error
  },

  // update component
  [types.COMPONENT_UPDATE_LOADING] (state) {
  },
  [types.COMPONENT_UPDATE_SUCCESS] (state, {pageId, component, history}) {
    state.data.forEach((e, i) => {
      if (e.pageId === pageId) {
        state.data[i].components.forEach((se, si) => {
          if (se.id === component.id) {
            state.data[i].components.splice(si, 1, {
              ...state.data[i].components[si],
              ...component
            })
            // state.data[i].components.push(component)
          }
        })
      }
    })
    state.history = history
  },
  [types.COMPONENT_UPDATE_ERROR] (state) {
  },

  // action history
  [types.COMPONENT_UNDO_SUCCESS] (state, {components, history}) {
    state.data = components
    state.history = history
  },
  [types.COMPONENT_UNDO_ERROR] (state, {error}) {
    console.log(error)
  },
  // redo
  [types.COMPONENT_REDO_SUCCESS] (state, {components, history}) {
    state.data = components
    state.history = history
  },
  [types.COMPONENT_REDO_ERROR] (state, {error}) {
    console.log(error)
  },
  // initialize history
  [types.COMPONENT_INIT_HISTORY] (state, {history}) {
    state.history = history
  },
  // flush
  [types.COMPONENT_FLUSH_HISTORY] (state, {pageId, msg}) {
    let components = state.data.find(c => c.pageId === pageId)
    let present = []
    if (components && components.components && components.components.length > 0) present = components.components.slice(0)
    state.history = {
      past: [],
      present: present,
      future: []
    }
    console.log(msg)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
