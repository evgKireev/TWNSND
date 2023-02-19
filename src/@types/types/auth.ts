export type UserType = {
  FirstName: string
  Email: string
  Password: string
  ConfirmPassword: string
  LastName?: string
  Country?: string
}

export type SentMailRegisterUser = {
  UserId: string
  Email: string
  ReturnUrl: string
}

export type ParamsUrlType = {
  id: string | undefined
  email: string | undefined
  code: string | undefined
}

export type UserTypePayloadType = {
  data: UserType
  callback: () => void
}

export type ParamsUrlPayloadType = {
  data: ParamsUrlType
  callback: () => void
}
