import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import workspace from './modules/workspace'
import template from './modules/template'
import pages from './modules/pages'
import components from './modules/components'
import widgets from './modules/widgets'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const plugins = process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  // actions,
  // getters,
  modules: {
    workspace,
    template,
    pages,
    components,
    widgets
  },
  plugins
})
export default store
