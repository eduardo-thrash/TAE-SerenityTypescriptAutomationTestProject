import { AddItemsPayload,ItemPayload } from '../AddItemsPayload'

export const AddItemsBuilder = (locationId: number, items: ItemPayload[]): AddItemsPayload => (
    {
        locationId,
        items
    }
)

export const ItemPayloadBuilder = (id: number, merchantId: number, quantity: number, warehouseId: number, type: string, sponsored = false): ItemPayload => (
    {
        id,
        merchantId,
        quantity,
        warehouseId,
        type,
        sponsored
    }
)