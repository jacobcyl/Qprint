/**
 * Mocking client-server processing
 */
const _templates = [
  {'id': '1', 'title': 'The table of bank', 'pages': 10},
  {'id': '2', 'title': 'H&M T-Shirt White', 'pages': 5},
  {'id': '3', 'title': '银行贷款资料', 'pages': 8},
  {'id': '4', 'title': '测试模板1', 'pages': 1},
  {'id': '5', 'title': '测试模板2', 'pages': 1},
  {'id': '6', 'title': '测试模板3', 'pages': 13}
]

export default {
  getAll (cb) {
    setTimeout(() => cb(_templates), 100)
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
