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
    margin: 0 auto;
    transform-origin: 0 0;
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
    padding: 30px;
  }
  .canvas-container{
    margin: auto;
    width: 500px;
    height: 500px;
  }
  .tab-container{
    background: #e3e8ee;
    padding:16px;
  }

  /**/
  .ui-draggable {
    background-color: #5bc0de;
    display: inline-block;
    text-align: center;
    border-radius: 3px;
    margin-right: 10px;
    cursor:pointer;
    padding: 6px 20px;
    color: #fff;
  }
  .component{
    position: absolute;
    left: 0;
    top: 0;
  }
  .hide{
    transform:translateX(-9999px);
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
                      <Page ref="page" class="preview" :tplid="currTemplate" :pageid="page.id" :widgets="widgets" :scale="canvasScale" :style="{ transform: 'scale(' + previewScale + ')'}"></Page>
                    </div>
                  </transition-group>
                </draggable>
              </div>
            </Tab-pane>
            <Tab-pane label="资料" name="name2">
            </Tab-pane>
          </Tabs>
        </div>
      </div>
      <!-- middle panel -->
      <VuePerfectScrollbar ref="screen" class="panel middle-panel" :settings="settings" @ps-scroll-y="scrollHanle">
        <Ruler :screenWidth="screenWidth" :screenHeight="screenHeight" :scale="canvasScale">
        </Ruler>
        <div ref="canvas" class="page-container">
          <div class="canvas-container" v-bind:style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }">
            <Page class="canvas page" :tplid="currTemplate" :pageid="currPage" :scale="canvasScale" :widgets="widgets" :style="{ transform: 'scale(' + canvasScale + ')'}">
            </Page>
          </div>
        </div>
      </VuePerfectScrollbar>
      <!-- right panel -->
      <div class="panel right-panel">
        <div id='widget1' data-type="widget" class='ui-draggable' draggable='true' v-draggable="{droparea:dropArea, handleDrop:handleDrop}">测试</div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import ToolBar from './ToolBar.vue'
import Page from './Page.vue'
import draggable from 'vuedraggable'
import Draggable from './Draggable.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ruler from './Ruler'
import '@/assets/css/styles.css'

export default {
  name: 'editor',
  data () {
    return {
      counter: 0,
      pages: this.template.pages,
      currTemplate: this.template.id,
      currPage: '1',
      screenWidth: 0,
      screenHeight: 0,
      pageWidth: 0,
      pageHeight: 0,
      previewPageWidth: 100,
      previewPageHeight: 120,
      previewScale: 0.1, // 预览缩放
      settings: {
        maxScrollbarLength: 80,
        wheelSpeed: 0.1
      },
      dropArea: 'page'
    }
  },
  props: {
    template: {
      type: Object,
      required: true
    }
  },
  computed: {
    canvasHeight: function () {
      const {innerHeight} = window
      return (innerHeight - 80)
    },
    canvasWidth: function () {
      return this.pageHeight === 0 ? 0 : this.canvasHeight * this.pageWidth / this.pageHeight
    },
    canvasScale: function () {
      if (this.pageWidth === 0) return 0
      return this.canvasWidth / this.pageWidth
    },
    widgets: function () {
      return [
        {
          id: 'widget1',
          text: 'hahahah'
        }
      ]
    }
  },
  methods: {
    scrollHanle (evt) {
      // console.log(evt)
    },
    vueRulerChanged (data) {
      console.log(data)
    },
    handleResize (evt) {
      this.screenWidth = this.$refs.screen.$el.clientWidth
      this.screenHeight = this.$refs.screen.$el.clientHeight
    },
    handleDrop (evt, data) {
      console.log('dropped')
    }
  },
  components: {
    ToolBar,
    Page,
    draggable,
    VuePerfectScrollbar,
    Ruler,
    Draggable
  },
  mounted () {
    if (this.$refs.page && this.$refs.page.length > 0) {
      this.pageWidth = this.$refs.page[0].$el.clientWidth
      this.pageHeight = this.$refs.page[0].$el.clientHeight

      this.previewPageWidth = this.pageWidth * this.previewPageHeight / this.pageHeight
      this.previewScale = this.previewPageWidth / this.pageWidth
    }
    // scroll to center horizontal
    this.$refs.screen.$el.scrollLeft = (this.$refs.canvas.clientWidth - this.$refs.screen.$el.clientWidth) / 2
    this.screenWidth = this.$refs.screen.$el.clientWidth
    this.screenHeight = this.$refs.screen.$el.clientHeight
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
