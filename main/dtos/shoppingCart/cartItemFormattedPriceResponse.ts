export interface CartItemFormattedPriceResponse {
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