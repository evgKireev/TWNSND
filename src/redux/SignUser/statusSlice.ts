import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  statusRegisterUser: string
  statusConfirmUser: string
  statusSuccessUser: string
  statusSignIn: string
  statusRegisterUserGoogle: string
  statusRestorePassword: string
  statusRestoreChangePassword: string
  statusChangePassword: string
}

const initialState: initialStateType = {
  statusRegisterUser: '',
  statusConfirmUser: '',
  statusSuccessUser: '',
  statusSignIn: '',
  statusRegisterUserGoogle: '',
  statusRestorePassword: '',
  statusRestoreChangePassword: '',
  statusChangePassword: '',
}

const statusSlice = createSlice({
  name: 'statusUser',
  initialState,
  reducers: {
    setStatusUser: (state, actions) => {
      state.statusRegisterUser = actions.payload
    },
    setConfirmStatusUser: (state, actions) => {
      state.statusConfirmUser = actions.payload
    },
    setSuccessStatusUser: (state, actions) => {
      state.statusSuccessUser = actions.payload
    },
    setSignInStatusUser: (state, actions) => {
      state.statusSignIn = actions.payload
    },
    setSignInStatusUserGoogle: (state, actions) => {
      state.statusRegisterUserGoogle = actions.payload
    },
    setStatusRestorePassword: (state, actions) => {
      state.statusRestorePassword = actions.payload
    },
    setStatusRestoreChangePassword: (state, actions) => {
      state.statusRestoreChangePassword = actions.payload
    },
    setStatusChangePassword: (state, actions) => {
      state.statusChangePassword = actions.payload
    },
  },
})

export const {
  setStatusUser,
  setConfirmStatusUser,
  setSuccessStatusUser,
  setSignInStatusUser,
  setSignInStatusUserGoogle,
  setStatusRestorePassword,
  setStatusRestoreChangePassword,
  setStatusChangePassword,
} = statusSlice.actions

export default statusSlice.reducer
