/* eslint-disable unicorn/no-null */
import { QuantityItemPayload } from '../itemQuantityPayolad';

export const QuantityPayloadBuilder = (locationId: number, items: Array<QuantityItemPayload>) => (
    {
        locationId: locationId,
        items: items
    }
)

export const QuantityItemPayloadBuilder = (quantity: number, warehouseId: number) => (
    [
        {
            merchantId: null,
            quantity: quantity,
            warehouseId: warehouseId,
            type: 'PRODUCT'
        }
    ]
)