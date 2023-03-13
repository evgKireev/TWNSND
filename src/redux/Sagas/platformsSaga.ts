import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GetPlatformsPayload } from '../../@types/types/platforms'
import { getPlatforms, setPlatforms } from '../Platforms/platformsSlice'
import { setStatusPlatforms } from '../Platforms/statusSlice'
import API from '../utils/API'

function* getPlatformsWorker(actions: PayloadAction<GetPlatformsPayload>) {
  yield put(setStatusPlatforms('pending'))
  const { data: getPlatformsData } = actions.payload
  const { data, status } = yield call(API.getPlatforms, getPlatformsData)
  if (status === 200) {
    yield put(setStatusPlatforms('fullfilled'))
    yield put(setPlatforms(data))
  } else {
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
    yield put(setStatusPlatforms('regected'))
  }
}

export default function* platformsSaga() {
  yield all([takeLatest(getPlatforms, getPlatformsWorker)])
}
