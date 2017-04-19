<template>
    <div class="demo-spin-article">
      {{ template }}
        <div v-if="template" class="content">
          <Editor :template="template" :pages="pages"></Editor>
        </div>
        <Spin size="large" fix v-if="templateLoading || pagesLoading"></Spin>
    </div>
</template>
<script>
  import Editor from './Editor.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        id: this.$route.params.id
      }
    },
    components: {
      Editor
    },
    computed: mapGetters({
      templateLoading: 'template/loading',
      template: 'template/data',
      templateError: 'template/error',
      pagesLoading: 'pages/loading',
      pages: 'pages/data',
      pagesError: 'pages/error'
    }),
    methods: {
      ...mapActions({
        'getTemplate': 'template/getTemplate',
        'getPages': 'pages/getPages',
        'getComponents': 'components/getComponents'
      })
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.getTemplate(this.id)
      this.getPages(this.id)
      this.getComponents(this.id)
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      templateError: function (v) {
        if (v) this.$Message.error(v)
      },
      pagesError: function (v) {
        if (v) {
          this.$Message.error(v)
        }
      }
    }
  }
</script>
