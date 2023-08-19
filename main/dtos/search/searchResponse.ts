export interface SearchResponse {
    hits: HitsResult[],
    _name: string,
    name: string,
    trace: string,
    _trace: string,
    searchId: string,
    timeElapsed: number,
    keywordHit: Array<any>,
    query: string,
    warehouseIds: Array<any>,
    topScore: Array<any>,
    storeId: number,
    sessionId: string,
    cigarettesOrLiqueur: boolean,
    sentAsSponsored: boolean,
    maxScore: number,
    minScore: number,
    meanScore: number,
    sponsorsLength: number,
    auctionId: string,
    searchMethod: string,
    totalResults: number,
    pages: number,
    page: number,
    section: string,
    hasResult: boolean,
    isElastic: boolean,
    macrocategoriesUser: Macrocategories,
    macrocategory: number,
    brands: Array<any>,
    sponsors: Array<any>
}

export interface HitsResult{
    brandName: string,
    large: string,
    thumb: string,
    nameWithoutSpaces: string,
    description: string,
    active: boolean,
    medium: string,
    storeRefName: string,
    subCategoryName: string,
    macroName: string,
    macroId: number,
    warehouseId: number,
    name: string,
    company: string,
    id: number,
    sku: string,
    packagingType: string,
    objectID: number,
    score: number,
    sponsored: boolean,
    brandStrategy: string,
    brandId: number,
    minQuantity: number,
    shortDescription: string,
    subCategoryId: number,
    companyId: number,
    createdAt: Date,
    referenceId: number,
    merchantMedium: null,
    merchantThumb: null,
    marchantLarge: null,
    merchantId: null,
    merchantName: null,
    tobacco: number,
    over18: number,
    weight: number,
    volume: number,
    stock: number,
    storeReferenceId: number,
    locationId: number,
    prices: ProductPrices[], 
    multipleQuantity: number,
    managerMaximumDelivery: number,
    maximumQuantity: number,
    scaleType: string,
    customerPrice: number,
    unbeatable: boolean,
    onOffEndDate: null,
    cardType: null,
    from: string,
    saves: number,
    recomendedPVP: number,
    primaryPackaging: Array<PrimaryPackagingData>,
    secondaryPackaging: null,
    fromAlgolia: string

}

export interface ProductPrices{
    base: number,
    measurementUnit: string,
    managerPrice: number,
    managerTotal: number,
    managerSubtotal: number,
    discountedBase: null,
    discountedSubtotal: null,
    discountedTotal: null,
    startQuantity: number,
    unitPrice: number,
    multipleQuantity: number

}

export interface PrimaryPackagingData{
    measurement: string,
    measurementUnit: string

}

export interface Macrocategories {
    id: number,
    name: string,           
    images: ImagesStorage
}

export interface ImagesStorage{
    active: string,
    inactive: string

}