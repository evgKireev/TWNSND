import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {};

const initialState: initialStateType = {};

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {},
});

export const {} = otherSlice.actions;
export default otherSlice.reducer;
