import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlatformType, GetPlatformsPayload } from '../../@types/types/platforms'

type initialStateType = {
  platforms: PlatformType[] | null
  renderedPlatforms: PlatformType[] | null
}

const initialState: initialStateType = {
  platforms: null,
  renderedPlatforms: null,
}

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    getPlatforms: (state, actions: PayloadAction<GetPlatformsPayload>) => {},
    setPlatforms: (state, actions: PayloadAction<PlatformType[]>) => {
      state.renderedPlatforms === null
        ? (state.renderedPlatforms = actions.payload)
        : (state.renderedPlatforms = [
            ...state.renderedPlatforms,
            ...actions.payload,
          ])
      state.platforms = actions.payload
    },
  },
})

export const { getPlatforms, setPlatforms } = platformsSlice.actions

export default platformsSlice.reducer
