import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import cart from './modules/cart'
import products from './modules/products'
import templates from './modules/templates'

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
    cart,
    products,
    templates
  },
  plugins
})
export default store
