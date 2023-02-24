import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ACCESS_TOKEN_KEY } from '../../@types/constant'
import {
  RestorePassword,
  RestorePasswordData,
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
      actions: PayloadAction<RestorePasswordData>
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
} = signInSlice.actions
export default signInSlice.reducer
