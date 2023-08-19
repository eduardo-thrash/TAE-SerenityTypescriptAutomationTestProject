export interface SubcategoryResponse {
    subCategoryId: number
    subCategoryName: string
    sShortDescription: any
    totalCount: number
    avaibleStock: AvaibleStock[]
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
    merchantMedium: any
    merchantThumb: any
    marchantLarge: any
    merchantId: any
    merchantName: any
    warehouseId: number
    locationId: number
    tobacco: number
    over18: number
    weight: number
    volume: number
    ledgerAccount: string
    multipleQuantity: number
    managerMaximumDelivery: number
    maximumQuantity: any
    scaleType: string
    customerPrice: number
    prices: Price[]
    unbeatable: boolean
    onOffEndDate: any
    cardType?: string
    from: string
    saves: number
    recomendedPVP: number
    primaryPackaging: PrimaryPackaging
    secondaryPackaging?: SecondaryPackaging
    sponsored: boolean
    discount?: number
    discountedMaximumQuantity: any
    citrusAdId?: string
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
    measurement: any
    measurementUnit: string
}

export interface SecondaryPackaging {
    measurement: string
    measurementUnit: string
}
