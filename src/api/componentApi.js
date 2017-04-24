import historyApi from './historyApi'
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
    let updated = false

    // 记录操作前状态
    let previousState = []
    // 记录当前页面组件状态
    let currState = []

    if (components) {
      components.forEach((e, i) => {
        if (e.pageId === pageId) {
          components[i].components.forEach((se, si) => {
            if (se.id === component.id) {
              // 复制一份操作前的页面组件状态
              previousState = components[i].components.slice(0)
              components[i].components[si] = {
                ...components[i].components[si],
                ...component
              }
              // 复制一份操作后的页面状态
              currState = components[i].components.slice(0)
              this.storeData(this.generateKey(tplId), components)
              // 记录操作历史
              let history = historyApi.historyRecord(currState, previousState)
              // 调用更新成功回调函数
              cb(component, history)
              updated = true
            }
          })
        }
      })
    }
    if (!updated) errorCb('component 数据错误')
  },

  // 批量更新components
  updateComponents: function (tplId, pageId, components) {

  },

  // 添加一个控件
  addComponent: function (tplId, pageId, component, cb, errorCb) {
    let components = this.fetchData(tplId)

    let time = Date.now()
    let componentId = 'component_' + time
    // 记录操作前状态
    let previousState = []
    // 记录当前状态
    let currState = []

    let newComponent = {
      fontSize: '14pt',
      text: '',
      ...component,
      id: componentId,
      createdAt: time
    }

    let inserted = false
    if (components) {
      components.forEach((e, i) => {
        if (e.pageId === pageId) {
          // copy the old components state
          previousState = components[i].components.slice(0)
          components[i].components.push(newComponent)
          inserted = true
          // 当前页面状态
          currState = components[i].components.slice(0)
        }
      })
    }
    // 如果没有找到对应的页面并且插入该组件，则创建一个新的页面
    if (!inserted) {
      components.push({
        pageId,
        components: [newComponent]
      })
      // 当前页面状态
      currState = [{...newComponent}]
    }
    try {
      this.storeData(this.generateKey(tplId), components)
      // localStorage.setItem(componentKey, JSON.stringify(components))
      // 记录操作历史
      let history = historyApi.historyRecord(currState, previousState)
      cb(newComponent, history)
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
    else return []
  },
  storeData: function (key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }
  // // compare the two object
  // compareObj: function (a, b) {
  //   var aProps = Object.getOwnPropertyNames(a)
  //   var bProps = Object.getOwnPropertyNames(b)

  //   if (aProps.length !== bProps.length) {
  //     return false
  //   }

  //   for (var i = 0; i < aProps.length; i++) {
  //     var propName = aProps[i]

  //     if (a[propName] !== b[propName]) {
  //       return false
  //     }
  //   }
  //   return true
  // },
  // getHistory: function (tplId, pageId) {
  //   let currHistoryKey = sessionStorage.getItem('currHK')
  //   let currHK = 'tplId' + ':' + pageId
  //   // 如果不是当前页面的历史记录，则删除历史记录再重新开始记录
  //   if (currHistoryKey !== currHK) {
  //     sessionStorage.removeItem('currH')
  //     sessionStorage.setItem('currHK', currHK)
  //   }
  //   let history = sessionStorage.getItem('currH')
  //   if (history) return JSON.parse(history)
  //   else return null
  // },
  // storeHistory: function (tplId, pageId, history) {
  //   let currHK = 'tplId' + ':' + pageId
  //   sessionStorage.setItem('currHK', currHK)
  //   sessionStorage.setItem('currH', JSON.stringify(history))
  // },
  // flushHistory: function (cb) {
  //   sessionStorage.removeItem('currH')
  //   cb()
  // },
  // historyRecord: function (tplId, pageId) {
  //   const allComponents = this.fetchData(tplId)
  //   let newPresent = null
  //   if (allComponents) {
  //     let components = allComponents.find(c => c.pageId === pageId)
  //     if (components) {
  //       newPresent = components.components
  //     }
  //   }

  //   let history = this.getHistory(tplId, pageId)
  //   if (history) {
  //     const {past, present} = history

  //     if (this.compareObj(present, newPresent)) {
  //       return false
  //     }

  //     history = {
  //       past: [ ...past, present ],
  //       present: newPresent,
  //       future: []
  //     }
  //   } else {
  //     history = {
  //       past: [],
  //       present: newPresent,
  //       future: []
  //     }
  //   }
  //   // 保存历史记录
  //   this.storeHistory(tplId, pageId, history)
  // },
  // // 撤销操作
  // undo: function (tplId, pageId, cb, errorCb) {
  //   let history = this.getHistory(tplId, pageId)
  //   if (history) {
  //     const { past, present, future } = history
  //     if (past.length === 0) {
  //       errorCb('没有更多历史记录')
  //       return
  //     }
  //     const previous = past[past.length - 1]
  //     const newPast = past.slice(0, past.length - 1)
  //     history = {
  //       past: newPast,
  //       present: previous,
  //       future: [ present, ...future ]
  //     }

  //     const allComponents = this.fetchData(tplId)
  //     if (allComponents) {
  //       allComponents.forEach((e, i) => {
  //         if (e.pageId === pageId) {
  //           allComponents[i].components = previous
  //           this.storeData(this.generateKey(tplId), allComponents)
  //           // 保存历史记录
  //           this.storeHistory(tplId, pageId, history)
  //           cb(allComponents)
  //           return true
  //         }
  //       })
  //     }
  //   }
  //   return false
  // },
  // // 恢复撤销
  // redo: function (tplId, pageId, cb, errorCb) {
  //   let history = this.getHistory(tplId, pageId)
  //   if (history) {
  //     const { past, present, future } = history
  //     if (future.length === 0) {
  //       errorCb('已经是最新状态')
  //       return
  //     }
  //     const next = future[0]
  //     const newFuture = future.slice(1)
  //     history = {
  //       past: [ ...past, present ],
  //       present: next,
  //       future: newFuture
  //     }

  //     const allComponents = this.fetchData(tplId)
  //     if (allComponents) {
  //       allComponents.forEach((e, i) => {
  //         if (e.pageId === pageId) {
  //           allComponents[i].components = next
  //           this.storeData(this.generateKey(tplId), allComponents)
  //           // 保存历史记录
  //           this.storeHistory(tplId, pageId, history)
  //           cb(allComponents)
  //           return true
  //         }
  //       })
  //     }
  //   }
  //   return false
  // }
}
