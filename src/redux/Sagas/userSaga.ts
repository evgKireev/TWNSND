import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, takeLatest } from 'redux-saga/effects'
import { UserPayloadType } from '../../@types/types/auth'
import { registerUser } from '../SignUser/signUpSlice'
import API from '../utils/API'

function* registerUserWorker(actions: PayloadAction<UserPayloadType>) {
  const { data: registerUser, callback } = actions.payload
  const { ok, data, problem } = yield call(API.registerUserMail, registerUser)
  if (ok) {
    console.log(data)
    callback()
  } else {
    callback()
    console.log(problem)
  }
}

export default function* userSaga() {
  yield all([takeLatest(registerUser, registerUserWorker)])
}
