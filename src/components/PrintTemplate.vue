<template>
  <Card style="margin-bottom: 16px;">
    <p slot="title">{{ title }}</p>
    <router-link slot="extra" :to="{ name: 'editTemplate', params: { id: tplId }}">
      <Icon type="ios-compose"></Icon>
      编辑
    </router-link>
    <img src="https://file.iviewui.com/dist/76ecb6e76d2c438065f90cd7f8fa7371.png">
  </Card>
</template>
<script>
export default {
  name: 'print-template',
  props: {
    title: {
      type: String,
      required: true
    },
    tplId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
