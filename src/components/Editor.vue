<style scoped>
 @media print {
  .noprint {
    display: none !important;
  }
  .preview {
    transform: scale(1) !important;
  }
  .preview-page-container {
    width: 210mm !important;
    height: 297mm !important;
    border: 0 !important;
    box-shadow: 0 !important;
    overflow: hidden !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .page-list-item, .tab-container {
    padding: 0 !important;
    margin: 0 !important;
  }
  .panel {
    top: 0 !important;
    position: relative !important;
  }
  .left-panel {
    width: 100% !important;
    border: none !important;
  }
  #workspace {
    position: relative !important;
    overflow: scroll !important;
  }
  .modal {
    visibility: hidden;
  }
 }

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
    right: 350px;
    background: #f0f0f2;
  }
  .right-panel {
    right: 0;
    width: 350px;
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
  .page-list-item{
    padding: 10px;
    margin-bottom: 5px;
  }
  .page-list-item.curr-page{
    background: #cdd7e2;
  }
  .page-list-item:hover{
    background: #e8ecf1;
  }
  .preview-page-container {
    width: 85px;
    height: 120px;
    margin: 0 auto;
    cursor: pointer;
    box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
    /*margin-bottom: 16px;*/
  }
  .page-list-item .page-title {
    display: block;
    text-align: center;
    padding: 5px;
  }
  .add-page {
    width: 85px;
    height: 120px;
    margin: 0 auto;
    cursor: pointer;
    position: relative;
    box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
  }
  .add-page:before, .add-page:after {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #c5c5c5;
  }
  .add-page:before {
    width: 2px;
    height: 50px;
  }
  .add-page:after {
    width: 40px;
    height: 2px;
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
  /* component */
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
      <!-- left panel -->
      <div class="panel left-panel">
        <div class="tab-container">
          <Tabs value="pages" type="card">
          <!-- tab 1 -->
            <Tab-pane class="page-tab" label="页面" name="pages">
              <div ref="content" class="content">
                <template v-if="pages.length > 0">
                  <draggable v-model="pages" :options="{group:'page', animation: 150}" @start="drag=true" @end="drag=false">
                    <transition-group>
                      <div v-for="page in pages" :key="page.id" :class="['page-list-item', isCurrPage(page.id) ? 'curr-page' : '']">
                        <div @click="handleSwitchPage(page.id)" :class="['preview-page-container']" :style="{ width: previewPageWidth + 'px', height: previewPageHeight + 'px' }" title="点击编辑该页面">
                          <Page ref="page" class="preview" :tplid="currTemplate" :page="page" :widgets="widgets" :scale="canvasScale" :style="{ transform: 'scale(' + previewScale + ')'}"></Page>
                        </div>
                        <span class="page-title noprint">{{ page.title }}</span>
                      </div>
                    </transition-group>
                  </draggable>
                </template>
                <div class="page-list-item noprint">
                  <div @click="modalAddPage = true"  class="add-page">
                  </div>
                </div>
              </div>
            </Tab-pane>
            <!-- tab 2 -->
            <Tab-pane class="noprint component-tab" label="控件信息" name="widgets">
            </Tab-pane>
          </Tabs>
        </div>
      </div>
      <!-- middle panel -->
      <VuePerfectScrollbar ref="screen" class="panel middle-panel noprint" :settings="settings" @ps-scroll-y="scrollHanle">
        <Ruler :screenWidth="screenWidth" :screenHeight="screenHeight" :scale="canvasScale">
        </Ruler>
        <div ref="canvas" class="page-container">
          <div class="canvas-container" v-bind:style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }">
            <Page v-if="currPage" class="canvas page" :tplid="currTemplate" :page="currPage" :scale="canvasScale" :widgets="widgets" :style="{ transform: 'scale(' + canvasScale + ')'}">
            </Page>
          </div>
        </div>
      </VuePerfectScrollbar>
      <!-- right panel -->
      <div class="panel right-panel noprint">
        <WidgetContainer :tplid="currTemplate" :widgets="widgets"></WidgetContainer>
      </div>
      <!-- tool bar -->
      <ToolBar class="noprint" :title="template.name" :tplid="currTemplate" :pageid="currPageId"></ToolBar>
    </div>
    <Modal class="modal" v-model="modalAddPage" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>新建页面</span>
      </p>
      <div style="text-align:center">
        <Input v-model="newPageTitle" placeholder="请输入页面标题" style="width: 300px"></Input>
      </div>
      <div slot="footer">
        <Button type="warning" size="large" long :loading="addPageLoading" @click="createPage">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ToolBar from './ToolBar.vue'
import Page from './Page.vue'
import draggable from 'vuedraggable'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import WidgetContainer from './WidgetContainer.vue'
import Ruler from './Ruler'
import '@/assets/css/styles.css'

export default {
  name: 'editor',
  data () {
    return {
      currTemplate: this.template.id,
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
      modalAddPage: false,
      newPageTitle: '', // 新建页面标题
      newWidgetName: '' // 新建控件
    }
  },
  props: {
    template: {
      type: Object,
      required: true
    },
    pages: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currPageId: 'pages/currPage',
      addPageLoading: 'pages/addPageLoading',
      addPageData: 'pages/addPageData',
      addPageError: 'pages/addPageError',
      widgets: 'widgets/data'
    }),
    // 当前页
    currPage: function () {
      let currpage = this.pages.find(p => p.id === this.currPageId)
      if (currpage) return currpage
      else return null
    },
    canvasHeight: function () {
      const {innerHeight} = window
      return (innerHeight - 80)
    },
    canvasWidth: function () {
      return this.pageHeight === 0 ? 0 : this.canvasHeight * this.pageWidth / this.pageHeight
    },
    canvasScale: function () {
      if (this.pageWidth === 0) return 1
      return this.canvasWidth / this.pageWidth
    },
    // 是否重新计算相关页面的尺寸
    reCalcPage: function () {
      return this.pages.length > 0
    }
  },
  methods: {
    ...mapActions({
      'addPage': 'pages/addPage',
      'switchPage': 'pages/switchPage',
      'flushHistory': 'components/flushHistory',
      'initHistory': 'components/initHistory',
      'getWidgets': 'widgets/getAll'
    }),
    handleSwitchPage: function (pageId) {
      this.switchPage(pageId)
      // this.flushHistory({pageId: this.page.id})
      this.initHistory({tplId: this.template.id, pageId: pageId})
    },
    createPage () {
      if (this.newPageTitle === '') {
        this.$Message.error('页面标题不能为空')
        return
      }
      this.addPage({
        tplId: this.currTemplate,
        page: {
          title: this.newPageTitle
        }
      })
    },
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
    isCurrPage: function (pageId) {
      return this.currPageId === pageId
    },
    reCalcPageSize: function () {
      this.$nextTick(function () {
        if (this.$refs.page && this.$refs.page.length > 0) {
          this.pageWidth = this.$refs.page[0].$el.clientWidth
          this.pageHeight = this.$refs.page[0].$el.clientHeight

          this.previewPageWidth = this.pageWidth * this.previewPageHeight / this.pageHeight
          this.previewScale = this.previewPageWidth / this.pageWidth

          // this.screenWidth = this.$refs.screen.$el.clientWidth
          // this.screenHeight = this.$refs.screen.$el.clientHeight
        }
        this.screenWidth = this.$refs.screen.$el.clientWidth
        this.screenHeight = this.$refs.screen.$el.clientHeight
        // scroll to center horizontal
        this.$refs.screen.$el.scrollLeft = (this.$refs.canvas.clientWidth - this.$refs.screen.$el.clientWidth) / 2
      })
    }
  },
  watch: {
    reCalcPage: function (v) {
      console.log('reCalcPage has changed')
      this.reCalcPageSize()
    },
    addPageError: function (v) {
      if (v) this.$Message.error(v)
    },
    addPageData: function (v) {
      if (v) {
        this.$Message.success('创建成功')
        this.modalAddPage = false
      }
    }
  },
  components: {
    ToolBar,
    Page,
    draggable,
    VuePerfectScrollbar,
    Ruler,
    WidgetContainer
  },
  created () {
    console.log('created')
  },
  mounted () {
    this.initHistory({tplId: this.template.id, pageId: this.currPageId})
    this.reCalcPageSize()
    this.getWidgets(this.template.id)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  destroyed () {
  }
}
</script>
