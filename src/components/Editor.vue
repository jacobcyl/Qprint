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
  .canvas-container{
    margin: auto;
    width: 500px;
    height: 500px;
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
                      <span>{{ counter }}</span>
                      <Page ref="page" class="preview" :page="page" :style="{ transform: 'scale(' + previewScale + ')'}"></Page>
                    </div>
                  </transition-group>
                </draggable>
              </div>
            </Tab-pane>
            <Tab-pane label="资料" name="name2">
              <div tabindex="-1" ref="focusableDiv"></div>
              <a @click.prevent="getEle">{{ canvasWidth }}</a>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
      <!-- middle panel -->
      <!-- <VuePerfectScrollbar v-model="canvasWidth" ref="screen" class="panel middle-panel" v-once :settings="settings" @ps-scroll-y="scrollHanle">
        <div ref="canvas" class="page-container">
          <div class="canvas-container" :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }">
            <Page class="canvas" :page="pages[currPage]" :style="{ transform: 'scale(' + canvasScale + ')'}"></Page>
          </div>
        </div>
        <span v-model="counter" style="position: absolute; width: 720px; left: 4640px; bottom: 0px;">{{ counter }}</span>
      </VuePerfectScrollbar> -->
      <!-- right panel -->
      <div class="panel right-panel">
          <button style="margin: 0 auto" v-on:click="counter += 1">{{ counter }}</button>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import ToolBar from './ToolBar.vue'
import Page from './Page.vue'
import draggable from 'vuedraggable'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ruler from './Ruler'
import '@/assets/css/styles.css'

export default {
  name: 'editor',
  data () {
    return {
      counter: 0,
      pages: this.template.pages,
      currPage: 0,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      pageWidth: 0,
      pageHeight: 0,
      previewPageWidth: 100,
      previewPageHeight: 120,
      previewScale: 0.1, // 预览缩放
      canvasScale: 0.55,
      canvasWidth: (window.innerHeight - 100),
      canvasHeight: window.innerHeight - 100,
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
  computed: {
    canvasWidth: function () {
      return this.counter
    },
    classObject: function () {
      console.log(this.pageHeight)
      const w = this.pageHeight === 0 ? 0 : this.pageWidth * this.canvasHeight / this.pageHeight
      return {
        width: w,
        height: this.canvasHeight
      }
    }
  },
  methods: {
    scrollHanle (evt) {
      console.log(evt)
    },
    vueRulerChanged (data) {
      console.log(data)
    }
  },
  components: {
    ToolBar,
    Page,
    draggable,
    VuePerfectScrollbar,
    Ruler
  },
  mounted () {
    if (this.$refs.page && this.$refs.page.length > 0) {
      this.pageWidth = this.$refs.page[0].$el.clientWidth
      this.pageHeight = this.$refs.page[0].$el.clientHeight

      this.canvasWidth = this.pageWidth * this.canvasHeight / this.pageHeight
      this.canvasScale = this.canvasWidth / this.pageWidth

      this.previewPageWidth = this.pageWidth * this.previewPageHeight / this.pageHeight
      this.previewScale = this.previewPageWidth / this.pageWidth
    }
    // scroll to center horizontal
    console.log(this.$refs)
    // this.$refs.screen.$el.scrollLeft = (this.$refs.canvas.clientWidth - this.$refs.screen.$el.clientWidth) / 2
  }
}
</script>
