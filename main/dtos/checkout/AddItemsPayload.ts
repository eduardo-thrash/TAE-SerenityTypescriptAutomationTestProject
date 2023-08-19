export interface AddItemsPayload {
    locationId: number,
    items: Array<ItemPayload>
}

export interface ItemPayload {
    id: number,
    merchantId?: number,
    quantity: number,
    warehouseId: number,
    type: string,
    sponsored: boolean
}