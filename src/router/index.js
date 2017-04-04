import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import EditTpl from '@/components/EditTpl'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/template/edit',
      name: 'EditTpl',
      component: EditTpl
    }
  ]
})
