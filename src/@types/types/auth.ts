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
  userId: string | null
  email: string | null
  code: string | null
}

export type SignInType = {
  email: string
  password: string
}

export type UserTypePayloadType = {
  data: UserType
  callback: () => void
}

export type ParamsUrlPayloadType = {
  data: ParamsUrlType
  callback: () => void
}

export type SignInPayloadType = {
  data: SignInType
  rememberPassword: boolean
  callback: () => void
}
