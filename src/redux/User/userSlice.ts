import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../@types/types/user'

type initialStateType = {
  userData: UserType | null
}

const initialState: initialStateType = {
  userData: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, actions: PayloadAction<undefined>) => {},
    setUser: (state, actions: PayloadAction<UserType>) => {
      state.userData = actions.payload
    },
  },
})

export const { getUser, setUser } = userSlice.actions

export default userSlice.reducer
