export interface DiscountsSectionResponse {
    avaibleStock: AvaibleStock[]
    totalCount: number
}
  
export interface AvaibleStock {
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
    warehouseId: number
    locationId: number
    tobacco: number
    over18: number
    weight: number
    volume: number
    ledgerAccount: string
    multipleQuantity: number
    managerMaximumDelivery: number
    maximumQuantity?: number
    scaleType: string
    customerPrice: number
    prices: Price[]
    unbeatable: boolean
    cardType: string
    discount: number
    discountedMaximumQuantity?: number
    from: string
    saves: number
    recomendedPVP: number
    primaryPackaging: PrimaryPackaging
    secondaryPackaging?: SecondaryPackaging
    sponsored: boolean
}
  
export interface Price {
    base: number
    discount: number
    measurementUnit: string
    managerPrice: number
    managerTotal: number
    managerSubtotal: number
    discountedBase: number
    discountedSubtotal: number
    discountedTotal: number
    startQuantity: number
    unitPrice: number
    multipleQuantity: number
}
  
export interface PrimaryPackaging {
    measurement: unknown
    measurementUnit: string
}
  
export interface SecondaryPackaging {
    measurement: string
    measurementUnit: string
}
  