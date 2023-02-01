import { configureStore } from '@reduxjs/toolkit';
import otherSlice from './otherSlice';
import botSlice from './botSlice';

export const store = configureStore({
  reducer: {
    otherSlice,
    botSlice,
  },
  middleware: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
