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
              <Col :xs="24" :sm="12" :md="8" :lg="6" v-for="(template, index) in templates" :key="template.id">
                <print-template :title="template.title" :tpl-id="template.id" />
              </Col>
          </Row>
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
    components: {
      PrintTemplate
    },
    computed: mapGetters({
      templates: 'allTemplates'
    }),
    methods: {
      ...mapActions([
        'addToCart'
      ]),
      ...mapActions([
        'getAllTemplates'
      ])
    },
    created () {
      this.getAllTemplates()
    }
  }
</script>
