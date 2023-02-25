import { all } from 'redux-saga/effects'
import dataUserSaga from './dataUserSaga'
import userSaga from './userSaga'
export function* rootSaga() {
  yield all([userSaga(), dataUserSaga()])
}
