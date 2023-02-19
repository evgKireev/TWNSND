import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  ParamsUrlPayloadType,
  SentMailRegisterUser,
  UserType,
  UserTypePayloadType,
} from '../../@types/types/auth'
import {
  getMailRegisterUser,
  getRegisterUser,
  getRegistrationConfirmUser,
  setUserId,
} from '../SignUser/signUpSlice'
import { setStatusUser } from '../SignUser/statusSlice'
import API from '../utils/API'

function* registerUserWorker(actions: PayloadAction<UserTypePayloadType>) {
  yield put(setStatusUser('pending'))
  const { data: registerUserData, callback } = actions.payload
  const { ok, data, problem } = yield call(
    API.registerUserMail,
    registerUserData
  )
  if (ok) {
    yield put(setStatusUser('fullfilled'))
    yield put(setUserId(data.UserId))
    callback()
  } else {
    yield put(setStatusUser('regected'))
    console.log(problem) //TODO записать оштбку майла в стэйт
  }
}

function* sentMailRegistrUser(actions: PayloadAction<SentMailRegisterUser>) {
  yield put(setStatusUser('pending'))
  const { ok, data, problem } = yield call(
    API.sentEmailRegisterUser,
    actions.payload
  )
  if (ok) {
    yield put(setStatusUser('fullfilled'))
  } else {
    yield put(setStatusUser('regected'))
  }
}

function* confirmRegistrUser(actions: PayloadAction<ParamsUrlPayloadType>) {
  yield put(setStatusUser('pending'))
  const { data: confirmRegisterUser, callback } = actions.payload
  const { ok, data, problem } = yield call(
    API.activateUser,
    confirmRegisterUser
  )
  if (ok) {
    yield put(setStatusUser('fullfilled'))
    callback()
  } else {
    yield put(setStatusUser('regected'))
  }
}

export default function* userSaga() {
  yield all([takeLatest(getRegisterUser, registerUserWorker)])
  yield all([takeLatest(getMailRegisterUser, sentMailRegistrUser)])
  yield all([takeLatest(getRegistrationConfirmUser, confirmRegistrUser)])
}
