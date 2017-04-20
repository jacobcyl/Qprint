export default {
  getAll: function (tplId, cb, errorCb) {
    let widgets = this.getWidgets(tplId)
    cb(widgets)
  },

  add: function (tplId, widget, cb, errorCb) {
    const time = Date.now()
    let widgetId = 'widget_' + time
    let newWidget = {
      id: widgetId,
      createdAt: time,
      ...widget
    }
    let widgets = this.getWidgets(tplId)
    widgets.push(newWidget)
    this.storeData(tplId, widgets)
    cb(newWidget)
  },

  update: function (tplId, widget, cb, errorCb) {
    let widgets = this.getWidgets(tplId)
    widgets.forEach((e, i) => {
      if (e.id === widget.id) {
        widgets[i] = {
          ...widgets[i],
          ...widget
        }
      }
    })
    this.storeData(tplId, widgets)
    cb(widget)
  },
  storeData: function (tplId, widgets) {
    localStorage.setItem(this.generateKey(tplId), JSON.stringify(widgets))
  },
  getWidgets: function (tplId) {
    const widgetStr = localStorage.getItem(this.generateKey(tplId))
    let widgets = []
    if (widgetStr) {
      widgets = JSON.parse(widgetStr)
    }
    return widgets
  },

  generateKey: function (tplId) {
    return 'widgets_' + tplId
  }
}
