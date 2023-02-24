import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ParamsUrlPayloadType,
  SentMailRegisterUser,
  SignInGooglePayloadType,
  UserTypePayloadType,
} from '../../@types/types/auth'

type initialStateSignUp = {
  email: string
  errorMessagesRegistration: string
  userId: string
  code: string
}

const initialState: initialStateSignUp = {
  errorMessagesRegistration: '',
  email: '',
  userId: '',
  code: '',
}

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    getRegisterUser: (state, actions: PayloadAction<UserTypePayloadType>) => {},
    getRegisterUserGoogle: (
      state,
      actions: PayloadAction<SignInGooglePayloadType>
    ) => {},
    getMailRegisterUser: (
      state,
      actions: PayloadAction<SentMailRegisterUser>
    ) => {},
    getRegistrationConfirmUser: (
      state,
      actions: PayloadAction<ParamsUrlPayloadType>
    ) => {},
    setErrorMessagesRegistration: (state, actions: PayloadAction<string>) => {
      state.errorMessagesRegistration = actions.payload
    },
    setEmail: (state, actions: PayloadAction<string>) => {
      state.email = actions.payload
    },
    setUserId: (state, actions: PayloadAction<string>) => {
      state.userId = actions.payload
    },
    setCode: (state, actions: PayloadAction<string>) => {
      state.code = actions.payload
    },
  },
})
export const {
  getRegisterUser,
  setEmail,
  setErrorMessagesRegistration,
  getRegistrationConfirmUser,
  setUserId,
  getMailRegisterUser,
  getRegisterUserGoogle,
  setCode,
} = signUpSlice.actions

export default signUpSlice.reducer
