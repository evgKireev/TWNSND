import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { all, put, takeLatest } from 'redux-saga/effects'
import { ChangeUserPayload } from '../../@types/types/user'
import { setStatusDataUser, setStatusChangeUser } from '../SignUser/statusSlice'
import { changeUser, getUser, setUser } from '../User/userSlice'
import API from '../utils/API'
import callCheckingUser from './callCheckingUser'

function* getDataUserWorker() {
  const { data, status } = yield callCheckingUser(API.getUserData)
  yield put(setStatusDataUser('pending'))
  if (status === 200) {
    yield put(setStatusDataUser('fullfilled'))
    yield put(setUser(data))
  } else {
    yield put(setStatusDataUser('regected'))
  }
}

function* changeUserWorker(actions: PayloadAction<ChangeUserPayload>) {
  yield put(setStatusChangeUser('pending'))
  const { data: changeUserData, callback } = actions.payload
  const { status } = yield callCheckingUser(API.changeUserData, changeUserData)
  if (status === 200) {
    yield put(setStatusChangeUser('fullfilled'))
    callback()
  } else {
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
    yield put(setStatusChangeUser('regected'))
  }
}

export default function* userSaga() {
  yield all([takeLatest(getUser, getDataUserWorker)])
  yield all([takeLatest(changeUser, changeUserWorker)])
}
