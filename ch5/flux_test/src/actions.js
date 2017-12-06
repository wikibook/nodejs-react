import {appDispatcher} from './appDispatcher.js'
// 이번에 사용할 Action
export const ActionType = {
  CHANGE_NAME: 'CHANGE_NAME',
  SUBMIT_NAME: 'SUBMIT_NAME'
}
// Action을 생성하고 ... Dispatcher에 정보를 전달합니다.
export const Actions = {
  changeName: (name) => {
    if (name === null) return
    appDispatcher.dispatch({
      actionType: ActionType.CHANGE_NAME,
      value: name})
  },
  submitName: () => {
    appDispatcher.dispatch({
      actionType: ActionType.SUBMIT_NAME})
  }
}