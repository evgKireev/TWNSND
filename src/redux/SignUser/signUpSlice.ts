import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserPayloadType } from '../../@types/types/auth'

type initialStateSignUp = {
  email: string
}

const initialState: initialStateSignUp = {
  email: '',
}

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    registerUser: (state, actions: PayloadAction<UserPayloadType>) => {},
    setEmail: (state, actions: PayloadAction<string>) => {
      state.email = actions.payload
    },
  },
})
export const { registerUser, setEmail } = signUpSlice.actions

export default signUpSlice.reducer
