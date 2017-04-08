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
    align-self: left;
  }
  .toolbar .toolbar-container .toolbar-left a.name {
    width: 218px;
    text-align: left;
    margin-left: 10px;
    font-size: 14px;
    overflow: hidden;
    border-radius: 0px;
}
  .toolbar-container .toolbar-left, .toolbar-container .toolbar-right{
    white-space: nowrap;
  }
  .toolbar-container a{
    font-size: 20px;
    width: 30px;
    height: 38px;
    line-height: 38px;
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
    height: 22px;
    margin: 7px 2px;
}
  .btn-name {
    font-size: 14px;
    line-height: 20px;
  }
</style>
<template>
  <div id="toolbar" class="toolbar">
    <div class="toolbar-container">
      <div class="toolbar-left">
        <a class="name">{{ title }}</a>
        <router-link :to="{name: 'home'}">
          <Icon type="arrow-return-left" size="20"></Icon>
        </router-link>
        <a class="divider"></a>
        <template v-for="btn in buttons">
          <a>
            <Tooltip :content="btn.name">
              <Icon :type="btn.icon" size="20"></Icon>
              <span class="btn-name" v-show="showIconName">{{ btn.name }}</span>
            </Tooltip>
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
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
          name: '撤销'
        },
        redo: {
          icon: 'ios-redo',
          name: '重做'
        }
      }
    }
  }
}
</script>
