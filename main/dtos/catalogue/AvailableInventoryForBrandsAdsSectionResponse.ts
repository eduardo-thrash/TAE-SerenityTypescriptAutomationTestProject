export interface BrandsAdsSectionResponse {
    cigarettesOrLiqueur: boolean
    brandAds: BrandAd[]
    totalCount: number
}
  
export interface BrandAd {
    adsId: number
    adsBrandId: number
    name: string
    bannerImageUrl: string
    adImageUrl: string
    callToActionType: string
    externalId: number
    externalLink: string
    callToActionLabel?: string
    type: string
    order: undefined
    productList: ProductList[]
    thumb: string
    medium: string
    large: string
}
  
export interface ProductList {
    name: string
    storeReferenceName: string
    id: number
    description: string
    stock: number
    brandStrategy: string
    sku: string
    packagingType: string
    thumb: string
    medium: string
    large: string
    brandName: string
    brandId: number
    minQuantity: number
    shortDescription: string
    subCategoryId: number
    subCategoryName: string
    subCategoryShowOnApp: number
    compundefined: string
    compundefinedId: number
    createdAt: string
    referenceId: number
    macroId: number
    macroName: string
    merchantMedium: undefined
    merchantThumb: undefined
    marchantLarge: undefined
    merchantId: undefined
    merchantName: undefined
    warehouseId: number
    locationId: number
    tobacco: number
    over18: number
    weight: number
    volume: number
    ledgerAccount: string
    multipleQuantity: number
    managerMaximumDelivery: number
    maximumQuantity: undefined
    scaleType: string
    customerPrice: number
    prices: Price[]
    unbeatable: boolean
    onOffEndDate: unknown
    cardType?: string
    from: string
    saves: number
    recomendedPVP: number
    primaryPackaging: PrimaryPackaging
    secondaryPackaging?: SecondaryPackaging
    order: number
    discount?: number
    discountedMaximumQuantity?: number
}
  
export interface Price {
    base: number
    measurementUnit: string
    managerPrice: number
    managerTotal: number
    managerSubtotal: number
    discountedBase?: number
    discountedSubtotal?: number
    discountedTotal?: number
    startQuantity: number
    unitPrice: number
    multipleQuantity: number
    discount?: number
}
  
export interface PrimaryPackaging {
    measurement: undefined
    measurementUnit: string
}
  
export interface SecondaryPackaging {
    measurement: string
    measurementUnit: string
}