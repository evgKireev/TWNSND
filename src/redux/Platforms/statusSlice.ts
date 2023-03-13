import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  statusPlatforms: string
}

const initialState: initialStateType = {
  statusPlatforms: '',
}

const statusPlatformsSlice = createSlice({
  name: 'statusPlatforms',
  initialState,
  reducers: {
    setStatusPlatforms: (state, actions) => {
      state.statusPlatforms = actions.payload
    },
  },
})

export const { setStatusPlatforms } = statusPlatformsSlice.actions

export default statusPlatformsSlice.reducer
