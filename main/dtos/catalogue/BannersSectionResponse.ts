export type BannersSectionResponseList = BannersSectionResponse[]

export interface BannersSectionResponse {
    id: string
    position: unknown
    adsBannerId: string
    createdAt: unknown
    deletedAt: unknown
    externalLink: string
    adsId: string
    imageURL: string
    imageId: number
    adsName: string
    isActive: string
    locationId: number
    description: string
    callToActionLabel: string
    sponsored: boolean
    endDate: string
}
