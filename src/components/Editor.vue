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
  .panel {
    position: fixed;
    top: 38px;
    box-sizing: border-box;
    bottom: 0px;
    transition: all 0.15s ease-in-out;
  }
  .left-panel {
    left: 0;
    width: 280px;
    z-index: 4;
    border-right: 1px solid #aaaaaa;
  }
  .middle-panel {
    left: 280px;
    right: 280px;
    background: #f0f0f2;
  }
  .right-panel {
    right: 0;
    width: 280px;
    z-index: 4;
    border-left: 1px solid #aaaaaa;
  }
  .preview {
    transform: scale(0.1);
    transform-origin: 0 0;
    margin: 0 auto;
  }
  .canvas {
    transform-origin: center 0;
  }
  .preview-page-container {
    width: 180px;
    height: 180px;
    margin: 0 auto;
    margin-bottom: 16px;
  }
  .page-container {
    margin: auto;
    position: relative;
    z-index: -100;
    width: 10000px;
    height: 9999px;
    padding: 50px;
  }
  .tab-container{
    background: #e3e8ee;
    padding:16px;
  }
</style>
<template>
  <div>
    <div id="workspace">
      <ToolBar :title="template.title"></ToolBar>
      <!-- left panel -->
      <div class="panel left-panel">
        <div class="tab-container">
          <Tabs value="name1" type="card">
            <Tab-pane label="页面" name="name1">
              <div ref="content" class="content">
                <draggable v-model="pages" :options="{group:'page', animation: 150}" @start="drag=true" @end="drag=false">
                <transition-group>
                   <div class="preview-page-container" :style="{ width: previewPageWidth + 'px', height: previewPageHeight + 'px' }" v-for="page in pages" :key="page.id">
                    <Page ref="page" class="preview" :page="page" :style="{ transform: 'scale(' + previewScale + ')'}"></Page>
                  </div>
                  </transition-group>
                </draggable>
              </div>
            </Tab-pane>
            <Tab-pane label="资料" name="name2">
              <div tabindex="-1" ref="focusableDiv"></div>
              <a @click.prevent="getEle">Focus</a>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
      <VuePerfectScrollbar ref="screen" class="panel middle-panel" v-once :settings="settings" @ps-scroll-y="scrollHanle">
        <div ref="canvas" class="page-container">
          <Page class="canvas" :page="pages[currPage]" :style="{ transform: 'scale(' + canvasScale + ')'}"></Page>
        </div>
      </VuePerfectScrollbar>
      <!-- right panel -->
      <div class="panel right-panel">
      </div>
    </div>
  </div>
</template>
<script>
import ToolBar from './ToolBar.vue'
import Page from './Page.vue'
import draggable from 'vuedraggable'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import '@/assets/css/styles.css'

export default {
  name: 'editor',
  data () {
    return {
      pages: this.template.pages,
      currPage: 0,
      pageWidth: 0,
      pageHeight: 0,
      previewPageWidth: 100,
      previewPageHeight: 120,
      previewScale: 0.1, // 预览缩放
      canvasScale: 0.55,
      settings: {
        maxScrollbarLength: 80,
        wheelSpeed: 0.1
      }
    }
  },
  props: {
    template: {
      type: Object,
      required: true
    }
  },
  methods: {
    scrollHanle (evt) {
      console.log(evt)
    }
  },
  components: {
    ToolBar,
    Page,
    draggable,
    VuePerfectScrollbar
  },
  mounted () {
    if (this.$refs.page && this.$refs.page.length > 0) {
      this.pageWidth = this.$refs.page[0].$el.clientWidth
      this.pageHeight = this.$refs.page[0].$el.clientHeight
      this.previewPageWidth = this.pageWidth * this.previewPageHeight / this.pageHeight
      this.previewScale = Math.min(
        this.previewPageWidth / this.pageWidth,
        this.previewPageHeight / this.pageHeight
      )
    }

    // scroll to center horizontal
    this.$refs.screen.$el.scrollLeft = (this.$refs.canvas.clientWidth - this.$refs.screen.$el.clientWidth) / 2
  }
}
</script>
