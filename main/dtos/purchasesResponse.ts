export interface PurchasesResponse {
    id: number,
    orders: PurchaseOrdersResponse[],
    purchaseId: number,
    processing: PurchaseProcessingResponse,
    purchaseUid: string,
    version: string,
    message: string,
    purchaseProcessingStatus: PurchaseProcessingStatusResponse[]

}

export interface PurchaseOrdersResponse {
    cashOnDeliveryReference?: number,
    createdAt: string,
    deliveryDay: string,
    details: PurchaseOrdersDetailsResponse[],
    isOnlinePayment: boolean,
    merchant: PurchaseOrdersMerchantResponse,
    missingReferences: object[],
    order: PurchaseOrdersOrderResponse,
    orderId: number,
    orderTotal: number,
    paymentDefault: PurchaseOrdersPaymentDefaultResponse,
    rewardCoupon?: any,
    statusId: number,
    statusName: string,
    totalToPay: number
}
export interface PurchaseOrdersMerchantResponse {
    iconUrl: string,
    merchantId?: number,
    name: string,
    warehouseId: number
}

export interface PurchaseOrdersOrderResponse {
    id: number,
    total: number,
}

export interface PurchaseOrdersPaymentDefaultResponse {
    canUse: boolean,
    iconName: string,
    id: number,
    isDefault: boolean,
    name: string,
    paymentMethodId: number,
    subtitle: string,
    subtitleKey: string,
    title: string,
    titleKey: string,
    variable?: any
}

export interface PurchaseOrdersDetailsResponse {
    chiperPrice: number,
    createdAt: string,
    customerPrice: number,
    externalId: number,
    fullPrice: number
    ico: number,
    id: number,
    iva: number,
    ledgerAccount: string,
    managerPrice: number,
    managerSubtotal: number,
    managerTotal: number,
    name: string,
    orderId: number,
    originalQuantity: number,
    packaging: number,
    productId: number,
    quantity: number,
    referenceId: number,
    sku: string,
    storeReferenceId: number,
    updatedAt: string,
    vat: number

}
export interface PurchaseProcessingResponse {
    procesing: PurchaseProcessingResultResponse
}

export interface PurchaseProcessingResultResponse {
    processedOrders: number,
    totalOrders: number,
    unprocessedOrders: number
}

export interface PurchaseProcessingStatusResponse {
    status: string,
    errorMessage?: string,
    errorCode?: number,
    type: string,
    step?: string,
    message?: string,
    createdAt: string
}