export default {
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
  },
  // compare the two object
  compareObj: function (a, b) {
    var aProps = Object.getOwnPropertyNames(a)
    var bProps = Object.getOwnPropertyNames(b)

    if (aProps.length !== bProps.length) {
      return false
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i]

      if (a[propName] !== b[propName]) {
        return false
      }
    }
    return true
  },
  initHistory: function (tplId, pageId, cb) {
    let present = []
    const allComponents = this.fetchData(tplId)
    if (allComponents) {
      let currPageComponents = allComponents.find(c => c.pageId === pageId)
      if (currPageComponents) present = currPageComponents.components
    }

    let history = {
      past: [],
      present: present,
      future: []
    }
    this.storeHistory(history)
    cb(history)
  },
  getHistory: function () {
    let history = sessionStorage.getItem('currH')
    if (history) return JSON.parse(history)
    else return null
  },
  storeHistory: function (history) {
    sessionStorage.setItem('currH', JSON.stringify(history))
  },
  flushHistory: function (cb) {
    sessionStorage.removeItem('currH')
    cb('flush history successfully')
  },
  historyRecord: function (newPresent, previousState) {
    let history = this.getHistory()
    if (history) {
      const {past, present} = history

      if (this.compareObj(present, newPresent)) {
        return history
      }

      history = {
        past: [ ...past, present ],
        present: newPresent,
        future: []
      }
    } else {
      history = {
        past: [previousState],
        present: newPresent,
        future: []
      }
    }
    // 保存历史记录
    this.storeHistory(history)
    return history
  },
  // 撤销操作
  undo: function (tplId, pageId, cb, errorCb) {
    let history = this.getHistory()
    if (history) {
      const { past, present, future } = history
      if (past.length === 0) {
        errorCb('没有更多历史记录')
        return
      }
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      history = {
        past: newPast,
        present: previous,
        future: [ present, ...future ]
      }

      const allComponents = this.fetchData(tplId)
      if (allComponents) {
        allComponents.forEach((e, i) => {
          if (e.pageId === pageId) {
            allComponents[i].components = previous
            this.storeData(this.generateKey(tplId), allComponents)
            // 保存历史记录
            this.storeHistory(history)
            cb(allComponents, history)
            return true
          }
        })
      }
    }
    return false
  },
  // 恢复撤销
  redo: function (tplId, pageId, cb, errorCb) {
    let history = this.getHistory()
    if (history) {
      const { past, present, future } = history
      if (future.length === 0) {
        errorCb('已经是最新状态')
        return
      }
      const next = future[0]
      const newFuture = future.slice(1)
      history = {
        past: [ ...past, present ],
        present: next,
        future: newFuture
      }

      const allComponents = this.fetchData(tplId)
      if (allComponents) {
        allComponents.forEach((e, i) => {
          if (e.pageId === pageId) {
            allComponents[i].components = next
            this.storeData(this.generateKey(tplId), allComponents)
            // 保存历史记录
            this.storeHistory(history)
            setTimeout(function () {
              cb(allComponents, history)
            }, 100)
            return true
          }
        })
      }
    }
    return false
  }
}
