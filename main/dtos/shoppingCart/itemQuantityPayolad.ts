export interface QuantityPayload {
    locationId: number,
    items: Array<QuantityItemPayload>,
}

export interface QuantityItemPayload {
    merchantId?: number,
    quantity: number,
    warehouseId: number,
    type: string
}