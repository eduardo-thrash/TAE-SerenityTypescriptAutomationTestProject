export interface NewReferencesSectionResponse {
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
    maximumQuantity: unknown
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
    secondaryPackaging: unknown
    sponsored: boolean
}
  
export interface Price {
    base: number
    measurementUnit: string
    managerPrice: number
    managerTotal: number
    managerSubtotal: number
    discountedBase: unknown
    discountedSubtotal: unknown
    discountedTotal: unknown
    startQuantity: number
    unitPrice: number
    multipleQuantity: number
}
  
export interface PrimaryPackaging {
    measurement: string
    measurementUnit: string
}
  