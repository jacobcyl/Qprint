<style scoped>
  .ui-draggable {
    background-color: #5bc0de;
    display: inline-block;
    text-align: center;
    border-radius: 3px;
    margin-right: 10px;
    cursor:pointer;
    padding: 6px 20px;
    color: #fff;
  }
  .widget-container {
    position: relative;
  }
  .widget-toolbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 35px;
    padding: 0px;
    border-bottom: solid 1px #d7dde4;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .widget {
    margin-bottom: 10px;
  }
  .widget-list {
    padding: 10px;
    position: absolute;
    top: 35px;
    bottom: 0;
    width: 100%;
  }
  .btn-add-widget {
    border: 0;
  }
</style>

<template>
  <div class="widget-container">
    <div class="widget-toolbar">
      <span style="flex: 1; margin-left: 16px;">
        文本控件
      </span>
      <Button class="btn-add-widget" @click="handleOpenModal('add')"  title="点击创建一个文本控件" icon="plus"></Button>
    </div>
    <div v-if="widgets.length > 0" class="widget-list">
      <Row>
        <Col span="24">
          <div v-for="widget in widgets" :id="widget.id" @click="handleOpenModal('edit', widget)" data-type="widget" class='ui-draggable widget' draggable='true' v-draggable="{droparea:droppableArea, handleDrop:handleDrop}">{{ widget.text }}</div>
        </Col>
      </Row>
    </div>

    <Modal class="modal" v-model="modalWidget" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>{{ modalTitle }}</span>
      </p>
      <div>
        <Input ref="wname" v-model="currWidget.name" placeholder="请输入控件名称" >
          <span slot="prepend">控件名称</span>
          <span slot="append">
            <Poptip trigger="hover" placement="right">
              <Icon type="information-circled"></Icon>
              <div slot="content">
                该控件名称用于辨别控件，不会显示在打印页面
              </div>
            </Poptip>
          </span>
        </Input>
        <br>
        <Input ref="wtext" v-model="currWidget.text" placeholder="请输入显示的文本">
          <span slot="prepend">显示文本</span>
           <span slot="append">
            <Poptip trigger="hover" placement="right">
              <Icon type="information-circled"></Icon>
              <div slot="content">
                该文本为最终显示在打印页面的文本
              </div>
            </Poptip>
          </span>
        </Input>
      </div>
      <div slot="footer">
        <Button type="warning" size="large" long @click="handleSaveWidget">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    props: {
      widgets: {
        type: Array,
        required: true
      },
      tplid: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        droppableArea: 'page',
        modalWidget: false,
        widgetAction: 'add', // add or edit
        currWidget: {
          id: '',
          name: '',
          text: ''
        }
      }
    },
    computed: {
      modalTitle: function () {
        if (this.widgetAction === 'add') {
          return '新建文本控件'
        } else if (this.widgetAction === 'edit') {
          return '编辑文本控件'
        }
      }
    },
    methods: {
      ...mapActions({
        'addWidget': 'widgets/add',
        'updateWidget': 'widgets/update'
      }),
      handleOpenModal: function (action, widget) {
        let i = ['add', 'edit'].indexOf(action)
        if (i > -1) {
          this.widgetAction = action
          this.modalWidget = true
          if (i === 0) {
            this.currWidget = {
              id: '',
              name: '',
              text: ''
            }
          } else if (widget) {
            this.currWidget = {...widget}
          }
        } else {
          this.$Message.error('参数错误')
        }
      },
      handleSaveWidget: function () {
        if (this.currWidget.name === '') {
          this.$refs.wname.focus()
          this.$Message.error('控件名称不能为空')
          return
        }
        if (this.currWidget.text === '') {
          this.$refs.wtext.focus()
          this.$Message.error('控件文本不能为空')
          return
        }
        if (this.widgetAction === 'add') {
          this.addWidget({
            tplId: this.tplid,
            widget: this.currWidget
          })
        } else {
          this.updateWidget({
            tplId: this.tplid,
            widget: this.currWidget
          })
        }
        this.modalWidget = false
      },
      handleDrop (evt, data) {
        console.log('dropped')
      }
    }
  }
</script>
