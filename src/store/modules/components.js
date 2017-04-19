import componentApi from '../../api/componentApi'
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
  }
}

// getters
const getters = {
  data: state => state.data,
  loading: state => state.loading,
  error: state => state.error,
  addComponentLoading: state => state.addComponent.loading,
  addComponentData: state => state.addComponent.data,
  addComponentError: state => state.addComponent.error
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
      (component) => commit(types.COMPONENT_UPDATE_SUCCESS, { component }),
      (error) => commit(types.COMPONENT_UPDATE_ERROR, { error })
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
  [types.COMPONENT_UPDATE_SUCCESS] (state, {component}) {
    state.data.forEach((e, i) => {
      if (e.id === component.id) {
        state.data[i] = {
          ...state.data[i],
          ...component
        }
      }
    })
  },
  [types.COMPONENT_UPDATE_ERROR] (state) {
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
