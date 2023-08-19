export interface GetShoppingCarDetailsResponse {
    storeId?: string,
    carts?: Array<carItem>,
    createdAt?: string,
    locationId?: number,
    updatedAt?: string,
    subtotal?: number,
    total?: number,
    totalItems?: number,
    status?: string
}

export interface carItem {
    warehouseId?: number,
    merchantId?: number,
    items?: Array<carProductItem>,
    iconUrl?: string,
    id?: number,
    minimumOrder?: number,
    name?: string,
    hasCompleteMinimumOrder?: boolean,
    hasCompleteMinimumOrderLabel?: string,
    subtotal?: number,
    total?: number,
    totalWeight?: number
}

export interface carProductItem {
    id?: number,
    productType?: string,
    quantity?: number,
    oldPrice?: number,
    sponsored?: boolean,
    products?: Array<cartItemProductDetail>,
    addedDate?: string,
    brandName?: string,
    currentPrice?: number,
    customerMeasurement?: number,
    customerMeasurementUnit?: string,
    customerPrice?: number,
    customerTotal?: number,
    description?: string,
    descriptionDiscountedMaximumQuantity?: string,
    descriptionRegularPrice?: string,
    discount?: number,
    discountEndTime?: string,
    discountedExternalId?: number,
    discountedMaximumQuantity?: number,
    externalId?: number,
    forCheckoutBase?: number,
    forCheckoutManagerTotal?: number,
    forCheckoutSubtotal?: number,
    forCheckoutTotal?: number,
    formattedPrice?: Array<cartItemFormattedPrice>
    hasDiscount?: boolean,
    hasSufficientStock?: boolean,
    ico?: number,
    iva?: number,
    ledgerAccount?: string,
    lowStock?: boolean,
    maximumQuantity?: number,
    measurementUnit?: string,
    medium?: string,
    minQuantity?: number,
    multipleQuantity?: number,
    name?: string,
    originatedExternalId?: number,
    packagingType?: string,
    prices?: Array<cartItemPrices>,
    referenceId?: number,
    scaleType?: string,
    scheduleEndDate?: string,
    sku?: string,
    startQuantity?: number,
    stock?: number,
    storeReferenceName?: string,
    subtotal?: number,
    updateItemPriceDate?: string,
    volume?: number,
    weight?: number
}

export interface cartItemProductDetail {
    prices?: Array<cartItemProductPrices>
}

export interface cartItemProductPrices {
    storeReferenceId?: number,
    iva?: number,
    ico?: number,
    customerTotal?: number,
    maximumQuantity?: number,
    customerMeasurement?: number,
    customerMeasurementUnit?: string,
    customerPrice?: number,
    scaleType?: string,
    originatedExternalId?: number,
    values?: Array<cartItemProductPricesValues>,
    scheduleEndDate?: string,
    clusterCode?: string
}

export interface cartItemProductPricesValues {
    externalId?: number,
    startQuantity?: number,
    endQuantity?: number,
    multipleQuantity?: number,
    price?: number,
    priceLevel?: number,
    subtotal?: number,
    total?: number,
    totalPerUnit?: number
}

export interface cartItemFormattedPrice {
    customerTotal?: number,
    iva?: number,
    ico?: number,
    maxQuantity?: number,
    total?: number,
    subtotal?: number,
    externalId?: number,
    discountedExternalId?: number,
    discountEndTime?: string,
    discount?: number,
    measurementTotal?: number
}

export interface cartItemPrices {
    externalId?: number,
    startQuantity?: number,
    endQuantity?: number,
    multipleQuantity?: number,
    price?: number,
    priceLevel?: number,
    subtotal?: number,
    total?: number,
    totalPerUnit?: number,
    base?: number,
    discount?: number,
    measurementUnit?: string,
    managerPrice?: number,
    managerTotal?: number,
    discountedBase?: number,
    discountedSubtotal?: number,
    discountedTotal?: number
}