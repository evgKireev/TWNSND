import { API } from '../../@types/constant'
import {
  ParamsUrlType,
  SentMailRegisterUser,
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
    `Account/ConfirmEmail`,
    { userId, email, code },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export default {
  registerUserMail,
  sentEmailRegisterUser,
  activateUser,
}
