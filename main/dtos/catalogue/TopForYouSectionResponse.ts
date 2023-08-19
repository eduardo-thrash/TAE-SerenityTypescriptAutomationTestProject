export interface TopForYouSectionResponse {
    avaibleStock: AvaibleStock[]
    totalCount: number
}
  
export interface AvaibleStock {
    name: string
    id: number
    description: string
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
    company: string
    companyId: number
    createdAt: string
    referenceId: number
    macroId: number
    macroName: string
    merchantMedium: unknown
    merchantThumb: unknown
    marchantLarge: unknown
    merchantId: unknown
    merchantName: unknown
    tobacco: number
    over18: number
    weight: number
    volume: number
    stock: number
    storeReferenceId: number
    warehouseId: number
    locationId: number
    prices: Price[]
    multipleQuantity: number
    managerMaximumDelivery: number
    maximumQuantity?: number
    scaleType: string
    customerPrice: number
    unbeatable: boolean
    onOffEndDate: unknown
    cardType: string
    from: string
    saves: number
    recomendedPVP: number
    primaryPackaging: PrimaryPackaging
    secondaryPackaging?: SecondaryPackaging
    sponsored: boolean
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
    measurement: unknown
    measurementUnit: string
}
  
export interface SecondaryPackaging {
    measurement: string
    measurementUnit: string
}
  