/* eslint-disable @typescript-eslint/no-empty-interface */

export interface OffertsContentSectionResponse {
    id: string
    link: unknown
    objectId: number
    objectType: string
    originalObjectType: string
    title: string
    description: string
    status: string
    type: string
    loves: number
    reaction: unknown
    startDate?: string
    endDate?: string
    createdAt: string
    updatedAt: string
    locationId?: number
    warehouseId?: number
    meta: Meta
    medias: Media[]
    defaultMedia: DefaultMedia
    video: Video
}

export interface Meta {}

export interface Media {
    type: string
    url: string
}

export interface DefaultMedia {
    type: string
    url: string
}

export interface Video {}
