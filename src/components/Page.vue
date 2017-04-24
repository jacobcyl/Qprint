<style scoped>
  @media print{
    @page {
      size: A4 portrait;
      margin: 0;
      padding: 0;
      border: 0;
    }
    .page {
      padding: 0 !important;
      margin: 0 !important;
      box-shadow: none !important;
      background: none;
    }
    .component {
      background: none !important;
    }
  }
  .page {
    background: url('../assets/images/p3.jpg');
    display: block;
    margin: 0 auto;
    margin-bottom: 0.5cm;
    box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
    position: relative;
    background-size: cover;
    overflow: hidden;
  }
  .page[size="A4"] {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
  }
  .component {
    position: absolute;
    border: 1px dashed #aaa;
    padding: 1px 5px;
    cursor: default;
    user-select: none;
    font-size: 14pt;
    background: rgba(91, 192, 222, 0.15);
  }
  .component.select {
    background: rgba(222, 222, 91, 0.3);
    border-color: #b5d2f1;
  }
</style>
<template>
  <div class="page" size="A4" v-droppable="{handleDrop: handleDrop}">
    <template v-if="currComponents.length > 0">
      <template v-for="component in currComponents">
        <div
          :id="component.id"
          v-if="scale !== 1"
          v-editable="{scale: scale, move: handleMove, select: handleSelect}"
          class="component"
          @keyup.up="handleMoveUp"
          draggable="false" :style="{left: component.left, top: component.top, 'font-size': component.fontSize}">
            {{ widgetText(component.widgetId) }}
        </div>
      </template>
    </template>
    <Spin class="noprint" size="large" fix v-if="loading"></Spin>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    props: {
      page: {
        type: Object,
        required: true
      },
      tplid: {
        type: String,
        required: true
      },
      widgets: {
        type: Array,
        required: true
      },
      scale: {
        type: Number,
        required: true
      }
    },
    computed: {
      ...mapGetters({
        loading: 'components/loading',
        error: 'components/error',
        components: 'components/data',
        selected: 'components/selected'
      }),
      currComponents: function () {
        let cs = this.components.find(t => t.pageId === this.page.id)
        if (cs) return cs.components
        else return []
      },
      pageScale: function () {
        console.log(this.scale)
        return this.scale
      }
    },
    methods: {
      ...mapActions({
        'addComponent': 'components/addComponent',
        'updateComponent': 'components/updateComponent',
        'select': 'components/select'
      }),
      widgetText: function (id) {
        let widget = this.widgets.find(t => t.id === id)
        if (widget !== undefined) return widget.text
        else return 'undefined'
      },
      handleDrop: function (el) {
        this.addComponent({tplId: this.tplid, pageId: this.page.id, component: el})
      },
      handleMove: function (el) {
        const {id} = el
        if (id === undefined) {
          console.error('undefine component id')
          return
        }
        this.updateComponent({tplId: this.tplid, pageId: this.page.id, component: el})
      },
      // 右键打开菜单
      openMenu: function () {
      },
      // 选中
      handleSelect: function (target) {
        this.select({pageId: this.page.id, target: target})
      },
      // 取消选中
      handleUnSelect: function () {
        console.log('un select')
      },
      handleMoveUp: function (e) {
        console.log(e)
      }
    },
    watch: {
      components: function (v) {
        console.log('components changed')
        console.log(v[2].components[0].left)
      }
    },
    created () {
    }
  }
</script>
