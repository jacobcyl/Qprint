export default function vuexUndo (option) {
  return store => {
    let prevState = _.cloneDeep(store.state)
    store.subscribe((mutation, state) => {
      let nextState = _.cloneDeep(state)
      // 比较 prevState 和 nextState...

      // 保存状态，用于下一次 mutation
      prevState = nextState
    })
  }
}
