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
  const body = JSON.stringify({
    Email,
    UserId,
    ReturnUrl,
  })
  return API.post(
    `api/Account/SendConfirmationEmail`,
    { body },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

const activateUser = ({ id, email, code }: ParamsUrlType) => {
  const body = JSON.stringify({
    id,
    email,
    code,
  })
  return API.post(
    `Account/ConfirmEmail`,
    { body },
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
