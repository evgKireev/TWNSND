import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ACCESS_TOKEN_KEY } from '../../@types/constant'
import {
  ChangePasswordPayloadType,
  RestorePassword,
  RestorePasswordlePayloadType,
  SignInPayloadType,
} from '../../@types/types/auth'

type initialStateType = {
  rememberPassword: boolean
  registerUser: boolean
}

const initialState: initialStateType = {
  rememberPassword: false,
  registerUser:
    !!localStorage.getItem(ACCESS_TOKEN_KEY) ||
    !!sessionStorage.getItem(ACCESS_TOKEN_KEY),
}

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    getSignInUser: (state, actions: PayloadAction<SignInPayloadType>) => {},
    getRestorePassword: (state, actions: PayloadAction<RestorePassword>) => {},
    getRestoreChangePassword: (
      state,
      actions: PayloadAction<RestorePasswordlePayloadType>
    ) => {},
    getChangePassword: (
      state,
      actions: PayloadAction<ChangePasswordPayloadType>
    ) => {},
    logoutUser(state, actions: PayloadAction<undefined>) {},
    setRememberPassword: (state, actions: PayloadAction<boolean>) => {
      state.rememberPassword = actions.payload
    },
    setRegisterUser: (state, actions: PayloadAction<boolean>) => {
      state.registerUser = actions.payload
    },
  },
})

export const {
  setRememberPassword,
  getSignInUser,
  setRegisterUser,
  logoutUser,
  getRestorePassword,
  getRestoreChangePassword,
  getChangePassword,
} = signInSlice.actions
export default signInSlice.reducer
