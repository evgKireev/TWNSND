import { API } from '../../@types/constant'
import {
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
  // const body = {
  //   client_id: 'Test_js_client',
  //   scope: 'openid profile TownSend_Backend offline_access',
  //   username: USER_EMAIL,
  //   password: USER_PASSWORD,
  // }
  // return API.post(
  //   'connect/token',
  //   { body },
  //   {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'Cache-Control': 'no-cache',
  //     },
  //   }
  // )
  //Вот такое body должно быть client_id=Test_js_client&scope=openid profile TownSend_Backend offline_access&grant_type=password&username=aliaksei.zhurauliou@yandex.by&password=Bob123*
  //У тебя было такое: {body: client_id=Test_js_client&scope=openid profile TownSend_Backend offline_access&grant_type=password&username=aliaksei.zhurauliou@yandex.by&password=Bob123*}
  //Протокол OAuth 2.0(протокол нашей аутентификации) требует передачи параметров в формате x-www-form-urlencoded, а не JSON.

  const body = `client_id=Test_js_client&scope=openid profile TownSend_Backend offline_access&grant_type=password&username=${USER_EMAIL}&password=${USER_PASSWORD}`;
  return API.post(
    'connect/token',
    body,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
    }
  )
}

const getNewAccessToken = (refresh_token: string) => {
  //Тут тоже именно в таком формате запрос нужен connect/token?grant_type=refresh_token&client_id=Test_js_client&refresh_token=refersh_token
  return API.post(
    'connect/token?grant_type=refresh_token&client_id=Test_js_client',
    { refresh_token }
  )
}

export default {
  registerUserMail,
  sentEmailRegisterUser,
  activateUser,
  signInUser,
  getNewAccessToken
}
