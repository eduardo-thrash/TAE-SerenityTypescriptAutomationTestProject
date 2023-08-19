export interface PurchasesPayload {
    cart : PurchaseCartPayload[]
    orderOriginAppId : number
    sessionId : string
    couponCode : string
    surchargesData : number
    cartId : number
    creditChecked : boolean
    debitChecked : boolean
    reserveUid : string
}

export interface PurchaseCartPayload {
    from : string,
    id : number,
    merchantId : number
}