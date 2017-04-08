<style scoped>
  #workspace {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f0f0f2;
    transition: all 0.15s ease-in-out;
  }
  .leftPanel {
    position: fixed;
    left: 0;
    top: 38px;
    box-sizing: border-box;
    bottom: 0px;
    width: 280px;
    z-index: 4;
    border-right: 1px solid #aaaaaa;
    transition: all 0.15s ease-in-out;
  }

</style>
<template>
  <div>
    <div id="workspace">
      <ToolBar :title="template.title"></ToolBar>
      <div class="leftPanel">
        <Tabs value="name1">
          <Tab-pane label="页面" name="name1">
            <div class="content">
              <Page v-for="page in template.pages"></Page>
            </div>
          </Tab-pane>
          <Tab-pane label="资料" name="name2">标签二的内容</Tab-pane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script>
import ToolBar from './ToolBar.vue'
import Page from './Page.vue'
export default {
  name: 'editor',
  props: {
    template: {
      type: Object,
      required: true
    }
  },
  components: {
    ToolBar,
    Page
  },
  created () {
  }
}
</script>
