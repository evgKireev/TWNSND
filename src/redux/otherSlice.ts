import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {}

const initialState: initialStateType = {}

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {},
})

export default otherSlice.reducer
