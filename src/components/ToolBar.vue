<style scoped>
  .toolbar-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background: #e3e8ea;
    border-bottom: 1px solid #bbbbbb;
    padding: 0 10px;
    height: 38px;
    display: flex;
    align-items: center;
  }
  .toolbar-left{
    display: flex;
  }
  .toolbar .toolbar-container .toolbar-left span {
    width: 218px;
    text-align: left;
    margin-left: 10px;
    font-size: 14px;
    overflow: hidden;
    border-radius: 0px;
    display: inline-flex;
    align-items: center;
}
  .toolbar-container .toolbar-left, .toolbar-container .toolbar-right{
    white-space: nowrap;
  }
  .toolbar-container a{
    font-size: 20px;
    width: 30px;
    /*height: 38px;*/
    /*line-height: 38px;*/
    margin: 0 3px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    opacity: 0.6;
    color: #333333;
  }
  .toolbar-container a:hover{
    background: #ccc;
  }
  .toolbar .toolbar-container .toolbar-left a.divider, .toolbar .toolbar-container .toolbar-right a.divider {
    display: inline-block;
    width: 1px;
    background: #bbbbbb;
    /*height: 22px;*/
    margin: 7px 2px;
  }
  .btn-name {
    font-size: 14px;
    /*line-height: 20px;*/
  }
</style>
<template>
  <div id="toolbar" class="toolbar">
    <div class="toolbar-container">
      <div class="toolbar-left">
        <span class="name">{{ title }}</span>
        <router-link :to="{name: 'home'}">
          <Icon type="arrow-return-left" size="20"></Icon>
        </router-link>
        <a class="divider"></a>
        <Button-group>
          <template v-for="btn in buttons">
            <Tooltip :content="btn.title">
              <Button type="ghost" :icon="btn.icon" @click="performAction(btn.action)" :disabled="disabled(btn.name)"></Button>
            </Tooltip>
          </template>
        </Button-group>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    tplid: {
      type: String,
      required: true
    },
    pageid: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      showIconName: false,
      buttons: {
        undo: {
          icon: 'ios-undo',
          name: 'undo',
          title: '撤销',
          action: 'undo'
        },
        redo: {
          icon: 'ios-redo',
          name: 'redo',
          title: '重做',
          action: 'redo'
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      canUndo: 'components/canUndo',
      canRedo: 'components/canRedo'
    })
  },
  methods: {
    ...mapActions({
      undo: 'components/undo',
      redo: 'components/redo',
      flushHistory: 'components/flushHistory'
    }),
    performAction: function (action) {
      if (this.pageid === '') {
        console.info('当前未选中任何页面')
        return
      }
      switch (action) {
        case 'undo':
          console.log('undo')
          this.undo({tplId: this.tplid, pageId: this.pageid})
          break
        case 'redo':
          console.log('redo')
          this.redo({tplId: this.tplid, pageId: this.pageid})
          break
      }
    },
    disabled: function (btnName) {
      if (this.pageid === '') {
        return false
      }
      switch (btnName) {
        case 'undo':
          return !this.canUndo
        case 'redo':
          return !this.canRedo
        default:
          return false
      }
    }
  },
  beforeDestroy () {
    console.log('haha going to destroy')
  }
}
</script>
