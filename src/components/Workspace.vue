<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
        line-height: 30px;
    }
    .layout-logo span{
      color: white;
      padding-left: 10px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        width: 75%;
        margin: 30px auto 20px;
        min-height: 200px;
        padding: 16px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .card-body{
      height: 185px;
    }
    .add-template {
    }
    .add-template p{
      width: 100%;
      margin-top: 10px;
      display: inline-block;
    }
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">
              <span>Easy Print</span>
            </div>
            <div class="layout-nav">
            </div>
        </Menu>
        <div class="layout-content">
          <Row :gutter="16">
            <Col :xs="24" :sm="12" :md="8" :lg="6">
              <Card style="margin-bottom: 16px;">
                <p slot="title">新建模板</p>
                <div class="card-body">
                  <div class="add-template">
                    <p><Input v-model="name" placeholder="请输入模板名称"></Input></p>
                    <p><Button type="success" long @click="handleSaveTpl">保存</Button></p>
                  </div>
                </div>
              </Card>
            </Col>
            <template v-if="templates.length > 0">
              <Col :xs="24" :sm="12" :md="8" :lg="6" v-for="(template, index) in templates" :key="template.id">
                <print-template :title="template.name" :tpl-id="template.id" />
              </Col>
            </template>
          </Row>
          <Spin size="large" fix v-if="loading"></Spin>
        </div>
        <div class="layout-copy">
            2017 &copy; HanLing
        </div>
    </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import PrintTemplate from './PrintTemplate.vue'

  export default {
    data () {
      return {
        name: ''
      }
    },
    components: {
      PrintTemplate
    },
    computed: {
      ...mapGetters({
        loading: 'workspace/loading',
        error: 'workspace/error',
        templates: 'workspace/templates',
        addingError: 'workspace/addingError'
      })
    },
    methods: {
      ...mapActions({
        'getAllTemplates': 'workspace/getAllTemplates',
        'addTemplate': 'workspace/addTemplate'
      }),
      handleSaveTpl: function () {
        let tpl = {
          name: this.name
        }
        this.addTemplate(tpl)
      },
      toast: function (msg, type) {
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
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      error: function () {
        this.toast(this.error, 'error')
      },
      addingError: function () {
        console.log(this.addingError)
        if (this.addingError) {
          this.toast(this.addingError, 'error')
        }
      }
    },
    created () {
      this.getAllTemplates()
    }
  }
</script>
