import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { all, put, takeLatest } from 'redux-saga/effects'
import { ChangeUserData } from '../../@types/types/user'
import { setStatusDataUser } from '../SignUser/statusSlice'
import { changeUser, getUser, setUser } from '../User/userSlice'
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

function* changeUserWorker(actions: PayloadAction<ChangeUserData>) {
  yield put(setStatusDataUser('pending'))
  const { status, data } = yield callCheckingUser(
    API.changeUserData,
    actions.payload
  )
  if (status === 200) {
    yield put(setStatusDataUser('fullfilled'))
    yield put(getUser())
  } else if (status === 404) {
    if (data.error_message === 'user_not_found') {
      toast.error('Пользователь не был найден')
      yield put(setStatusDataUser('regected'))
    }
  } else {
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
    yield put(setStatusDataUser('regected'))
  }
}

export default function* userSaga() {
  yield all([takeLatest(getUser, getDataUserWorker)])
  yield all([takeLatest(changeUser, changeUserWorker)])
}
