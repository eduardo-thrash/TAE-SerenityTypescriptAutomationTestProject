import { shoppingCartItemPayload } from '../shoppingCartPayload'

export const ShoppingCartBuilder = (locationId: number, items: Array<shoppingCartItemPayload>) => (
    {
        locationId: locationId,
        items: items
    }
)

export const ShoppingCartItemBuilder = (id: number, quantity: number, warehouseId: number) => (
    [
        {
            id: id,
            // eslint-disable-next-line unicorn/no-null
            merchantId: null,
            quantity: quantity,
            warehouseId: warehouseId,
            type: 'PRODUCT',
            sponsored: false
        }
    ]
)