import { CartItemFormattedPriceResponse } from './cartItemFormattedPriceResponse';
import { CartItemPricesResponse } from './cartItemPricesResponse';
import { CartItemProductDetailResponse } from './cartItemProductDetailResponse';

export interface CartProductItemResponse {
    id?: number,
    productType?: string,
    quantity?: number,
    oldPrice?: number,
    sponsored?: boolean,
    products?: Array<CartItemProductDetailResponse>,
    addedDate?: string,
    brandName?: string,
    currentPrice?: number,
    customerMeasurement?: number,
    customerMeasurementUnit?: string,
    customerPrice?: number,
    customerTotal?: number,
    description?: string,
    descriptionDiscountedMaximumQuantity?: string,
    descriptionRegularPrice?: string,
    discount?: number,
    discountEndTime?: string,
    discountedExternalId?: number,
    discountedMaximumQuantity?: number,
    externalId?: number,
    forCheckoutBase?: number,
    forCheckoutManagerTotal?: number,
    forCheckoutSubtotal?: number,
    forCheckoutTotal?: number,
    formattedPrice?: Array<CartItemFormattedPriceResponse>
    hasDiscount?: boolean,
    hasSufficientStock?: boolean,
    ico?: number,
    iva?: number,
    ledgerAccount?: string,
    lowStock?: boolean,
    maximumQuantity?: number,
    measurementUnit?: string,
    medium?: string,
    minQuantity?: number,
    multipleQuantity?: number,
    name?: string,
    originatedExternalId?: number,
    packagingType?: string,
    prices?: Array<CartItemPricesResponse>,
    referenceId?: number,
    scaleType?: string,
    scheduleEndDate?: string,
    sku?: string,
    startQuantity?: number,
    stock?: number,
    storeReferenceName?: string,
    subtotal?: number,
    updateItemPriceDate?: string,
    volume?: number,
    weight?: number
}