<style>
  .tab-container, .tab-container > .ivu-tabs-card{
    height: 100%;
  }
  .tab-container > .ivu-tabs-card > .ivu-tabs-content {
      height: 100%;
      margin-top: -16px;
  }

  .tab-container > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
      background: #fff;
      padding: 16px;
  }

  .tab-container > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
      border-color: transparent;
  }

  .tab-container > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
      border-color: #fff;
  }
  .left-panel {
    position: fixed;
    left: 0;
    top: 38px;
    box-sizing: border-box;
    bottom: 0px;
    width: 280px;
    z-index: 4;
    border-right: 1px solid #aaaaaa;
    transition: all 0.15s ease-in-out;
  }
</style>
<template>
    <div class="left-panel">
        <div class="tab-container" style="background: #e3e8ee;padding:16px;">
            <Tabs type="card">
                <Tab-pane label="标签一">标签一的内容</Tab-pane>
                <Tab-pane label="标签二">标签二的内容</Tab-pane>
                <Tab-pane label="标签三">标签三的内容</Tab-pane>
            </Tabs>
        </div>
      </div>
</template>
<script>
    export default {
    }
</script>
