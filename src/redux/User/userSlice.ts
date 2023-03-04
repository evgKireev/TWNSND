import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChangeUserData, UserType } from '../../@types/types/user'

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
    changeUser: (state, actions: PayloadAction<ChangeUserData>) => {},
  },
})

export const { getUser, setUser, changeUser } = userSlice.actions

export default userSlice.reducer
