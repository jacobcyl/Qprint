// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import { currency } from './currency'

Vue.config.productionTip = false

Vue.use(iView)

Vue.filter('currency', currency)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
})
