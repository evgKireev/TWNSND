import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './Sagas/rootSaga'
import otherSlice from './otherSlice'
import signUpSlice from './SignUser/signUpSlice'
import statusSlice from './SignUser/statusSlice'
import signInSlice from './SignUser/signInSlice'
import userSlice from './User/userSlice'
import platformsSlice from './Platforms/platformsSlice'
import statusPlatformsSlice from './Platforms/statusSlice'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    otherSlice,
    signUpSlice,
    statusSlice,
    signInSlice,
    userSlice,
    platformsSlice,
    statusPlatformsSlice,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
