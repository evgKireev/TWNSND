import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../../@types/types/user'

type initialStateType = {
  userData: UserType
}

const initialState: initialStateType = {
  userData: {
    id: '',
    name: '',
    given_name: '',
    family_name: '',
    email: '',
    interests: [
      {
        id: null,
        name: '',
      },
    ],
    sphere: {
      id: null,
      name: '',
    },
    role: '',
    country: '',
  },
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
