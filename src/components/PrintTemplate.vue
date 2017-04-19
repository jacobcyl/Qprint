<style scoped>
  .card-body{
    height: 185px;
  }
  .card-body img{
    height: 100%;
  }
</style>
<template>
  <Card style="margin-bottom: 16px;">
    <p slot="title">{{ title }}</p>
    <router-link slot="extra" :to="{ name: 'template', params: { id: tplId }}">
      <Icon type="ios-compose"></Icon>
      编辑
    </router-link>
    <div class="card-body">
      <img src="https://file.iviewui.com/dist/76ecb6e76d2c438065f90cd7f8fa7371.png">
    </div>
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
  created () {
  }
}
</script>
