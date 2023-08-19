import { CartItemResponse } from './cartItemResponse';

export interface GetShoppingCartResponse {
    storeId?: string,
    carts?: Array<CartItemResponse>,
    createdAt?: string,
    locationId?: number,
    updatedAt?: string,
    subtotal?: number,
    total?: number,
    totalItems?: number,
    status?: string
}