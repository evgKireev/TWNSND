import { API, API_GOOGLE } from '../../@types/constant'
import {
  ParamsUrlGoogle,
  ParamsUrlType,
  SentMailRegisterUser,
  SignInType,
  UserType,
} from '../../@types/types/auth'

const registerUserMail = ({
  FirstName,
  Email,
  Password,
  ConfirmPassword,
  LastName,
  Country,
}: UserType) => {
  const body = JSON.stringify({
    FirstName,
    Email,
    Password,
    ConfirmPassword,
    LastName,
    Country,
  })

  return API.post(`api/Account/Register`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const sentEmailRegisterUser = ({
  UserId,
  Email,
  ReturnUrl,
}: SentMailRegisterUser) => {
  return API.post(
    `api/Account/SendConfirmationEmail`,
    { Email, UserId, ReturnUrl },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

const activateUser = ({ userId, email, code }: ParamsUrlType) => {
  return API.post(
    `api/Account/ConfirmEmail`,
    { userId, email, code },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

const signInUser = ({
  email: USER_EMAIL,
  password: USER_PASSWORD,
}: SignInType) => {
  const body = `client_id=Test_js_client&scope=openid profile TownSend_Backend offline_access IdentityServerApi&grant_type=password&username=${USER_EMAIL}&password=${USER_PASSWORD}`
  return API.post('connect/token', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
  })
}

const getNewAccessToken = (refresh_token: string) => {
  return API.post(
    'connect/token?grant_type=refresh_token&client_id=Test_js_client',
    { refresh_token }
  )
}

const registerUserGoogle = ({
  code,
  redirectUriGoogle,
  localEmail,
  localPassword,
}: ParamsUrlGoogle) => {
  const body =
    !localEmail && !localPassword
      ? `client_id=Test_js_client&scope=openid profile TownSend_Backend offline_access IdentityServerApi&grant_type=google_auth&code=${code}&return_url=${redirectUriGoogle}`
      : `client_id=Test_js_client&scope=openid profile TownSend_Backend offline_access IdentityServerApi&grant_type=google_auth&code=${code}&return_url=${redirectUriGoogle}&localEmail=${localEmail}&localPassword=${localPassword}`
  return API_GOOGLE.post('connect/token', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
  })
}

const getUserData = (token: string) => {
  return API.get('/api/user/GetCustomer', {
    headers: {
      Authorization: `Bearer {${token}}`,
    },
  })
}

export default {
  registerUserMail,
  sentEmailRegisterUser,
  activateUser,
  signInUser,
  getNewAccessToken,
  registerUserGoogle,
  getUserData,
}
