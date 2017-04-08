<template>
    <div class="demo-spin-article">
        <div v-if="template" class="content">
          <Editor
            :template="template"
          ></Editor>
        </div>
        <Spin size="large" fix v-if="loading"></Spin>
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
      loading: 'template/loading',
      template: 'template/data',
      error: 'template/error'
    }),
    methods: {
      toast (msg, type) {
        if (msg.length === 0) return
        switch (type) {
          case 'success':
            this.$Message.success(msg)
            break
          case 'info':
            this.$Message.info(msg)
            break
          case 'waring':
            this.$Message.waring(msg)
            break
          case 'error':
            this.$Message.error(msg)
            break
          default:
            this.$Message.info(msg)
            break
        }
      },
      ...mapActions({
        'getTemplate': 'template/getTemplate'
      })
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.getTemplate(this.id)
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      error: function () {
        this.toast(this.error, 'error')
      }
    }
  }
</script>
