export type PlatformType = {
  id: number
  name: string
  description: string
  imageUrl: string
  fileName: string
  rating: number
  categories: {
    id: number
    name: string
  }[]
  messengers: {
    id: number
    name: string
  }[]
}

export type GetPlatforms = {
  skip: number
  take: number
}

export type GetPlatformsPayload = {
  data: GetPlatforms
}
