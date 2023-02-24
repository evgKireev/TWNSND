import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../@types/constant'
import {
  ParamsUrlPayloadType,
  SentMailRegisterUser,
  SignInGooglePayloadType,
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
  getRegisterUserGoogle,
  getRegistrationConfirmUser,
  setEmail,
  setUserId,
} from '../SignUser/signUpSlice'
import {
  setConfirmStatusUser,
  setSignInStatusUser,
  setSignInStatusUserGoogle,
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
  if (ok) {
    yield put(setStatusUser('fullfilled'))
    yield put(setUserId(data.userId))
    callback()
  } else {
    yield put(setStatusUser('regected'))
    toast.error('Указанный Email адрес уже занят')
  }
}

function* sentMailRegistrUser(actions: PayloadAction<SentMailRegisterUser>) {
  yield put(setConfirmStatusUser('pending'))
  const { ok } = yield call(API.sentEmailRegisterUser, actions.payload)
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
    callback('/')
    yield put(setSignInStatusUser('fullfilled'))
  } else {
    yield put(setSignInStatusUser('rejected'))
    if (data.error_description === 'Email not confirmed') {
      yield put(setUserId(data.user_id))
      yield put(setEmail(data.email))
      callback('/confirm/password')
    } else if (data.error_description === 'Invalid username or password') {
      toast.error('Неверный пароль или email')
    } else if (data.error_description === 'Email not confirmed') {
      toast.error('Email не подтвержден')
    }
  }
}

function* registerUserGoogleWorker(
  actions: PayloadAction<SignInGooglePayloadType>
) {
  const { data: dataSignGoogle, callback } = actions.payload
  const { localEmail, localPassword } = dataSignGoogle
  if (!localEmail && !localPassword) {
    yield put(setSignInStatusUserGoogle('pending'))
    const { ok, data } = yield call(API.registerUserGoogle, dataSignGoogle)
    if (ok) {
      yield put(setSignInStatusUserGoogle('fullfilled'))
      localStorage.setItem(ACCESS_TOKEN_KEY, data?.access_token)
      localStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh_token)
      yield put(setRegisterUser(true))
      callback('/')
    } else {
      yield put(setSignInStatusUserGoogle('regected'))
      if (data.error_description === 'local_account_exist') {
        yield put(setEmail(data.Email))
        callback('/check/password/social')
      }
    }
  } else {
    yield put(setSignInStatusUserGoogle('pending'))
    const { ok, data } = yield call(API.registerUserGoogle, dataSignGoogle)
    if (ok) {
      yield put(setSignInStatusUserGoogle('fullfilled'))
      localStorage.setItem(ACCESS_TOKEN_KEY, data?.access_token)
      localStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh_token)
      yield put(setRegisterUser(true))
      callback('/')
    } else {
      yield put(setSignInStatusUserGoogle('regected'))
      if (data.error_description === 'wrong_local_email') {
        toast.error('Неверный e-mail')
      } else if (data.error_description === 'wrong_local_password') {
        toast.error('Неверный пароль')
      } else {
        toast.error('Что-то пошло не так. Попробуйте еще раз!')
      }
    }
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
  yield all([takeLatest(getRegisterUserGoogle, registerUserGoogleWorker)])
}
