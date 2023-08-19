export interface AddProductItemResponse {
    storeId: string,
    locationId: number,
    countryId?: number,
    carts: AddProductItemCartResponse[],
    status: string
}

export interface AddProductItemCartResponse {
    warehouseId: number,
    merchantId?: number,
    items: AddProductItemCartItemsResponse[]
}

export interface AddProductItemCartItemsResponse {
    id: number,
    productType : string,
    quantity : number,
    sponsored : boolean,
    products?: any[],
    addedDate: string

}