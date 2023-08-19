import { MerchantResponse } from './merchantResponse';
import { ShippingResponse } from './shippingResponse';

export interface MinOrderValuesResponse {
    merchant: MerchantResponse,
    shipping: ShippingResponse
}