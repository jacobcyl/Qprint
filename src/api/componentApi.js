export default {
  // 获取当前模板页面所有控件
  // [
  //  {
  //    pageId: pageId,
  //    components: [
  //      {
  //        id,
  //        ...
  //      }
  //    ]
  //  }
  //  ...
  // ]
  getComponents: function (tplId, cb, errorCb) {
    let components = this.fetchData(tplId)
    if (!components) {
      components = []
    }
    cb(components)
  },

  // 更新一个控件
  updateComponent: function (tplId, pageId, component, cb, errorCb) {
    let components = this.fetchData(tplId)
    if (components) {
      components.forEach((e, i) => {
        if (e.pageId === pageId) {
          components[i].components.forEach((se, si) => {
            if (se.id === component.id) {
              components[i].components[si] = {
                ...components[i].components[si],
                ...component
              }
              this.storeData(this.generateKey(tplId), components)
              // 保存成功
              cb(component)
              return
            }
          })
        }
      })
    }
    errorCb('component 数据错误')
  },

  // 添加一个控件
  addComponent: function (tplId, pageId, component, cb, errorCb) {
    let components = this.fetchData(tplId)

    let time = Date.now()
    let componentId = 'component_' + time
    let newComponent = {
      ...component,
      id: componentId,
      createdAt: time
    }

    if (components) {
      let inserted = false
      components.forEach((e, i) => {
        if (e.pageId === pageId) {
          components[i].components.push(newComponent)
          inserted = true
        }
      })
      if (!inserted) {
        components.push({
          pageId,
          components: [newComponent]
        })
      }
    } else {
      components = [{
        pageId,
        components: [newComponent]
      }]
    }
    try {
      this.storeData(this.generateKey(tplId), components)
      // localStorage.setItem(componentKey, JSON.stringify(components))
      cb(newComponent)
    } catch (e) {
      errorCb('保存失败')
    }
  },

  generateKey: function (tplId) {
    return 'components_' + tplId
  },
  fetchData: function (tplId) {
    let components = localStorage.getItem(this.generateKey(tplId))
    if (components) return JSON.parse(components)
    else return null
  },
  storeData: function (key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }
}
