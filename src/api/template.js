/**
 * Mocking client-server processing
 */
export default {
  getAll (cb, errorCb) {
    let templates = localStorage.getItem('templates')
    if (templates) {
      templates = JSON.parse(templates)
    } else {
      templates = []
    }
    setTimeout(() => {
      cb(templates)
    }, 500)
    // setTimeout(() => {
    //   // simulate random checkout failure.
    //   (Math.random() > 0.1 || navigator.userAgent.indexOf('PhantomJS') > -1)
    //     ? cb(_templates)
    //     : errorCb && errorCb('请求错误')
    // }, 1000)
  },

  get (id, cb, errorCb) {
    let templates = localStorage.getItem('templates')
    if (templates) {
      templates = JSON.parse(templates)
      let template = templates.find(t => t.id === id)
      if (template) {
        cb(template)
        // setTimeout(() => {
        //   cb(template)
        // }, 500)
      } else {
        errorCb('找不到该模板')
      }
    } else {
      errorCb('找不到该模板')
    }
  },

  addTemplate (template, cb, errorCb) {
    let templates = localStorage.getItem('templates')
    let time = Date.now()
    let templateId = 'tpl_' + time
    template = {
      ...template,
      id: templateId,
      createdAt: time
    }
    if (templates) {
      templates = JSON.parse(templates)
      if (templates.find(t => t.name === template.name)) {
        setTimeout(() => {
          errorCb('该模板名已存在')
        }, 500)
        return
      }
    } else {
      templates = []
    }
    templates.unshift(template)
    localStorage.setItem('templates', JSON.stringify(templates))
    cb(template)
  }
}
