export type UserType = {
  id: string
  name: string
  given_name: string
  family_name: string
  email: string
  interests: {
    id: number | null
    name: string
  }[]

  sphere: {
    id: number | null
    name: string
  }
  role: string
  country: string
}
