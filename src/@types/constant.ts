import { create } from 'apisauce'
export const ACCESS_TOKEN_KEY = 'accessToken1'
export const REFRESH_TOKEN_KEY = 'refreshToken1'
export const API = create({
  baseURL: 'https://identiy-server.onrender.com',
})
export const API_GOOGLE = create({
  baseURL: 'https://identiy-server.onrender.com',
})
export const API_SERVER = create({
  baseURL: 'https://localhost:7128',
})
export const MY_URL = 'https://twnsnd.vercel.app'

//SignIn Google
export const redirectUriGoogle = MY_URL
export const stateGoogle = '1234567890'
export const googleId =
  '923826205735-l644r1ke16c87a4agdbs97ceqdmlesb6.apps.googleusercontent.com'
export const linkGoogle = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUriGoogle}&client_id=${googleId}&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=${stateGoogle}`
