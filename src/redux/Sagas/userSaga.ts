import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  ParamsUrlPayloadType,
  SentMailRegisterUser,
  UserTypePayloadType,
} from '../../@types/types/auth'
import {
  getMailRegisterUser,
  getRegisterUser,
  getRegistrationConfirmUser,
  setUserId,
} from '../SignUser/signUpSlice'
import {
  setConfirmStatusUser,
  setStatusUser,
  setSuccessStatusUser,
} from '../SignUser/statusSlice'
import API from '../utils/API'

function* registerUserWorker(actions: PayloadAction<UserTypePayloadType>) {
  yield put(setStatusUser('pending'))
  const { data: registerUserData, callback } = actions.payload
  const { ok, data, problem } = yield call(
    API.registerUserMail,
    registerUserData
  )
  console.log(data)
  if (ok) {
    yield put(setStatusUser('fullfilled'))
    yield put(setUserId(data.userId))
    callback()
  } else {
    yield put(setStatusUser('regected'))
    console.log(problem) //TODO записать оштбку майла в стэйт
  }
}

function* sentMailRegistrUser(actions: PayloadAction<SentMailRegisterUser>) {
  yield put(setConfirmStatusUser('pending'))
  const { ok, data, problem } = yield call(
    API.sentEmailRegisterUser,
    actions.payload
  )
  if (ok) {
    yield put(setConfirmStatusUser('fullfilled'))
  } else {
    yield put(setConfirmStatusUser('regected'))
  }
}

function* confirmRegistrUser(actions: PayloadAction<ParamsUrlPayloadType>) {
  yield put(setSuccessStatusUser('pending'))
  const { data: confirmRegisterUser, callback } = actions.payload
  const { ok, data, problem } = yield call(
    API.activateUser,
    confirmRegisterUser
  )
  if (ok) {
    yield put(setSuccessStatusUser('fullfilled'))
    callback()
  } else {
    yield put(setSuccessStatusUser('regected'))
  }
}

export default function* userSaga() {
  yield all([takeLatest(getRegisterUser, registerUserWorker)])
  yield all([takeLatest(getMailRegisterUser, sentMailRegistrUser)])
  yield all([takeLatest(getRegistrationConfirmUser, confirmRegistrUser)])
}
