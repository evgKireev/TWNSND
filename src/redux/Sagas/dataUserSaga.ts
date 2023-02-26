import { toast } from 'react-toastify'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { ACCESS_TOKEN_KEY } from '../../@types/constant'
import { setStatusDataUser } from '../SignUser/statusSlice'
import { getUser, setUser } from '../User/userSlice'
import API from '../utils/API'

function* getDataUserWorker() {
  const token =
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
    ''
  const { ok, data } = yield call(API.getUserData, token)
  yield put(setStatusDataUser('pending'))
  if (ok) {
    console.log(data)
    yield put(setStatusDataUser('fullfilled'))
    yield put(setUser(data))
  } else {
    yield put(setStatusDataUser('regected'))
    toast.error('Что-то пошло не так. Перезагрузите страницу.')
  }
}

export default function* userSaga() {
  yield all([takeLatest(getUser, getDataUserWorker)])
}
