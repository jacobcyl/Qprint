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
      (component) => commit(types.COMPONENT_ADD_SUCCESS, { pageId, component }),
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
      (component) => commit(types.COMPONENT_UPDATE_SUCCESS, { pageId, component }),
      (error) => commit(types.COMPONENT_UPDATE_ERROR, { error })
    )
  },

  // action history
  undo ({commit}, {tplId, pageId}) {
    historyApi.undo(
      tplId,
      pageId,
      (components) => commit(types.COMPONENT_UNDO_SUCCESS, {components}),
      (error) => commit(types.COMPONENT_UNDO_ERROR, {error})
    )
  },
  redo ({commit}, {tplId, pageId}) {
    historyApi.redo(
      tplId,
      pageId,
      (components) => commit(types.COMPONENT_REDO_SUCCESS, {components}),
      (error) => commit(types.COMPONENT_REDO_ERROR, {error})
    )
  },
  flushHistory ({commit}) {
    historyApi.flushHistory(
      (components) => commit(types.COMPONENT_FLUSH_HISTORY, {components})
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
  [types.COMPONENT_ADD_SUCCESS] (state, { pageId, component }) {
    state.addComponent.loading = false
    state.addComponent.data = component
    state.error = false
    let inserted = false
    // 记录当前以及上一次component状态
    let currCommponentState = []
    let previousCompomentState = []

    state.data.forEach((e, i) => {
      if (e.pageId === pageId) {
        previousCompomentState = state.data[i].components.slice(0)
        state.data[i].components.push(component)
        inserted = true
        currCommponentState = state.data[i].components
      }
    })
    if (!inserted) {
      state.data.push({
        pageId,
        components: [component]
      })
      currCommponentState = [component]
    }

    // check if page has been switched
    if (state.currPageId !== pageId) {
      // flush and initialize history
      state.history = {
        currPageId: null,
        past: [previousCompomentState],
        present: currCommponentState,
        future: []
      }
    } else {
      // record the history
      const {past, present} = state.history
      state.history = {
        currPageId: pageId,
        past: [ ...past, present ],
        present: currCommponentState,
        future: []
      }
    }

    // update currPageId
    state.currPageId = pageId
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
  },
  [types.COMPONENT_LIST_ERROR] (state, { error }) {
    state.loading = false
    state.data = null
    state.error = error
  },

  // update component
  [types.COMPONENT_UPDATE_LOADING] (state) {
  },
  [types.COMPONENT_UPDATE_SUCCESS] (state, {pageId, component}) {
    // 记录当前以及上一次component状态
    let previousCompomentState = []
    state.data.forEach((e, i) => {
      if (e.pageId === pageId) {
        state.data[i].components.forEach((se, si) => {
          if (se.id === component.id) {
            // 保存变更前状态
            previousCompomentState = state.data[i].components.slice(0)
            state.data[i].components[si] = {
              ...state.data[i].components[si],
              ...component
            }

            // check if page has been switched
            if (state.currPageId !== pageId) {
              // flush history and initialize it
              state.history = {
                currPageId: null,
                past: [previousCompomentState],
                present: state.data[i].components,
                future: []
              }
            } else {
              // record the history
              const {past, present} = state.history
              state.history = {
                currPageId: pageId,
                past: [ ...past, present ],
                present: state.data[i].components,
                future: []
              }
            }
            // update currPageId
            state.currPageId = pageId
          }
        })
      }
    })
  },
  [types.COMPONENT_UPDATE_ERROR] (state) {
  },

  // action history
  [types.COMPONENT_UNDO_SUCCESS] (state, {components}) {
    state.data = components
  },
  [types.COMPONENT_UNDO_ERROR] (state, {error}) {
    console.log(error)
  },
  // redo
  [types.COMPONENT_REDO_SUCCESS] (state, {components}) {
    state.data = components
  },
  [types.COMPONENT_REDO_ERROR] (state, {error}) {
    console.log(error)
  },
  // flush
  [types.COMPONENT_FLUSH_HISTORY] (state) {
    state.history = {
      currPageId: null,
      past: [],
      present: state.data,
      future: []
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
