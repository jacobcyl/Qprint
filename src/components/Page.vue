<style scoped>
  .page {
    background: white;
    display: block;
    margin: 0 auto;
    margin-bottom: 0.5cm;
    box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
    position: relative;
  }
  .page[size="A4"] {
    width: 21cm;
    height: 29.7cm;
  }
  .component {
    position: absolute;
    border: 1px dashed #aaa;
    padding: 5px 10px;
    cursor: default;
    user-select: none;
  }
</style>
<template>
  <div class="page" size="A4" v-droppable="{handleDrop: handleDrop}">
    <template v-if="currComponents.length > 0">
      <template v-for="component in currComponents">
        <div v-if="scale !== 1" :id="component.id" v-moveable="{scale: scale, handleMove: handleMove}" class="component" draggable="false" :style="{left: component.left, top: component.top}">{{ widgetText(component.widgetId) }}</div>
      </template>
    </template>
    <Spin size="large" fix v-if="loading"></Spin>
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
        components: 'components/data'
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
        'updateComponent': 'components/updateComponent'
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
      }
    },
    components: {
    },
    created () {
      // this.getComponents({tplId: this.tplid, pageId: this.page.id})
    }
  }
</script>
