export interface availableProductsResponse {
    data:       availableProductsData[]
    total:      number
    totalPages: number
    meta:       availableProductsMeta
}

export interface availableProductsData {
    isActive:            string
    id:                  number
    referenceId:         number
    sku:                 string
    name:                string
    presentation:        string
    brand:               string
    inventoryDays:       number
    projectedDOI:        number
    gmvInv:              number
    gmv:                 number
    quantity:            number
    available:           number
    reserved:            number
    transit:             number
    blocked:             number
    total:               string
    progress:            number
    transitStock:        number
    multiEanFlag:        number
    manufacturer:        string
    MacroCategory:       string
    Category:            string
    supplier:            string
    availableToPurchase: number
    availableToSell:     number
}

export interface availableProductsMeta {
    total:            string
    skus:             number
    inventoryDaysAVG: number
}