import {
  ACCESS_TOKEN_KEY,
  API,
  API_GOOGLE,
  API_SERVER,
} from '../../@types/constant'
import {
  ChangePasswordData,
  ParamsUrlGoogle,
  ParamsUrlType,
  RestorePassword,
  RestorePasswordData,
  SentMailRegisterUser,
  SignInType,
  UserType,
} from '../../@types/types/auth'
import { ChangeUserData } from '../../@types/types/user'

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
  return API.post('api/Account/Register', body, {
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
    'api/Account/SendConfirmationEmail',
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
    'api/Account/ConfirmEmail',
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

const restorePassword = ({ Email, ReturnUrl }: RestorePassword) => {
  return API.post('api/Account/ForgotPassword', { Email, ReturnUrl })
}

const restoreChangePasswordUsser = ({
  Password,
  Email,
  Code,
  ConfirmPassword,
}: RestorePasswordData) => {
  return API.post(
    'api/Account/ResetPassword',
    { Email, Code, Password, ConfirmPassword },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

const changePasswordUser = ({
  OldPassword,
  NewPassword,
  NewPasswordConfirmation,
}: ChangePasswordData) => {
  const token =
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY)
  return API.post(
    'api/Account/ChangePassword',
    {
      OldPassword,
      NewPassword,
      NewPasswordConfirmation,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
}

const getUserData = (accessToken: string) => {
  return API_SERVER.get(
    '/api/user/GetCustomer',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
}

const verifyToken = (ACCESS_TOKEN: string) => {
  return API.get(
    'api/Account/CheckTokenExpiration',
    {},
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  )
}

const getNewAccessToken = (refresh_token: string) => {
  return API.post(
    'connect/token?grant_type=refresh_token&client_id=Test_js_client',
    { refresh_token }
  )
}

const changeUserData = (
  { FirstName, LastName, Country }: ChangeUserData,
  accessToken: string
) => {
  return API_SERVER.put(
    '/api/user/EditCustomerAsync',
    {
      FirstName,
      LastName,
      Country,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
}

export default {
  registerUserMail,
  sentEmailRegisterUser,
  activateUser,
  signInUser,
  getNewAccessToken,
  registerUserGoogle,
  getUserData,
  restorePassword,
  restoreChangePasswordUsser,
  changePasswordUser,
  verifyToken,
  changeUserData,
}
