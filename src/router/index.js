import Vue from 'vue'
import Router from 'vue-router'
import Workspace from '@/components/Workspace'
import Template from '@/components/Template'
// import Hello from '@/components/Hello'

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
      name: 'template',
      component: Template
    }
  ]
})
