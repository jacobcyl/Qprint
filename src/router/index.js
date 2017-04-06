import Vue from 'vue'
import Router from 'vue-router'
import Workspace from '@/components/Workspace'
import Editor from '@/components/Editor'
import Hello from '@/components/Hello'

Vue.use(Router)

// workspace  工作台
// workspace/template/ID 指定ID模板
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Workspace,
      children: [
        {
          path: 'workspace',
          name: 'workspace',
          component: Workspace
        }
      ]
    },
    {
      path: '/workspace/template/:id',
      name: 'editTemplate',
      component: Editor
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    }
  ]
})
