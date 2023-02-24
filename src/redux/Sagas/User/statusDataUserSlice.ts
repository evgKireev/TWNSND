import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  statusGetUser: string
}

const initialState: initialStateType = {
  statusGetUser: '',
}

const statusDataUserSlice = createSlice({
  name: 'statusDataUser',
  initialState,
  reducers: {
    setStatusDataUser: (state, actions) => {
      state.statusGetUser = actions.payload
    },
  },
})

export const { setStatusDataUser } = statusDataUserSlice.actions

export default statusDataUserSlice.reducer
