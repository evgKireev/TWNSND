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
    const { ok, data }: ApiResponse<any> = yield call(
      API.verifyToken,
      accessToken
    )
    if (ok && data) {
      if (data.isActive === false) {
        const { data, ok }: ApiResponse<any> = yield call(
          API.getNewAccessToken,
          refreshToken
        )
        if (ok && data) {
          console.log(data)
          console.log(data.access_token)
          const { access_token, refresh_token } = data
          if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
            localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
            localStorage.setItem(ACCESS_TOKEN_KEY, refresh_token)
          } else if (sessionStorage.getItem(ACCESS_TOKEN_KEY)) {
            sessionStorage.setItem(ACCESS_TOKEN_KEY, access_token)
            sessionStorage.setItem(ACCESS_TOKEN_KEY, refresh_token)
          }
          const newResponse: ApiResponse<any> = yield call(
            api,
            access_token,
            ...rest
          )
          return newResponse
        } else {
          yield put(logoutUser())
          toast.error(
            'Срок действия вашего сеанса истек, пожалуйста, авторизуйтесь'
          )
        }
      } else {
        return res
      }
    } else {
      yield put(logoutUser())
      toast.error(
        'Срок действия вашего сеанса истек, пожалуйста, авторизуйтесь'
      )
    }
  } else {
    return res
  }
}
