/**
 * Mocking client-server processing
 */
const _templates = [
  {
    'id': '1',
    'title': 'The table of bank',
    'pages': [
      {
        id: '1',
        order: 1,
        name: 'page-1',
        components: [
          {
            id: '1',
            width: '100mm',
            heiht: '30mm',
            left: '100mm',
            top: '100mm',
            fontSize: '14px',
            widgetId: 'widget1',
            text: ''
          }
        ]
      },
      {
        id: '2',
        order: 2,
        name: 'page-2',
        components: [
          {
            id: '1',
            width: '100mm',
            heiht: '30mm',
            left: '10mm',
            top: '200mm',
            fontSize: '14px',
            widgetId: 'widget1',
            text: ''
          }
        ]
      }
    ]
  },
  {'id': '2', 'title': 'H&M T-Shirt White', 'pages': []},
  {'id': '3', 'title': '银行贷款资料', 'pages': []},
  {'id': '4', 'title': '测试模板1', 'pages': []},
  {'id': '5', 'title': '测试模板2', 'pages': []},
  {'id': '6', 'title': '测试模板3', 'pages': []}
]

export default {
  getAll (cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.1 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb(_templates)
        : errorCb && errorCb('请求错误')
    }, 1000)
  },

  get (id, cb, errorCb) {
    const template = _templates.find(t => t.id === id)
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.1 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb(template)
        : errorCb && errorCb('请求错误')
    }, 1000)
  },

  getPages (tplId, cb, errorCb) {
    const template = _templates.find(t => t.id === tplId)

    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb(template.pages)
        : errorCb && errorCb('请求错误')
    }, 1000)
  }
}
