import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../@types/constant'
import {
  ParamsUrlPayloadType,
  SentMailRegisterUser,
  SignInPayloadType,
  UserTypePayloadType,
} from '../../@types/types/auth'
import {
  getSignInUser,
  logoutUser,
  setRegisterUser,
} from '../SignUser/signInSlice'
import {
  getMailRegisterUser,
  getRegisterUser,
  getRegistrationConfirmUser,
  setUserId,
} from '../SignUser/signUpSlice'
import {
  setConfirmStatusUser,
  setSignInStatusUser,
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

function* signInUserWorker(actions: PayloadAction<SignInPayloadType>) {
  yield put(setSignInStatusUser('pending'))
  const { data: singInUserData, rememberPassword, callback } = actions.payload
  const { data, ok, problem } = yield call(API.signInUser, singInUserData)
  if (ok && data) {
    if (rememberPassword) {
      localStorage.setItem(ACCESS_TOKEN_KEY, data?.access_token)
      localStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh_token)
    } else {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, data?.access_token)
      sessionStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh_token)
    }
    yield put(setRegisterUser(true))
    callback()
    yield put(setSignInStatusUser('fullfilled'))
  } else {
    yield put(setSignInStatusUser('rejected'))
    //TODO записать ошибку в стэйт и вывести
  }
}

function* logoutUserWorker() {
  yield put(setRegisterUser(false))
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
}

export default function* userSaga() {
  yield all([takeLatest(getRegisterUser, registerUserWorker)])
  yield all([takeLatest(getMailRegisterUser, sentMailRegistrUser)])
  yield all([takeLatest(getRegistrationConfirmUser, confirmRegistrUser)])
  yield all([takeLatest(getSignInUser, signInUserWorker)])
  yield all([takeLatest(logoutUser, logoutUserWorker)])
}
