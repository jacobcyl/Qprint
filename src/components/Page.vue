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
  }
</style>
<template>
  <div class="page" size="A4" v-droppable>
    <template v-for="component in page.components">
      <div class="component" :style="{left: component.left, top: component.top, 'font-size': component.fontSize}">
        {{ widgetText(component.widgetId) }}
      </div>
    </template>
  </div>
</template>

<script>
  import Draggable from './Draggable.vue'
  export default {
    props: {
      page: {
        type: Object,
        required: true
      },
      widgets: {
        type: Array,
        required: true
      }
    },
    methods: {
      widgetText: function (id) {
        let widget = this.widgets.find(t => t.id === id)
        if (widget !== undefined) return widget.text
        else return 'undefined'
      }
    },
    components: {
      Draggable
    }
  }
</script>
