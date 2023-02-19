import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  statusRegisterUser: string
  statusConfirmUser: string
  statusSuccessUser: string
  statusSignIn: string
}

const initialState: initialStateType = {
  statusRegisterUser: '',
  statusConfirmUser: '',
  statusSuccessUser: '',
  statusSignIn: '',
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
  },
})

export const {
  setStatusUser,
  setConfirmStatusUser,
  setSuccessStatusUser,
  setSignInStatusUser,
} = statusSlice.actions

export default statusSlice.reducer
