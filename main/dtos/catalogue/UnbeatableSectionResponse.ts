export interface UnbeatableSectionResponse {
    totalCount: number
    avaibleStock: AvaibleStock[]
}
  
export interface AvaibleStock {
    unbeatableReferenceCoverageId: unknown
    referrerReferenceCoverageId: unknown
    referrerReferenceCoverageName: unknown
    saves: number
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
    scaleType?: string
    customerPrice: number
    prices: Price[]
    unbeatable: boolean
    onOffEndDate: unknown
    cardType: string
    from: string
    recomendedPVP: number
    primaryPackaging: PrimaryPackaging
    secondaryPackaging?: SecondaryPackaging
    sponsored: boolean
    citrusAdId?: string
    discount?: number
    discountedMaximumQuantity: unknown
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
  