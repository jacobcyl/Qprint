export default {
  // 获取当前模板所有页面
  getPages: function (tplId, cb, errorCb) {
    let allPages = localStorage.getItem('pages')
    let pages = []
    if (allPages) {
      allPages = JSON.parse(allPages)
      let pagesObj = allPages.find(t => t.tplId === tplId)
      if (pagesObj) {
        pages = pagesObj.pages
        if (pages === undefined) errorCb('页面数据错误')
        else cb(pages)
      }
    }
    cb(pages)
  },

  // 创建一个新的页面
  addPage: function (tplId, page, cb, errorCb) {
    let allPages = localStorage.getItem('pages')

    let time = Date.now()
    let pageId = 'page_' + time
    let newPage = {
      ...page,
      tplId,
      id: pageId,
      createdAt: time
    }

    if (allPages) {
      allPages = JSON.parse(allPages)
      let inserted = false
      allPages.forEach((e, i) => {
        if (e.tplId === tplId) {
          allPages[i].pages.push(newPage)
          inserted = true
        }
      })
      if (!inserted) {
        allPages.push({
          tplId,
          pages: [
            newPage
          ]
        })
      }
    } else {
      allPages = [
        {
          tplId,
          pages: [
            newPage
          ]
        }
      ]
    }
    try {
      localStorage.setItem('pages', JSON.stringify(allPages))
      setTimeout(() => {
        cb(newPage)
      }, 500)
    } catch (e) {
      errorCb('保存失败')
    }
  }
}
