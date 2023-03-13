import { all } from 'redux-saga/effects'
import dataUserSaga from './dataUserSaga'
import userSaga from './userSaga'
import platformsSaga from './platformsSaga'

export function* rootSaga() {
  yield all([userSaga(), dataUserSaga(), platformsSaga()])
}
