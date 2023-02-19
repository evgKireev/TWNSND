import { ApiResponse } from 'apisauce'
import { toast } from 'react-toastify'
import { call, put } from 'redux-saga/effects'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../@types/constant'
import { logoutUser } from '../SignUser/signInSlice'
import API from '../utils/API'

export default function* callCheckingUser(api: any, ...rest: any) {
  const accessToken =
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
    ''
  const refreshToken =
    localStorage.getItem(REFRESH_TOKEN_KEY) ||
    sessionStorage.getItem(REFRESH_TOKEN_KEY) ||
    ''
  const res: ApiResponse<any> = yield call(api, accessToken, ...rest)
  if (res.status === 401) {
    const { data, ok }: ApiResponse<any> = yield call(
      API.getNewAccessToken,
      refreshToken
    )
    if (ok && data) {
      const { access } = data
      localStorage.setItem(ACCESS_TOKEN_KEY, access)
      const newResponse: ApiResponse<any> = yield call(api, access, ...rest)
      return newResponse
    } else {
      yield put(logoutUser())
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      sessionStorage.removeItem(REFRESH_TOKEN_KEY)
      sessionStorage.removeItem(ACCESS_TOKEN_KEY)
      toast.error('Your session has expired, please log in')
    }

    // const { status: accessStatus }: ApiResponse<any> = yield call(
    //   API.verifyToken,
    //   accessToken
    // )
    // if (accessStatus === 401) {
    //   const { status: refreshStatus }: ApiResponse<any> = yield call(
    //     API.verifyToken,
    //     refreshToken
    //   )
    //   if (refreshStatus === 200) {
    //     const { data, ok }: ApiResponse<any> = yield call(
    //       API.getNewAccessToken,
    //       refreshToken
    //     )
    //     if (ok && data) {
    //       const { access } = data
    //       localStorage.setItem(ACCESS_TOKEN_KEY, access)
    //       const newResponse: ApiResponse<any> = yield call(api, access, ...rest)
    //       return newResponse
    //     } else {
    //       yield put(logoutUser())
    //       localStorage.removeItem(REFRESH_TOKEN_KEY)
    //       localStorage.removeItem(ACCESS_TOKEN_KEY)
    //       toast.error('Your session has expired, please log in')
    //     }
    //   } else {
    //     yield put(logoutUser())
    //     localStorage.removeItem(REFRESH_TOKEN_KEY)
    //     localStorage.removeItem(ACCESS_TOKEN_KEY)
    //     toast.error('Your session has expired, please log in')
    //   }
    // } else {
    //   return res
    // }
  } else {
    return res
  }
}
