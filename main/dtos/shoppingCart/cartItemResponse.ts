import { CartProductItemResponse } from './cartProductItemResponse';

export interface CartItemResponse {
    warehouseId?: number,
    merchantId?: number,
    items?: Array<CartProductItemResponse>,
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