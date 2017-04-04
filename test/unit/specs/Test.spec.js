import Vue from 'vue'
import MyComponent from '@/components/Test.vue'
// 挂载元素并返回已渲染的文本的工具函数 
function getRenderedText (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()
  return vm.$el.textContent
}
describe('MyComponent', () => {
  it('render correctly with different props', () => {
    expect(getRenderedText(MyComponent, {
      msg: 'Hello'
    })).toBe('Hello')
    expect(getRenderedText(MyComponent, {
      msg: 'Bye'
    })).toBe('Bye')
  })
})