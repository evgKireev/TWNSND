import { create } from 'apisauce'
export const ACCESS_TOKEN_KEY = 'accessToken1'
export const REFRESH_TOKEN_KEY = 'refreshToken1'
export const API = create({
  baseURL: 'https://ca03-185-158-218-132.eu.ngrok.io',
})

export const API_GOOGLE = create({ baseURL: 'https://localhost:7247' })
