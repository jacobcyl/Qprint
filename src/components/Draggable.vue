<style scoped>
.select-item {
  background-color: #5bc0de;
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  margin-right: 10px;
  cursor:pointer;
  padding: 6px 20px;
  color: #fff;
  left: 0;
  top: 0;
}
 .cursored{
  cursor: default;
}
.project-content,.people-content {
    margin: 30px 50px;
}
.people-content {
    margin-top: 30px;
}
.drag-div {
    border: 1px solid #5bc0de;
    padding:10px;
    margin-bottom: 10px;
    width: 800px;
    cursor: pointer;
}
.select-project-item {
    display: inline-block;
    text-align: center;
    border-radius: 3px;
}
.drag-people-label{
  margin-bottom:0;
  padding-right:10px;
}
</style>
<template>
  <div class='drag-content'>
    <div id='widget1' data-widget="draggable" class='select-item' draggable='true' v-demo:hello.a.b="message">测试</div>
    <div class='project-content'>
      <div :id='pjdt.id' class='select-item' draggable='true' @dragstart='drag($event)' v-for='pjdt in projectdatas'>{{pjdt.name}}</div>
    </div>
    <div class='people-content'>
      <div class='drag-div' v-for='(ppindex,ppdt) in peopledata' @drop='drop($event)' @dragover='allowDrop($event)'>
        <div class='select-project-item'>
          <label class='drag-people-label'>{{ppdt.name}}:</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// let dom = null
export default {
  components: {
  },
  ready: function () {
  },
  methods: {
    drag: function (event) {
      // dom = event.currentTarget
      event.dataTransfer.setData('text/plain', event.target.className + ':' + event.target.id)
      console.log(event)
    },
    drop: function (event) {
      event.preventDefault()
      // event.target.appendChild(dom)
      var data = event.dataTransfer.getData('text/plain').split(':')

      var isWidget = data[0] === 'select-item'
      var nodeCopy = document.getElementById(data[1]).cloneNode(true)
      nodeCopy.id = 'component' + event.target.id
      // clean target space if needed
      if (isWidget) {
        if (event.target.nodeName === 'IMG') {
          event.target.parentNode.appendChild(nodeCopy)
          this.removeNode(event.target)
        } else {
          event.target.appendChild(nodeCopy)
        }
      } else {
        if (event.target.nodeName !== 'IMG') {
          this.removeNode(document.getElementById(event.target.id))
          event.target.appendChild(nodeCopy)
        }
      }
      event.stopPropagation()
      return false
    },
    allowDrop: function (event) {
      event.preventDefault()
    },
    removeNod: function (node) {
      node.parentNode.removeChild(node)
    }
  },
  data () {
    return {
      projectdatas: [
        {
          id: 1,
          name: '葡萄'
        },
        {
          id: 2,
          name: '芒果'
        },
        {
          id: 3,
          name: '木瓜'
        },
        {
          id: 4,
          name: '榴莲'
        }
      ],
      peopledata: [
        {
          id: 1,
          name: '小颖'
        },
        {
          id: 2,
          name: 'hover'
        },
        {
          id: 3,
          name: '空巢青年三 '
        },
        {
          id: 3,
          name: '一丢丢'
        }
      ]
    }
  }
}
</script>
