export interface OrderTrackingResponse{
    _id: string,
    issues: any[],
    attributes: OrderTrackingAttributesResponse,
    updatedAt: string,
    createdAt: string,
    state: string,
    storeId: number,
    orderId: number,
    __v: number
}

export interface OrderTrackingAttributesResponse{
    storeId: number,
    orderId: number,
    initialDeliveryDate: string,
    countryId: number,
    totalAmount: number,
    estimatedDeliveryAmount: number,
    actualDeliveryAmount: number,
    firstName: string,
    lastName: string,
    uid: string,
    coupon: OrderTrackingCouponResponse,
    payment: OrderTrackingPaymentResponse,
    addressInfo: OrderTrackingAddressInfoResponse,
    events: OrderTrackingEventsResponse[]
}

export interface OrderTrackingCouponResponse{
    code?: any,
    type: string
}

export interface OrderTrackingPaymentResponse{
    positiveBalance: number,
    chiperCardAmount: number,
    couponAmount: number,
    amount: number,
    total: number,
    subtotal: number,
    method: string,
    defaultMethod: OrderTrackingDefaultMethodResponse,
    billingType?: any
}

export interface OrderTrackingDefaultMethodResponse{
    canUse: boolean,
    iconName: string,
    id: number,
    isDefault: boolean,
    paymentMethodId: number,
    subtitleKey: string,
    titleKey: string,
    title: string,
    subtitle: string,
    name: string
}

export interface OrderTrackingAddressInfoResponse{
    instructions: string,
    address: string
}

export interface OrderTrackingEventsResponse{
    type: string,
    date: string
}