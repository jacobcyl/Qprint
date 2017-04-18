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
    <template v-if="pages.length && currPage">
      <template v-for="component in currPage.components">
        <div v-moveable:scale="pageScale" class="component" draggable="false" :style="{left: component.left, top: component.top}">{{ widgetText(component.id) }}</div>
      </template>
    </template>
    <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    props: {
      tplid: {
        type: String,
        required: true
      },
      pageid: {
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
        loading: 'pages/loading',
        error: 'pages/error',
        pages: 'pages/data'
      }),
      currPage: function () {
        return this.pages.find(t => t.id === this.pageid)
      },
      pageScale: function () {
        console.log(this.scale)
        return this.scale
      }
    },
    methods: {
      ...mapActions({
        'getPages': 'pages/getPages',
        'addComponent': 'pages/addComponent'
      }),
      widgetText: function (id) {
        let widget = this.widgets.find(t => t.id === id)
        if (widget !== undefined) return widget.text
        else return 'undefined'
      },
      handleDrop: function (el) {
        this.addComponent({pageid: this.pageid, component: el})
      }
    },
    components: {
    },
    created () {
      this.getPages({tplid: this.tplid})
    }
  }
</script>
