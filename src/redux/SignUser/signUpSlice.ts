import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ParamsUrlGoggle,
  ParamsUrlPayloadType,
  SentMailRegisterUser,
  UserType,
  UserTypePayloadType,
} from '../../@types/types/auth'

type initialStateSignUp = {
  email: string
  errorMessagesRegistration: string
  userId: string
}

const initialState: initialStateSignUp = {
  errorMessagesRegistration: '',
  email: '',
  userId: '',
}

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    getRegisterUser: (state, actions: PayloadAction<UserTypePayloadType>) => {},
    getRegisterUserGoogle: (
      state,
      actions: PayloadAction<ParamsUrlGoggle>
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
} = signUpSlice.actions

export default signUpSlice.reducer
