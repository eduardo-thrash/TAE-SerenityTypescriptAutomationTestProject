import { CartItemProductPricesValuesResponse } from './cartItemProductPricesValuesResponse';

export interface CartItemProductPricesResponse {
    storeReferenceId?: number,
    iva?: number,
    ico?: number,
    customerTotal?: number,
    maximumQuantity?: number,
    customerMeasurement?: number,
    customerMeasurementUnit?: string,
    customerPrice?: number,
    scaleType?: string,
    originatedExternalId?: number,
    values?: Array<CartItemProductPricesValuesResponse>,
    scheduleEndDate?: string,
    clusterCode?: string
}