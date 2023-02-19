import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  statusRegisterUser: string
}

const initialState: initialStateType = {
  statusRegisterUser: '',
}

const statusSlice = createSlice({
  name: 'statusUser',
  initialState,
  reducers: {
    setStatusUser: (state, actions) => {
      state.statusRegisterUser = actions.payload
    },
  },
})

export const { setStatusUser } = statusSlice.actions

export default statusSlice.reducer
