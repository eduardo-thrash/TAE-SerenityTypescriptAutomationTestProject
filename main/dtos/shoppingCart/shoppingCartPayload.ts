export interface ShoppingCartPayload {
    locationId: number,
    items: Array<shoppingCartItemPayload>
}

export interface shoppingCartItemPayload {
    id: number,
    merchantId?: number,
    quantity: number,
    warehouseId: number,
    type: string,
    sponsored: boolean
}