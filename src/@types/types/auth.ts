export type UserType = {
  FirstName: string
  Email: string
  Password: string
  ConfirmPassword: string
  LastName?: string
  Country?: string
}

export type UserPayloadType = {
  data: UserType
  callback: () => void
}
