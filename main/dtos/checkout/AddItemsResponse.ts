export interface AddItemsResponse {
    carts: car[]
    countryId: number,
    locationId: number,
    status: string,
    storeId: string
}

export interface car {
    merchantId: number,
    warehouseId: number,
    items: item[]
}

export interface item {
    id: number,
    productType: string,
    quantity: number
}