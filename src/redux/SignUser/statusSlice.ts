import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  statusRegisterUser: string
  statusConfirmUser: string
  statusSuccessUser: string
}

const initialState: initialStateType = {
  statusRegisterUser: '',
  statusConfirmUser: '',
  statusSuccessUser: '',
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
  },
})

export const { setStatusUser, setConfirmStatusUser, setSuccessStatusUser } =
  statusSlice.actions

export default statusSlice.reducer
