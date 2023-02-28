import { all, put, takeLatest } from 'redux-saga/effects'
import { setStatusDataUser } from '../SignUser/statusSlice'
import { getUser, setUser } from '../User/userSlice'
import API from '../utils/API'
import callCheckingUser from './callCheckingUser'

function* getDataUserWorker() {
  const { data, ok } = yield callCheckingUser(API.getUserData)
  yield put(setStatusDataUser('pending'))
  if (ok && data) {
    yield put(setStatusDataUser('fullfilled'))
    yield put(setUser(data))
  } else {
    yield put(setStatusDataUser('regected'))
  }
}

export default function* userSaga() {
  yield all([takeLatest(getUser, getDataUserWorker)])
}
