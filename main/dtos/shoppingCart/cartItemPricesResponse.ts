export interface CartItemPricesResponse {
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